import React, { useEffect, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { Typography, Box, Card } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import ControlsBar from '../common/ControlsBar';
import SelectControl from '../common/SelectControl';
import { InversionSolutionHazardTabQuery } from './__generated__/InversionSolutionHazardTabQuery.graphql';
import { XY } from '../../interfaces/common';
import { filterData, getHazardTableOptions } from '../../service/inversionSolution.service';
import MultiSelect from '../common/MultiSelect';

import { Group } from '@visx/group';
import { scaleLog, scaleOrdinal } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { LinePath } from '@visx/shape';
import { curveNatural } from '@visx/curve';
import { LegendItem, LegendLabel, LegendOrdinal } from '@visx/legend';
import { HazardTableFilteredData } from '../../interfaces/inversionSolutions';

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

  //filter data when on select control change
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

  //initialise sizes for chart
  const width = 1400;
  const height = 1000;
  const marginLeft = 100;
  const marginRight = 100;
  const marginTop = 100;
  const marginBottom = 100;

  const xMax = width - marginLeft - marginRight;
  const yMax = height - marginTop - marginBottom;

  //handleSetPGA for multi select component
  const handleSetPGA = (selections: string[]) => {
    setPGA(selections);
  };

  //configure x and y scales
  const xScale = scaleLog<number>({
    domain: [1e-3, 10],
    range: [0, xMax],
  });

  const yScale = scaleLog<number>({
    domain: [1e-13, 2.0],
    range: [yMax, 0],
  });

  const colors = ['#FE1100', '#73d629', '#ffd700', '#7fe5f0', '#003366', '#ff7f50', '#047806', '#4ca3dd'];

  const ordinalColorScale = scaleOrdinal({
    domain: [...PGA],
    range: colors,
  });

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
            <svg width={width} height={height}>
              <rect x={0} y={0} width={width} height={height} fill={'white'} />
              <Group left={marginLeft} top={marginTop}>
                <GridRows scale={yScale} width={xMax} height={yMax} stroke="#e0e0e0" />
                <GridColumns scale={xScale} width={xMax} height={yMax} stroke="#e0e0e0" />
                <AxisLeft scale={yScale} />
                <text y={25} x={-230} transform="rotate(-90)" fontSize={15}>
                  Annual Frequency of Exceedance
                </text>
                <AxisBottom top={yMax} scale={xScale} />
                <text y={780} x={20} fontSize={15}>
                  Ground Motion (g)
                </text>
                {Object.keys(filteredData).map((key, i) => {
                  return (
                    <LinePath<XY>
                      key={key}
                      data={filteredData[key]}
                      curve={curveNatural}
                      x={(d) => xScale(d.x)}
                      y={(d) => yScale(d.y)}
                      stroke={colors[i]}
                      strokeWidth={2.5}
                    />
                  );
                })}
              </Group>
            </svg>
            <div style={{ width: 100, height: 100, position: 'absolute', top: 1000, left: 350, display: 'flex' }}>
              <LegendOrdinal scale={ordinalColorScale} labelFormat={(label) => `${label}`}>
                {(labels) => (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {labels.map((label, i) => (
                      <LegendItem key={`legend-quantile-${i}`} margin="0 5px">
                        <svg width={15} height={15}>
                          <rect fill={label.value} width={15} height={15} />
                        </svg>
                        <LegendLabel align="left" margin="0 0 0 4px">
                          {label.text}
                        </LegendLabel>
                      </LegendItem>
                    ))}
                  </div>
                )}
              </LegendOrdinal>
            </div>
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
