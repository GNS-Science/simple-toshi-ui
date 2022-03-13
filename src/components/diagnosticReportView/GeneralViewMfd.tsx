import React, { useEffect, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { GeneralViewMfdQuery } from './__generated__/GeneralViewMfdQuery.graphql';
import { Axis, AnimatedLineSeries, Tooltip, XYChart } from '@visx/xychart';
import { Typography } from '@mui/material';
import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { RectClipPath } from '@visx/clip-path';
import { Group } from '@visx/group';

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
  cumulative: boolean;
  parentRef: HTMLDivElement | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resizeParent: (state: any) => void;
}

const GeneralViewMfd: React.FC<GeneralViewMfdProps> = ({
  mfdTableId,
  meta,
  parentWidth,
  cumulative,
}: GeneralViewMfdProps) => {
  const data = useLazyLoadQuery<GeneralViewMfdQuery>(generalViewMfdQuery, { id: mfdTableId });

  const [headingSize, setHeadingSize] = useState<number>(0);

  const rows = data?.node?.rows;
  const config_type = meta?.filter((kv) => kv?.k == 'config_type')[0]?.v;

  useEffect(() => {
    parentWidth * 0.035 >= 18 ? setHeadingSize(18) : setHeadingSize(parentWidth * 0.035);
  }, [parentWidth]);

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

  const cumulativeMfd = (series: string[], index: number): Array<IMagRate> => {
    const data = magRateData(
      rows
        .filter((row) => row && row[1] == series[index])
        .map((r) => (r ? [parseFloat(r[2] ?? ''), parseFloat(r[3] ?? '')] : [])),
    );
    for (let x = data.length - 1; x > 0; x--) {
      data[x - 1].rate += data[x].rate;
    }
    return data;
  };

  const seriesMfd = (series: string[], index: number): Array<IMagRate> => {
    return magRateData(
      rows
        .filter((row) => row && row[1] == series[index])
        .map((r) => (r ? [parseFloat(r[2] ?? ''), parseFloat(r[3] ?? '')] : [])),
    );
  };

  const magRateData = (data: number[][]): Array<IMagRate> => {
    return magAndRate(data).map((mr) => {
      const min = 1e-20; //log scales cannot include 0
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
          {cumulative ? 'Solution Target vs Final MFD (cumul.)' : 'Solution Target vs Final MFD'}
        </text>
        <Axis
          tickLabelProps={() => ({
            fontSize: 8,
          })}
          numTicks={5}
          orientation="bottom"
        />
        <Axis
          tickLabelProps={() => ({
            fontSize: 8,
          })}
          orientation="left"
        />
        <RectClipPath id="clip" x={50} y={-50} width={parentWidth} height={parentWidth * 0.75} />
        <Group clipPath="url(#clip)">
          {series.map((e, idx) => {
            return (
              <AnimatedLineSeries
                key={e}
                dataKey={e}
                data={cumulative ? cumulativeMfd(series, idx) : seriesMfd(series, idx)}
                xAccessor={(d: IMagRate) => d?.mag}
                yAccessor={(d: IMagRate) => d?.rate}
                stroke={colours[idx]}
              />
            );
          })}
        </Group>
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
