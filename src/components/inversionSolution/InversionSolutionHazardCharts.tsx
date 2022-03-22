import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { Box, Button, Card, Snackbar } from '@mui/material';
import { graphql } from 'babel-plugin-relay/macro';
import SelectControl from '../common/SelectControl';
import { XY } from '../../interfaces/common';
import {
  creatCSVdata,
  cropCurves,
  filterMultipleCurves,
  getHazardTableOptions,
  getSpectralAccelerationData,
} from '../../service/inversionSolution.service';
import MultiSelect from '../common/MultiSelect';
import Alert from '@mui/material/Alert';

import { HazardTableFilteredData } from '../../interfaces/inversionSolutions';
import { toProperCase } from '../../utils';
import {
  InversionSolutionHazardChartsQuery,
  InversionSolutionHazardChartsQueryResponse,
} from './__generated__/InversionSolutionHazardChartsQuery.graphql';
import HazardCurves from './charts/HazardCurves';
import SpectralAccelerationChart from './charts/SpectralAccelerationChart';
import { ParentSize } from '@visx/responsive';
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from 'react-csv';

interface InversionSolutionHazardChartsProps {
  id: string;
}

const InversionSolutionHazardCharts: React.FC<InversionSolutionHazardChartsProps> = ({
  id,
}: InversionSolutionHazardChartsProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const data = useLazyLoadQuery<InversionSolutionHazardChartsQuery>(inversionSolutionHazardChartsQuery, { id });
  const options = useMemo(() => getHazardTableOptions(data), [data]);

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

  const [showUHSA, setShowUHSA] = useState<boolean>(false);

  interface GetSAdataArguments {
    data: InversionSolutionHazardChartsQueryResponse;
    location: string;
    forecastTime: string;
    gmpe: string;
    backgroundSeismicity: string;
    POE: string;
  }

  const getSAdataCallback = useCallback(
    ({ data, location, forecastTime, gmpe, backgroundSeismicity, POE }: GetSAdataArguments) => {
      const xValue = POE === '2%' ? 0.02 : 0.1;
      const allCurves = filterMultipleCurves(options.PGA, data, location, forecastTime, gmpe, backgroundSeismicity);
      return getSpectralAccelerationData(options.PGA, xValue, allCurves);
    },
    [options.PGA],
  );

  useEffect(() => {
    const filteredCurves = filterMultipleCurves(PGA, data, location, forecastTime, gmpe, backgroundSeismicity);
    const croppedFilteredCurves = cropCurves(filteredCurves);
    setFilteredData(croppedFilteredCurves);

    const SAplot = getSAdataCallback({
      data,
      location,
      forecastTime,
      gmpe,
      backgroundSeismicity,
      POE,
    });
    setSAdata(SAplot);
  }, [getSAdataCallback, data, location, PGA, forecastTime, gmpe, backgroundSeismicity, POE]);

  useEffect(() => {
    const getPoE = () => {
      const yValue = POE === '2%' ? 0.02 : 0.1;
      return [
        { x: 1e-3, y: yValue },
        { x: 10, y: yValue },
      ];
    };
    if (POE !== 'None') {
      const POEdata = getPoE();
      setPOEdata(POEdata);
      const SAplot = getSAdataCallback({
        data,
        location,
        forecastTime,
        gmpe,
        backgroundSeismicity,
        POE,
      });
      setSAdata(SAplot);
      setShowUHSA(true);
    }
    if (POE === 'None') {
      setShowUHSA(false);
    }
  }, [getSAdataCallback, data, location, forecastTime, gmpe, backgroundSeismicity, POE]);

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

  const getHazardCurvesSubHeading = (): string => {
    return `GMM: ${gmpe}. Background: ${toProperCase(backgroundSeismicity)}d. Time-span: ${forecastTime} years.`;
  };

  const getSACurveSubHeading = (): string => {
    return ` GMM: ${gmpe}. Background: ${toProperCase(
      backgroundSeismicity,
    )}d. Time-span: ${forecastTime} years.  PoE: ${POE}`;
  };

  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
  });

  const getCSVData = () => {
    const allCurves = filterMultipleCurves(options.PGA, data, location, forecastTime, gmpe, backgroundSeismicity);
    return creatCSVdata(options.PGA, allCurves);
  };

  return (
    <>
      <div style={{ width: '100%', padding: '1rem', display: 'flex', flexWrap: 'wrap' }}>
        <SelectControl name="Location" options={options.location} setOptions={setLocation} />
        <MultiSelect name="PGA/SA Period" selected={PGA} options={options.PGA} setOptions={handleSetPGA} />
        <SelectControl name="Forecast Timespan" options={options.forecastTime} setOptions={setForecastTime} />
        <SelectControl
          name="Background Seismicity"
          options={options.backgroundSeismicity}
          setOptions={setBackgroundSeismicity}
        />
        <SelectControl name="Ground Motion Model" options={options.gmpe} setOptions={setGmpe} />
        <SelectControl name="Probability of Exceedence" options={['None', '2%', '10%']} setOptions={setPOE} />
      </div>
      <Box>
        <Card>
          <div style={{ width: '100%', padding: '1rem', display: 'flex' }} ref={targetRef}>
            <div style={{ width: '50%', minWidth: 350 }}>
              <ParentSize>
                {(parent) => (
                  <HazardCurves
                    parentWidth={parent.width}
                    parentRef={parent.ref}
                    resizeParent={parent.resize}
                    data={filteredData}
                    POE={POE}
                    PGA={PGA}
                    PGAoptions={options.PGA}
                    POEdata={POEdata}
                    subHeading={getHazardCurvesSubHeading()}
                    location={location}
                    timeSpan={forecastTime}
                  />
                )}
              </ParentSize>
            </div>
            <div style={{ width: '50%', minWidth: 350 }}>
              {showUHSA && (
                <ParentSize>
                  {(parent) => (
                    <SpectralAccelerationChart
                      parentWidth={parent.width}
                      parentRef={parent.ref}
                      resizeParent={parent.resize}
                      data={SAdata}
                      subHeading={getSACurveSubHeading()}
                      location={location}
                    />
                  )}
                </ParentSize>
              )}
            </div>
          </div>
          <div style={{ padding: 20 }}>
            <Button variant="contained" onClick={handlePrint}>
              Print Figures
            </Button>
            <CSVLink data={getCSVData()}>
              <Button variant="contained">Download CSV</Button>
            </CSVLink>
          </div>
        </Card>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openNotification}
        onClose={() => setOpenNotification(false)}
      >
        <Alert variant="filled" severity="warning">
          Sorry, we cannot show more than 8 curves in one chart.
        </Alert>
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
