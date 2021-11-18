import { Box, Typography } from '@material-ui/core';
import { curveLinear } from '@visx/curve';
import { AnimatedAxis, AnimatedLineSeries, Tooltip, XYChart } from '@visx/xychart';
import React from 'react';
import { XY } from '../../../interfaces/common';

interface SpectralAccelerationChartProps {
  height: number;
  width: number;
  data: XY[];
}

const SpectralAccelerationChart: React.FC<SpectralAccelerationChartProps> = ({
  height,
  width,
  data,
}: SpectralAccelerationChartProps) => {
  return (
    <>
      <div style={{ position: 'relative', width: '100%' }}>
        <XYChart
          height={height}
          width={width}
          xScale={{ type: 'linear', domain: [-1, 10] }}
          yScale={{ type: 'linear', domain: [0, 6] }}
        >
          <AnimatedLineSeries
            dataKey="Spectral Acceleration"
            data={data}
            xAccessor={(d) => d.x}
            yAccessor={(d) => d.y}
            curve={curveLinear}
          />
          <AnimatedAxis label="Spectral Period (s)" orientation="bottom" />
          <AnimatedAxis label="Ground Motion (g)" orientation="left" />
          <Tooltip
            showHorizontalCrosshair
            showVerticalCrosshair
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
                    <Typography>y: {datum.y.toExponential()}</Typography>
                  </>
                );
              }
            }}
          />
        </XYChart>
      </div>
    </>
  );
};

export default SpectralAccelerationChart;
