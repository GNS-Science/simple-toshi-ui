import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { XYChart, AnimatedAxis, AnimatedLineSeries, Tooltip } from '@visx/xychart';

import { MfdProps } from '../../../interfaces/inversionSolutions';
import { IMagRate, magRateData } from '../../PreviewMFD_data';
import { regionalizedMfdSeries } from '../../../constants/regionalizedMfdSeries';

interface MfdChartProps {
  mfdProps: MfdProps;
  rows: readonly (readonly (string | null)[] | null)[] | null | undefined;
  isV2: boolean;
}

const MfdChart: React.FC<MfdChartProps> = ({ mfdProps, rows, isV2 }: MfdChartProps) => {
  const [xScaleDomain, setXscaleDomain] = useState<number[]>([5, 9]);
  const [colors, setColors] = useState<Record<string, string>>({});

  useEffect(() => {
    setXscaleDomain([mfdProps.minMagnitude, mfdProps.maxMagnitude]);
  }, [mfdProps]);

  if (!rows) {
    return <>There is no mfd curve</>;
  }

  const getMfdCurve = (series: string[], index: number): Array<IMagRate> => {
    return magRateData(
      rows
        .filter((row) => row && row[1] == series[index])
        .map((r) => (r ? [parseFloat(r[2] ?? ''), parseFloat(r[3] ?? '')] : [])),
    );
  };

  useEffect(() => {
    const curveColors: Record<string, string> = {};
    mfdProps.series.map((value) => {
      if (value.includes('totalTargetGR')) {
        curveColors[value] = 'orange';
      } else if (value.includes('trulyOffFaultMFD')) {
        curveColors[value] = 'steelblue';
      } else if (value.includes('targetOnFaultSupraSeisMFD')) {
        curveColors[value] = 'lightgray';
      } else if (value.includes('totalSubSeismoOnFaultMFD')) {
        curveColors[value] = 'black';
      } else if (value.includes('solutionMFD')) {
        curveColors[value] = 'red';
      } else {
        curveColors[value] = 'yellow';
      }
    });
    setColors(curveColors);
  }, [mfdProps]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getScale = (): any => {
    const currentColors: string[] = [];
    for (const prop in colors) {
      currentColors.push(colors[prop]);
    }

    let currentCurves: string[] = [];
    if (isV2) {
      mfdProps.series.map((curve) => {
        console.log(curve);
        regionalizedMfdSeries.map((options) => {
          console.log(options);
          if (options.path === curve) {
            currentCurves.push(options.displayName);
          }
        });
      });
    } else {
      currentCurves = [...mfdProps.series];
    }

    return scaleOrdinal({
      domain: [...currentCurves],
      range: [...currentColors],
    });
  };

  return (
    <Box style={{ border: '1px solid', width: 'fit-content', position: 'relative' }}>
      <XYChart
        height={600}
        width={800}
        margin={{ bottom: 30, left: 50, right: 50, top: 10 }}
        xScale={{ type: 'linear', domain: xScaleDomain, zero: false }}
        yScale={{ type: 'log', domain: [1e-6, 1] }}
      >
        <AnimatedAxis orientation="bottom" />
        <AnimatedAxis orientation="left" />
        {mfdProps.series.map((curve, index) => {
          return (
            <AnimatedLineSeries
              key={curve}
              dataKey={curve}
              xAccessor={(d: IMagRate) => d?.mag}
              yAccessor={(d: IMagRate) => d?.rate}
              stroke={colors[curve]}
              data={getMfdCurve(mfdProps.series, index)}
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
        scale={getScale()}
        shape="line"
        style={{ margin: '20px', position: 'absolute', top: 0, right: 0 }}
      />
    </Box>
  );
};

export default MfdChart;
