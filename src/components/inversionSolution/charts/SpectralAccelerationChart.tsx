import { Typography } from '@material-ui/core';
import { curveLinear } from '@visx/curve';
import { AnimatedAxis, AnimatedLineSeries, Grid, Tooltip, XYChart } from '@visx/xychart';
import React from 'react';
import { XY } from '../../../interfaces/common';

interface SpectralAccelerationChartProps {
  parentWidth: number;
  parentRef: HTMLDivElement | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resizeParent: (state: any) => void;
  data: XY[];
  subHeading: string;
  location: string;
}

const SpectralAccelerationChart: React.FC<SpectralAccelerationChartProps> = ({
  parentWidth,
  data,
  subHeading,
  location,
}: SpectralAccelerationChartProps) => {
  return (
    <>
      <div style={{ position: 'relative', width: '100%' }}>
        <XYChart
          height={parentWidth * 0.75}
          width={parentWidth}
          xScale={{ type: 'linear', domain: [-1, 10] }}
          yScale={{ type: 'linear', domain: [0, 6] }}
        >
          <AnimatedAxis label="Spectral Period (s)" orientation="bottom" />
          <AnimatedAxis label="Ground Motion (g)" orientation="left" />
          <text
            y={20}
            x={'50%'}
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={parentWidth * 0.035}
            fontWeight="bold"
          >{` ${location} Uniform Hazard Spectrum (opensha)`}</text>
          <text
            y={parentWidth * 0.035 + 20}
            x={'50%'}
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={parentWidth * 0.025}
          >
            {subHeading}
          </text>
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
          <Grid rows columns lineStyle={{ opacity: '90%' }} numTicks={6} />
          <AnimatedLineSeries
            dataKey="Spectral Acceleration"
            data={data}
            xAccessor={(d) => d.x}
            yAccessor={(d) => d.y}
            curve={curveLinear}
          />
        </XYChart>
      </div>
    </>
  );
};

export default SpectralAccelerationChart;
