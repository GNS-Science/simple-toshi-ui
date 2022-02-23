import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { XYChart, AnimatedAxis, AnimatedLineSeries, Tooltip } from '@visx/xychart';

import { MfdProps } from '../../../interfaces/inversionSolutions';
import { IMagRate, magRateData } from '../../PreviewMFD_data';

interface MfdChartProps {
  mfdProps: MfdProps;
  rows: readonly (readonly (string | null)[] | null)[] | null | undefined;
}

const MfdChart: React.FC<MfdChartProps> = ({ mfdProps, rows }: MfdChartProps) => {
  const [xScaleDomain, setXscaleDomain] = useState<number[]>([5, 9]);

  useEffect(() => {
    setXscaleDomain([mfdProps.minMagnitude, mfdProps.maxMagnitude]);
    console.log(mfdProps);
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

  // const curveColors: Record<string, string> = {};
  // mfdProps.series.map((value, index) => {
  //   curveColors[value] = colors[index];
  // });

  const getColor = (curve: string, index: number): string => {
    if (curve.includes('totalTargetGR')) {
      return 'orange';
    } else if (curve.includes('trulyOffFaultMFD')) {
      return 'steelblue';
    } else if (curve.includes('targetOnFaultSupraSeisMFD')) {
      return 'lightgray';
    } else if (curve.includes('totalSubSeismoOnFaultMFD')) {
      return 'black';
    } else if (curve.includes('solutionMFD')) {
      return 'red';
    } else {
      return 'yellow';
    }
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
              stroke={getColor(curve, index)}
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
        scale={scaleOrdinal({
          domain: mfdProps.series,
          range: ['orange', 'steelblue', 'lightgray', 'black', 'red'],
        })}
        shape="line"
        style={{ margin: '20px', position: 'absolute', top: 0, right: 0 }}
      />
    </Box>
  );
};

export default MfdChart;
