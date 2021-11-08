import React, { useEffect, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { Typography, Box, Card } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import ControlsBar from '../common/ControlsBar';
import SelectControl from '../common/SelectControl';
import { InversionSolutionHazardTabQuery } from './__generated__/InversionSolutionHazardTabQuery.graphql';
import { AnimatedAxis, AnimatedLineSeries, Grid, Tooltip, XYChart } from '@visx/xychart';
import { XY } from '../../interfaces/common';
import { filterData, getHazardTableOptions } from '../../service/inversionSolution.service';
import MultiSelect from '../common/MultiSelect';

import { Group } from '@visx/group';
import { scaleLog, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';

interface InversionSolutionHazardTabProps {
  id: string;
}

const InversionSolutionHazardTab: React.FC<InversionSolutionHazardTabProps> = ({
  id,
}: InversionSolutionHazardTabProps) => {
  const data = useLazyLoadQuery<InversionSolutionHazardTabQuery>(inversionSolutionHazardTabQuery, { id });
  const options = getHazardTableOptions(data);

  const [location, setLocation] = useState<string>(options.location[0]);
  const [PGA, setPGA] = useState<string[]>([options.PGA[0]]);
  const [forecastTime, setForecastTime] = useState<string>(options.forecastTime[0]);
  const [gmpe, setGmpe] = useState<string>(options.gmpe[0]);
  const [backgroundSeismicity, setBackgroundSeismicity] = useState<string>(options.backgroundSeismicity[0]);

  const [filteredData, setFilteredData] = useState<HazardTableFilteredData>({});

  useEffect(() => {
    const filtered: HazardTableFilteredData = {};
    const pgaValues: string[] = [...PGA];
    if (pgaValues.includes('PGA')) {
      const index = pgaValues.indexOf('PGA');
      pgaValues[index] = '0.0';
    }

    pgaValues.map((pgaValue) => {
      const xy = filterData(data, location, pgaValue, forecastTime, gmpe, backgroundSeismicity);
      pgaValue === '0.0' ? (filtered['PGA'] = xy) : (filtered[pgaValue] = xy);
    });
    setFilteredData(filtered);
  }, [location, PGA, forecastTime, gmpe, backgroundSeismicity]);

  const handleSetPGA = (selections: string[]) => {
    setPGA(selections);
  };

  const width = 1400;
  const height = 1000;
  const marginLeft = 100;
  const marginRight = 100;
  const marginTop = 100;
  const marginBottom = 100;

  const xMax = width - marginLeft - marginRight;
  const yMax = height - marginTop - marginBottom;

  const xScale = {
    scale: scaleLog<number>({
      domain: [1e-3, 10],
      range: [0, xMax],
      round: true,
    }),
  };

  const yScale = {
    scale: scaleLog<number>({
      domain: [1e-13, 2.0],
      range: [yMax, 0],
      round: true,
    }),
  };

  return (
    <>
      <Box>
        <Card>
          <Typography variant="h5" gutterBottom>
            <strong>Hazard:</strong>
            <ControlsBar>
              <SelectControl name="Location" options={options.location} setOptions={setLocation} />
              <MultiSelect name="PGA/SA Period" selected={[]} options={options.PGA} setOptions={handleSetPGA} />
              <SelectControl name="Forecast Timespan" options={options.forecastTime} setOptions={setForecastTime} />
              <SelectControl
                name="Background Seismicity"
                options={options.backgroundSeismicity}
                setOptions={setBackgroundSeismicity}
              />
              <SelectControl name="Background Motion Model" options={options.gmpe} setOptions={setGmpe} />
            </ControlsBar>
          </Typography>
          <Box style={{ width: '100%', padding: '1rem' }}>
            {/* <XYChart
              height={700}
              width={1200}
              xScale={{ type: 'log', domain: [1e-3, 10] }}
              yScale={{ type: 'log', domain: [1e-13, 2.0] }}
            >
              <AnimatedAxis orientation="bottom" label="Ground Motion (g)" />
              <AnimatedAxis orientation="left" label="Annual Frequency of Exceedance" />
              {Object.keys(filteredData).map((key) => {
                return (
                  <AnimatedLineSeries
                    key={key}
                    dataKey={key}
                    data={filteredData[key]}
                    xAccessor={(d) => d.x}
                    yAccessor={(d) => d.y}
                  />
                );
              })}
              <Grid rows={true} columns={true} />
              <Tooltip
                showHorizontalCrosshair
                showVerticalCrosshair
                snapTooltipToDatumX
                snapTooltipToDatumY
                showDatumGlyph
                glyphStyle={{ fill: '#000' }}
                renderTooltip={({ tooltipData, colorScale }) => {
                  const datum = tooltipData?.nearestDatum?.datum as XY;
                  const key = tooltipData?.nearestDatum?.key as string;
                  if (datum) {
                    return (
                      <>
                        <Typography>
                          <span
                            style={{
                              background: colorScale && colorScale(key as string),
                              width: 8,
                              height: 8,
                              display: 'inline-block',
                              marginRight: 4,
                              borderRadius: 8,
                            }}
                          />
                          &nbsp;&nbsp;&nbsp;
                          {key}
                        </Typography>
                        <Typography>x: {datum.x.toExponential()}</Typography>
                        <Typography>y: {datum.y.toExponential()}</Typography>
                      </>
                    );
                  }
                }}
              />
            </XYChart> */}
            <svg width={width} height={height}>
              <rect x={0} y={0} width={width} height={height} fill={'white'} />
              <Group left={marginLeft} top={marginTop}>
                <GridRows scale={yScale.scale} width={xMax} height={yMax} stroke="#e0e0e0" />
                <GridColumns scale={xScale.scale} width={xMax} height={yMax} stroke="#e0e0e0" />
                <AxisLeft scale={yScale.scale} />
                <text y={25} x={-230} transform="rotate(-90)" fontSize={15}>
                  Annual Frequency of Exceedance
                </text>
                <AxisBottom top={yMax} scale={xScale.scale} />
                <text y={780} x={20} fontSize={15}>
                  Ground Motion (g)
                </text>
              </Group>
              <Group></Group>
            </svg>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default InversionSolutionHazardTab;

export const inversionSolutionHazardTabQuery = graphql`
  query InversionSolutionHazardTabQuery($id: ID!) {
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
