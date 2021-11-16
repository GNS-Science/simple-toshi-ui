import { Box, Card, Typography } from '@material-ui/core';
import { AnimatedAxis, AnimatedLineSeries, XYChart } from '@visx/xychart';
import React, { useEffect, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { filterData, getHazardTableOptions } from '../../service/inversionSolution.service';
import { InversionSolutionSpectralAccelerationTabQuery } from './__generated__/InversionSolutionSpectralAccelerationTabQuery.graphql';
import { XY } from '../../interfaces/common';
import { curveLinear } from '@visx/curve';
import { Tooltip } from '@visx/xychart';
import SelectControl from '../common/SelectControl';
import { HazardTableFilteredData } from '../../interfaces/inversionSolutions';

interface InversionSolutionSpectralAccelerationTabProps {
  id: string;
}

const InversionSolutionSpectralAccelerationTab: React.FC<InversionSolutionSpectralAccelerationTabProps> = ({
  id,
}: InversionSolutionSpectralAccelerationTabProps) => {
  const data = useLazyLoadQuery<InversionSolutionSpectralAccelerationTabQuery>(
    inversionSolutionSpectralAccelerationTabQuery,
    { id },
  );

  const options = getHazardTableOptions(data);

  const [location, setLocation] = useState<string>(options.location[0]);
  const [forecastTime, setForecastTime] = useState<string>(options.forecastTime[0]);
  const [gmpe, setGmpe] = useState<string>(options.gmpe[0]);
  const [backgroundSeismicity, setBackgroundSeismicity] = useState<string>(options.backgroundSeismicity[0]);
  const [POE, setPOE] = useState<string>('2%');

  const [filteredData, setFilteredData] = useState<HazardTableFilteredData>({});

  useEffect(() => {
    const filtered: HazardTableFilteredData = {};
    options.PGA.map((value) => {
      const dataSet = filterData(
        data,
        location,
        value === 'PGA' ? '0.0' : value,
        forecastTime,
        gmpe,
        backgroundSeismicity,
      );
      filtered[value] = dataSet;
    });
    setFilteredData(filtered);
  }, [location, forecastTime, gmpe, backgroundSeismicity]);

  const dataSet: XY[] = [];
  options.PGA.map((value) => {
    dataSet.push({ x: value === 'PGA' ? 0 : parseFloat(value), y: 1 });
  });

  return (
    <>
      <Box>
        <Card>
          <Box>
            <SelectControl name="Location" options={options.location} setOptions={setLocation} />
            <SelectControl name="Forecast Timespan" options={options.forecastTime} setOptions={setForecastTime} />
            <SelectControl
              name="Background Seismicity"
              options={options.backgroundSeismicity}
              setOptions={setBackgroundSeismicity}
            />
            <SelectControl name="Background Motion Model" options={options.gmpe} setOptions={setGmpe} />
            <SelectControl name="Probability of Exceedence" options={['2%', '10%']} setOptions={setPOE} />
            <div style={{ position: 'relative', width: '100%' }}>
              <XYChart
                height={700}
                width={900}
                xScale={{ type: 'linear', domain: [0, 10] }}
                yScale={{ type: 'linear', domain: [1e-3, 10] }}
              >
                <AnimatedLineSeries
                  dataKey="hello"
                  data={dataSet}
                  xAccessor={(d) => d.x}
                  yAccessor={(d) => d.y}
                  curve={curveLinear}
                />
                <AnimatedAxis orientation="bottom" />
                <AnimatedAxis orientation="left" />
                <Tooltip
                  showHorizontalCrosshair
                  showVerticalCrosshair
                  snapTooltipToDatumX
                  snapTooltipToDatumY
                  showDatumGlyph
                  glyphStyle={{ fill: '#000' }}
                  renderTooltip={({ tooltipData }) => {
                    const datum = tooltipData?.nearestDatum?.datum as XY;
                    const key = tooltipData?.nearestDatum?.key as string;
                    if (datum) {
                      return (
                        <>
                          <Typography>x: {datum.x}</Typography>
                          <Typography>y: {datum.y.toExponential()}</Typography>
                        </>
                      );
                    }
                  }}
                />
              </XYChart>
            </div>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default InversionSolutionSpectralAccelerationTab;

export const inversionSolutionSpectralAccelerationTabQuery = graphql`
  query InversionSolutionSpectralAccelerationTabQuery($id: ID!) {
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
