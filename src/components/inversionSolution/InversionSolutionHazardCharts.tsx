import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { Box, Card, Snackbar } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import SelectControl from '../common/SelectControl';
import { XY } from '../../interfaces/common';
import {
  filterMultipleCurves,
  getHazardTableOptions,
  getSpectralAccelerationData,
} from '../../service/inversionSolution.service';
import MultiSelect from '../common/MultiSelect';
import MuiAlert from '@material-ui/lab/Alert';

import { HazardTableFilteredData } from '../../interfaces/inversionSolutions';
import { toProperCase } from '../../utils';
import { InversionSolutionHazardChartsQuery } from './__generated__/InversionSolutionHazardChartsQuery.graphql';
import HazardCurves from './charts/HazardCurves';
import SpectralAccelerationChart from './charts/SpectralAccelerationChart';

interface InversionSolutionHazardChartsProps {
  id: string;
}

const InversionSolutionHazardCharts: React.FC<InversionSolutionHazardChartsProps> = ({
  id,
}: InversionSolutionHazardChartsProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const data = useLazyLoadQuery<InversionSolutionHazardChartsQuery>(inversionSolutionHazardChartsQuery, { id });
  const options = getHazardTableOptions(data);

  const [location, setLocation] = useState<string>(options.location[0]);
  const [PGA, setPGA] = useState<string[]>([options.PGA[0]]);
  const [forecastTime, setForecastTime] = useState<string>(options.forecastTime[0]);
  const [gmpe, setGmpe] = useState<string>(options.gmpe[0]);
  const [backgroundSeismicity, setBackgroundSeismicity] = useState<string>(options.backgroundSeismicity[0]);
  const [POE, setPOE] = useState<string>('None');
  const [POEdata, setPOEdata] = useState<XY[]>([]);
  const [SAdata, setSAdata] = useState<XY[]>([]);

  const [filteredData, setFilteredData] = useState<HazardTableFilteredData>({});
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(700);

  const [showUHSA, setShowUHSA] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (targetRef.current) {
      setContainerWidth(targetRef.current.offsetWidth as number);
    }
  }, []);

  useEffect(() => {
    const xValue = POE === '2%' ? 1 / 2475 : 1 / 475;
    const filteredCurves = filterMultipleCurves(PGA, data, location, forecastTime, gmpe, backgroundSeismicity);
    setFilteredData(filteredCurves);

    const allCurves = filterMultipleCurves(options.PGA, data, location, forecastTime, gmpe, backgroundSeismicity);
    const plotData = getSpectralAccelerationData(options.PGA, xValue, allCurves);
    setSAdata(plotData);
  }, [location, PGA, forecastTime, gmpe, backgroundSeismicity]);

  useEffect(() => {
    if (POE !== 'None') {
      const data = getPoE();
      setPOEdata(data);
      setShowUHSA(true);
    }
    if (POE === 'None') {
      setShowUHSA(false);
    }
  }, [POE]);

  const handleSetPGA = (selections: string[]) => {
    if (selections.length > 8) {
      return setOpenNotification(true);
    }

    if (selections.includes('PGA')) {
      const i = selections.indexOf('PGA');
      selections[i] = '0.0';
    }

    const sorted = selections.sort((a: string, b: string): number => {
      const result = parseFloat(a) - parseFloat(b);
      return result;
    });

    if (sorted.includes('0.0')) {
      const i = sorted.indexOf('0.0');
      sorted[i] = 'PGA';
    }

    setPGA(sorted);
  };

  const getPoE = () => {
    const yValue = POE === '2%' ? 1 / 2475 : 1 / 475;
    return [
      { x: 1e-3, y: yValue },
      { x: 10, y: yValue },
    ];
  };

  const getHazardCurvesSubHeading = (): string => {
    return `PGA/SA Period: ${PGA.join(', ')}. Model: ${gmpe}. Background: ${toProperCase(
      backgroundSeismicity,
    )}d. Forecast: ${forecastTime} years.`;
  };

  return (
    <>
      <SelectControl name="Location" options={options.location} setOptions={setLocation} />
      <MultiSelect name="PGA/SA Period" selected={[]} options={options.PGA} setOptions={handleSetPGA} />
      <SelectControl name="Forecast Timespan" options={options.forecastTime} setOptions={setForecastTime} />
      <SelectControl
        name="Background Seismicity"
        options={options.backgroundSeismicity}
        setOptions={setBackgroundSeismicity}
      />
      <SelectControl name="Background Motion Model" options={options.gmpe} setOptions={setGmpe} />
      <SelectControl name="Probability of Exceedence" options={['None', '2%', '10%']} setOptions={setPOE} />
      <Box>
        <Card>
          <div style={{ width: '100%', padding: '1rem', display: 'flex' }} ref={targetRef}>
            <HazardCurves
              height={(containerWidth / 2) * 0.7}
              width={containerWidth / 2}
              data={filteredData}
              POE={POE}
              PGA={PGA}
              POEdata={POEdata}
              subHeading={getHazardCurvesSubHeading()}
              location={location}
            />
            {showUHSA && (
              <SpectralAccelerationChart height={(containerWidth / 2) * 0.7} width={containerWidth / 2} data={SAdata} />
            )}
          </div>
        </Card>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openNotification}
        onClose={() => setOpenNotification(false)}
      >
        <MuiAlert variant="filled" severity="warning">
          Sorry, we cannot show more than 8 curves in one chart.
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default InversionSolutionHazardCharts;

export const inversionSolutionHazardChartsQuery = graphql`
  query InversionSolutionHazardChartsQuery($id: ID!) {
    node(id: $id) {
      ... on Table {
        id
        name
        created
        table_type
        object_id
        column_headers
        column_types
        rows
        dimensions {
          k
          v
        }
      }
    }
  }
`;
