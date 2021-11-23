import { Typography } from '@material-ui/core';
import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { AnimatedAxis, AnimatedLineSeries, Grid, Tooltip, XYChart } from '@visx/xychart';
import React from 'react';
import { XY } from '../../../interfaces/common';
import { HazardTableFilteredData } from '../../../interfaces/inversionSolutions';

interface HazardCurvesProps {
  height: number;
  width: number;
  data: HazardTableFilteredData;
  POE: string;
  PGA: string[];
  POEdata: XY[];
  subHeading: string;
  location: string;
}

const HazardCurves: React.FC<HazardCurvesProps> = ({
  height,
  width,
  data,
  POE,
  PGA,
  POEdata,
  subHeading,
  location,
}: HazardCurvesProps) => {
  const colors = ['#FE1100', '#73d629', '#ffd700', '#7fe5f0', '#003366', '#ff7f50', '#047806', '#4ca3dd', '#000000'];

  const ordinalColorScale = scaleOrdinal({
    domain: POE === 'None' ? [...PGA] : [...PGA, `POE ${POE}`],
    range: colors,
  });

  return (
    <>
      <div style={{ position: 'relative', width: '100%' }}>
        <XYChart
          height={height}
          width={width}
          xScale={{ type: 'log', domain: [1e-3, 10] }}
          yScale={{ type: 'log', domain: [1e-13, 2.0] }}
        >
          <text y={23} x={20} fontSize={20} fontWeight="bold">{`${location} hazard (opensha)`}</text>
          <text y={42} x={20} fontSize={15}>
            {subHeading}
          </text>
          <AnimatedAxis label="Ground Motion (g)" orientation="bottom" />
          <AnimatedAxis label="Annual Frequency of Exceedance" orientation="left" />
          <Tooltip
            showHorizontalCrosshair
            showVerticalCrosshair
            snapTooltipToDatumX
            snapTooltipToDatumY
            showDatumGlyph
            glyphStyle={{ fill: '#000' }}
            renderTooltip={({ tooltipData }) => {
              const datum = tooltipData?.nearestDatum?.datum as XY;
              const key = tooltipData?.nearestDatum?.key as string;
              if (key !== '2%' && key !== '10%' && datum) {
                return (
                  <>
                    <Typography>
                      <span
                        style={{
                          background: ordinalColorScale(key as string),
                          width: 8,
                          height: 8,
                          display: 'inline-block',
                          marginRight: 4,
                          borderRadius: 8,
                        }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      {key}
                    </Typography>
                    <Typography>x: {datum.x.toExponential()}</Typography>
                    <Typography>y: {datum.y.toExponential()}</Typography>
                  </>
                );
              }
            }}
          />
          <Grid rows columns lineStyle={{ opacity: '90%' }} numTicks={10} />
          {Object.keys(data).map((key, index) => {
            return (
              <AnimatedLineSeries
                key={key}
                dataKey={key}
                data={data[key]}
                xAccessor={(d: XY) => d?.x}
                yAccessor={(d: XY) => d?.y}
                stroke={colors[index]}
              />
            );
          })}
          {POE !== 'None' && (
            <AnimatedLineSeries
              dataKey={POE}
              data={POEdata}
              xAccessor={(d) => d.x}
              yAccessor={(d) => d.y}
              stroke={colors[PGA.length]}
            />
          )}
        </XYChart>
        <div style={{ width: 100, height: 100, position: 'absolute', top: height * 0.45, left: 70, display: 'flex' }}>
          <LegendOrdinal direction="column" scale={ordinalColorScale} shape="line" style={{ fontSize: '15px' }} />
        </div>
      </div>
    </>
  );
};

export default HazardCurves;
