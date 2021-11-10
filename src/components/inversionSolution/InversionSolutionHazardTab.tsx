import { Typography, Box, Card } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import React, { useEffect, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import ControlsBar from '../common/ControlsBar';
import SelectControl from '../common/SelectControl';
import { InversionSolutionHazardTabQuery } from './__generated__/InversionSolutionHazardTabQuery.graphql';
import { AnimatedAxis, AnimatedLineSeries, Grid, Tooltip, XYChart } from '@visx/xychart';
import { XY } from '../../interfaces/common';
import { filterData, getHazardTableOptions } from '../../service/inversionSolution.service';

interface InversionSolutionHazardTabProps {
  id: string;
}

const InversionSolutionHazardTab: React.FC<InversionSolutionHazardTabProps> = ({
  id,
}: InversionSolutionHazardTabProps) => {
  const data = useLazyLoadQuery<InversionSolutionHazardTabQuery>(inversionSolutionHazardTabQuery, { id });
  const options = getHazardTableOptions(data);

  const [location, setLocation] = useState<string>(options.location[0]);
  const [PGA, setPGA] = useState<string>(options.PGA[0]);
  const [forecastTime, setForecastTime] = useState<string>(options.forecastTime[0]);
  const [gmpe, setGmpe] = useState<string>(options.gmpe[0]);
  const [backgroundSeismicity, setBackgroundSeismicity] = useState<string>(options.backgroundSeismicity[0]);

  const [filteredData, setFilteredData] = useState<XY[]>([]);

  useEffect(() => {
    const pgaValue = PGA === 'PGA' ? '0.0' : PGA;
    const xy = filterData(data, location, pgaValue, forecastTime, gmpe, backgroundSeismicity);
    setFilteredData(xy);
  }, [location, PGA, forecastTime, gmpe, backgroundSeismicity]);

  return (
    <>
      <Box>
        <Card>
          <ControlsBar>
            <SelectControl name="Location" options={options.location} setOptions={setLocation} />
            <SelectControl name="PGA/SA period" options={options.PGA} setOptions={setPGA} />
            <SelectControl name="Forecast Timespan" options={options.forecastTime} setOptions={setForecastTime} />
            <SelectControl
              name="Background Seismicity"
              options={options.backgroundSeismicity}
              setOptions={setBackgroundSeismicity}
            />
            <SelectControl name="Background Motion Model" options={options.gmpe} setOptions={setGmpe} />
          </ControlsBar>
          <Box style={{ width: '100%', padding: '1rem' }}>
            <XYChart
              height={700}
              width={1200}
              xScale={{ type: 'log', domain: [1e-3, 10] }}
              yScale={{ type: 'log', domain: [1e-13, 2.0] }}
            >
              <AnimatedAxis orientation="bottom" label="Ground Motion (g)" />
              <AnimatedAxis orientation="left" label="Annual Frequency of Exceedance" />
              <AnimatedLineSeries
                dataKey="hazard plot"
                data={filteredData}
                xAccessor={(d) => d.x}
                yAccessor={(d) => d.y}
              />
              <Grid rows={true} columns={true} />
              <Tooltip
                snapTooltipToDatumX
                snapTooltipToDatumY
                showDatumGlyph
                glyphStyle={{ fill: '#000' }}
                renderTooltip={({ tooltipData }) => {
                  const datum = tooltipData?.nearestDatum?.datum as XY;
                  if (datum) {
                    return (
                      <>
                        <Typography>x: {datum.x.toExponential()}</Typography>
                        <Typography>y: {datum.y.toExponential()}</Typography>
                      </>
                    );
                  }
                }}
              />
            </XYChart>
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
