import { Typography } from '@material-ui/core';
import { curveLinear } from '@visx/curve';
import { AnimatedAxis, AnimatedLineSeries, Grid, Tooltip, XYChart } from '@visx/xychart';
import React, { useEffect, useState } from 'react';
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
  const [headingSize, setHeadingSize] = useState<number>(0);
  const [subHeadingSize, setSubHeadingSize] = useState<number>(0);

  useEffect(() => {
    parentWidth * 0.035 >= 24 ? setHeadingSize(24) : setHeadingSize(parentWidth * 0.035);
    parentWidth * 0.025 >= 15 ? setSubHeadingSize(15) : setSubHeadingSize(parentWidth * 0.025);
  }, [parentWidth]);

  return (
    <>
      <div style={{ position: 'relative', width: '100%' }}>
        <XYChart
          height={parentWidth * 0.75}
          width={parentWidth}
          xScale={{ type: 'linear', domain: [-1, 10] }}
          yScale={{ type: 'linear', domain: [0, 2] }}
        >
          <text
            y={18}
            x={'50%'}
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={headingSize}
            fontWeight="bold"
          >{` ${location} Uniform Hazard Spectrum (opensha)`}</text>
          <text
            y={headingSize + 18}
            x={'50%'}
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={subHeadingSize}
            style={{ margin: 10 }}
          >
            {subHeading}
          </text>
          <AnimatedAxis label="Spectral Period (s)" orientation="bottom" />
          <AnimatedAxis label="Pseudo-Spectral Acceleration (g)" orientation="left" />
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
                    <Typography>x: {datum.x === 0.01 ? 0 : datum.x}</Typography>
                    <Typography>y: {datum.y.toExponential(2)}</Typography>
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
