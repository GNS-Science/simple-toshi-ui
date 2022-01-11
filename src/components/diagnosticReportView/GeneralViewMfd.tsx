import React, { useEffect, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { GeneralViewMfdQuery } from './__generated__/GeneralViewMfdQuery.graphql';
import { AnimatedAxis, AnimatedLineSeries, Tooltip, XYChart } from '@visx/xychart';
import { Typography } from '@mui/material';
import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';

interface GeneralViewMfdProps {
  mfdTableId: string;
  meta:
    | readonly ({
        readonly k: string | null;
        readonly v: string | null;
      } | null)[]
    | null
    | undefined;
  parentWidth: number;
  parentRef: HTMLDivElement | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resizeParent: (state: any) => void;
}

const GeneralViewMfd: React.FC<GeneralViewMfdProps> = ({ mfdTableId, meta, parentWidth }: GeneralViewMfdProps) => {
  const data = useLazyLoadQuery<GeneralViewMfdQuery>(generalViewMfdQuery, { id: mfdTableId });

  const [headingSize, setHeadingSize] = useState<number>(0);

  const rows = data?.node?.rows;
  const config_type = meta?.filter((kv) => kv?.k == 'config_type')[0]?.v;
  console.log(meta);
  console.log(config_type);

  useEffect(() => {
    parentWidth * 0.035 >= 24 ? setHeadingSize(24) : setHeadingSize(parentWidth * 0.035);
  });

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
    rows?.some((value) => {
      return value?.includes('InversionTargetMFDs.targetOnFaultSupraSeisMFD_SansTVZ');
    })
      ? (series = [
          'trulyOffFaultMFD.all',
          'InversionTargetMFDs.targetOnFaultSupraSeisMFD_SansTVZ',
          'InversionTargetMFDs.targetOnFaultSupraSeisMFD_TVZ',
          'totalSubSeismoOnFaultMFD',
          'solutionMFD_rateWeighted',
        ])
      : (series = [
          'trulyOffFaultMFD.all',
          'targetOnFaultSupraSeisMFD_SansTVZ',
          'targetOnFaultSupraSeisMFD_TVZ',
          'totalSubSeismoOnFaultMFD',
          'solutionMFD_rateWeighted',
        ]);
    colours = ['orange', 'steelblue', 'lightgray', 'black', 'red'];
    maxMagnitude = 9.0;
    minMagnitude = 5.0;
  }

  const seriesMfd = (series: string[], index: number): Array<IMagRate> => {
    return magRateData(
      rows
        .filter((row) => row && row[1] == series[index])
        .map((r) => (r ? [parseFloat(r[2] ?? ''), parseFloat(r[3] ?? '')] : [])),
    );
  };

  const magRateData = (data: number[][]): Array<IMagRate> => {
    return magAndRate(data).map((mr) => {
      const min = 1e-15; //log scales cannot include 0
      return { mag: mr[0], rate: Math.max(mr[1], min) } as IMagRate;
    });
  };

  const magAndRate = (data: number[][]): number[][] => {
    return data.filter((x) => x[0] > 5);
  };

  interface IMagRate {
    mag: number;
    rate: number;
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <XYChart
        height={parentWidth * 0.75}
        width={parentWidth}
        xScale={{ type: 'linear', domain: [minMagnitude, maxMagnitude], zero: false }}
        yScale={{ type: 'log', domain: [1e-6, 1] }}
      >
        <text
          y={18}
          x={'50%'}
          alignmentBaseline="middle"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={headingSize}
          fontWeight="bold"
        >
          Solution Target vs final Magnitude Frequency distribution
        </text>
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
        shapeHeight={parentWidth * 0.02}
        style={{
          fontSize: parentWidth * 0.02,
          position: 'absolute',
          top: parentWidth * 0.1,
          left: parentWidth * 0.5,
          display: 'flex',
        }}
      />
    </div>
  );
};

export default GeneralViewMfd;

export const generalViewMfdQuery = graphql`
  query GeneralViewMfdQuery($id: ID!) {
    node(id: $id) {
      ... on Table {
        id
        name
        column_types
        column_headers
        rows
      }
    }
  }
`;