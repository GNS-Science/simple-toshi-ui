import { Typography, Box, Card } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import React, { useEffect, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import {
  bgSeismisityOptions,
  forecastTimeSpanOptions,
  gmpeOptions,
  locationOptions,
  pgaPeriodOptions,
} from '../../constants/inversionSolutionHazardTab';
import ControlsBar from '../common/ControlsBar';
import SelectControl from '../common/SelectControl';
import { InversionSolutionHazardTabQuery } from './__generated__/InversionSolutionHazardTabQuery.graphql';
import { AnimatedAxis, AnimatedLineSeries, Grid, Tooltip, XYChart } from '@visx/xychart';

interface InversionSolutionHazardTabProps {
  id: string;
}
interface XY {
  x: number;
  y: number;
}

const InversionSolutionHazardTab: React.FC<InversionSolutionHazardTabProps> = ({
  id,
}: InversionSolutionHazardTabProps) => {
  const [location, setLocation] = useState<string>(locationOptions[0]);
  const [PGA, setPGA] = useState<string>(pgaPeriodOptions[0]);
  const [forecastTime, setForecastTime] = useState<string>(forecastTimeSpanOptions[0]);
  const [gmpe, setGmpe] = useState<string>(gmpeOptions[0]);
  const [backgroundSeismisity, setBackgroundSeismisity] = useState<string>(bgSeismisityOptions[0]);
  const [filteredData, setFilteredData] = useState<XY[]>([]);
  const data = useLazyLoadQuery<InversionSolutionHazardTabQuery>(inversionSolutionHazardTabQuery, { id });
  const rows = data?.node?.rows;

  const minXBound = 2e-3;

  useEffect(() => {
    const xy: XY[] = [];
    let pgaValue = '';
    if (PGA === 'PGA') {
      pgaValue = '0.0';
    } else {
      pgaValue = PGA;
    }
    const filtered = rows?.filter((item) => {
      if (item) {
        return (
          item?.includes(location) &&
          item?.includes(pgaValue) &&
          item?.includes(forecastTime) &&
          item?.includes(gmpe) &&
          item?.includes(backgroundSeismisity) &&
          parseFloat(item[7] ?? '0') >= minXBound
        );
      }
    });
    filtered?.map((item) => {
      if (item) {
        const slicedArray = item.slice(7, 9);
        const object: XY = {
          x: parseFloat(slicedArray[0] as string),
          y: parseFloat(slicedArray[1] as string),
        };
        xy.push(object);
      }
    });
    setFilteredData(xy);
  }, [location, PGA, forecastTime, gmpe, backgroundSeismisity]);

  return (
    <>
      <Box>
        <Card>
          <Typography variant="h5" gutterBottom>
            <strong>Hazard:</strong>
            <ControlsBar>
              <SelectControl label="location" options={locationOptions} setOptions={setLocation} />
              <SelectControl label="PGA/SA period" options={pgaPeriodOptions} setOptions={setPGA} />
              <SelectControl label="Forcast Timespan" options={forecastTimeSpanOptions} setOptions={setForecastTime} />
              <SelectControl
                label="Background Seismisity"
                options={bgSeismisityOptions}
                setOptions={setBackgroundSeismisity}
              />
              <SelectControl label="Background Motion Model" options={gmpeOptions} setOptions={setGmpe} />
            </ControlsBar>
            {/*{data?.node?.hazard_table?.name}*/}
          </Typography>
          <Box style={{ width: '100%', padding: '1rem' }}>
            <XYChart
              height={700}
              width={1200}
              xScale={{ type: 'log', domain: [1e-3, 10] }}
              yScale={{ type: 'log', domain: [1e-13, 2.0] }}
            >
              <AnimatedAxis orientation="bottom" label="Ground Motion (g)" />
              <AnimatedAxis orientation="left" label="Annual Frequency of Exceedence" />
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
