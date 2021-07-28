import { graphql } from 'babel-plugin-relay/macro';
import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { magRateData, IMagRate } from './PreviewMFD_data';
import {
  InversionSolutionMfdTabQuery,
  InversionSolutionMfdTabQueryResponse,
} from './__generated__/InversionSolutionMfdTabQuery.graphql';

import { AnimatedAxis, AnimatedLineSeries, Tooltip, XYChart } from '@visx/xychart';
import { scaleOrdinal } from '@visx/scale';
import { LegendOrdinal } from '@visx/legend';

export const inversionSolutionMfdTabQuery = graphql`
  query InversionSolutionMfdTabQuery($id: ID!) {
    node(id: $id) {
      ... on InversionSolution {
        mfd_table {
          name
          column_types
          column_headers
          rows
        }
        meta {
          k
          v
        }
      }
    }
  }
`;

interface InversionSolutionMfdTabProps {
  queryRef: PreloadedQuery<InversionSolutionMfdTabQuery, Record<string, unknown>>;
}

// function InversionSolutionMfdTab(): React.ReactElement {
const InversionSolutionMfdTab: React.FC<InversionSolutionMfdTabProps> = ({
  queryRef,
}: InversionSolutionMfdTabProps) => {
  const data: InversionSolutionMfdTabQueryResponse = usePreloadedQuery<InversionSolutionMfdTabQuery>(
    inversionSolutionMfdTabQuery,
    queryRef,
  );

  const rows = data?.node?.mfd_table?.rows;
  const config_type = data?.node?.meta?.filter((kv) => kv?.k == 'config_type')[0]?.v;
  // console.log(config_type == 'subduction');

  if (!rows) {
    return <></>;
  }

  let series: string[] = [];
  let colours: string[] = [];
  let maxMagnitude = 10.0;
  let minMagnitude = 0;

  if (config_type == 'subduction') {
    colours = ['steelblue', 'red'];
    series = ['targetOnFaultSupraSeisMFD', 'solutionMFD_rateWeighted'];
    maxMagnitude = 9.5;
    minMagnitude = 6.5;
  } else {
    colours = ['orange', 'steelblue', 'lightgray', 'black', 'red'];
    series = [
      'trulyOffFaultMFD.all',
      'targetOnFaultSupraSeisMFD_SansTVZ',
      'targetOnFaultSupraSeisMFD_TVZ',
      'totalSubSeismoOnFaultMFD',
      'solutionMFD_rateWeighted',
    ];
    maxMagnitude = 9.0;
    minMagnitude = 5.0;
  }
  //Removes filename from inversion data
  const cleanedMeta = data?.node?.meta?.filter((el) => {
    return el?.k !== 'rupture_set';
  });
  //Converting cleaned data to string
  const metaAsString = cleanedMeta?.map((kv) => ' ' + kv?.k + ': ' + kv?.v).toString() ?? '';
  const seriesMfd = (series: string[], index: number): Array<IMagRate> => {
    return magRateData(
      rows
        .filter((row) => row && row[1] == series[index])
        .map((r) => (r ? [parseFloat(r[2] ?? ''), parseFloat(r[3] ?? '')] : [])),
    );
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Solution Target vs final Magnitude Frequency distribution
      </Typography>
      <Box style={{ width: '100%', color: '#646464', padding: '1rem' }}>{metaAsString}</Box>
      <Box style={{ border: '1px solid', width: 'fit-content', position: 'relative' }}>
        <XYChart
          height={600}
          width={800}
          margin={{ bottom: 30, left: 50, right: 50, top: 10 }}
          xScale={{ type: 'linear', domain: [minMagnitude, maxMagnitude], zero: false }}
          yScale={{ type: 'log', domain: [1e-6, 1] }}
        >
          <AnimatedAxis orientation="bottom" />
          <AnimatedAxis orientation="left" />
          {series.map((e, idx) => {
            return (
              <AnimatedLineSeries
                key={e}
                dataKey={e}
                data={seriesMfd(series, idx)}
                xAccessor={(d: IMagRate) => d?.mag}
                yAccessor={(d: IMagRate) => d?.rate}
                stroke={colours[idx]}
              />
            );
          })}
          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showDatumGlyph
            glyphStyle={{ fill: '#000' }}
            renderTooltip={({ tooltipData }) => {
              const datum = tooltipData?.nearestDatum?.datum as IMagRate;
              return (
                <>
                  <strong>{tooltipData?.nearestDatum?.key}</strong>
                  <Typography>mag: {datum.mag}</Typography>
                  <Typography>rate: {datum.rate}</Typography>
                </>
              );
            }}
          />
        </XYChart>
        <LegendOrdinal
          direction="column"
          scale={scaleOrdinal({
            domain: series,
            range: colours,
          })}
          shape="line"
          style={{ margin: '20px', position: 'absolute', top: 0, right: 0 }}
        />
      </Box>
    </>
  );
};

export default InversionSolutionMfdTab;
