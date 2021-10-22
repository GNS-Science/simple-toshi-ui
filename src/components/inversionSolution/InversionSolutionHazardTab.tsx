import { Typography, Box, Card } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import {
  forecastTimeSpanOptions,
  gmpeOptions,
  locationOptions,
  pgaPeriodOptions,
} from '../../constants/inversionSolutionHazardTab';
import ControlsBar from '../common/ControlsBar';
import SelectControl from '../common/SelectControl';
import { InversionSolutionHazardTabQuery } from './__generated__/InversionSolutionHazardTabQuery.graphql';
import { AnimatedAxis, AnimatedLineSeries, Tooltip, XYChart } from '@visx/xychart';

interface InversionSolutionHazardTabProps {
  id: string;
}

const InversionSolutionHazardTab: React.FC<InversionSolutionHazardTabProps> = ({
  id,
}: InversionSolutionHazardTabProps) => {
  const data = useLazyLoadQuery<InversionSolutionHazardTabQuery>(inversionSolutionHazardTabQuery, { id });
  const rows = data?.node?.rows;

  const filtered = rows?.filter((item) => {
    if (item) {
      return item?.includes('0.0') && item?.includes('Wellington');
    }
  });
  const xy: XY[] = [];

  interface XY {
    x: number;
    y: number;
  }

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

  return (
    <>
      <Box>
        <Card>
          <Typography variant="h5" gutterBottom>
            <strong>Hazard:</strong>
            <ControlsBar>
              <SelectControl label="location" options={locationOptions} />
              <SelectControl label="PGA/SA period" options={pgaPeriodOptions} />
              <SelectControl label="Forcast Timespan" options={forecastTimeSpanOptions} />
              <SelectControl label="Background Seismisity" options={['true', 'false']} />
              <SelectControl label="Background Motion Model" options={gmpeOptions} />
            </ControlsBar>
            {/*{data?.node?.hazard_table?.name}*/}
          </Typography>
          <XYChart height={700} width={1500} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
            <AnimatedAxis orientation="bottom" />
            <AnimatedAxis orientation="left" />
            <AnimatedLineSeries dataKey="hazard plot" data={xy} xAccessor={(d) => d.x} yAccessor={(d) => d.y} />
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
                      <Typography>x: {datum.x}</Typography>
                      <Typography>y: {datum.y}</Typography>
                    </>
                  );
                }
              }}
            />
          </XYChart>
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
