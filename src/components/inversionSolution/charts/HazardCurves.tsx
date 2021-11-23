import { Typography } from '@material-ui/core';
import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { AnimatedAxis, AnimatedLineSeries, Grid, Tooltip, XYChart } from '@visx/xychart';
import React, { useEffect, useState } from 'react';
import { XY } from '../../../interfaces/common';
import { HazardTableFilteredData } from '../../../interfaces/inversionSolutions';

interface HazardCurvesProps {
  parentWidth: number;
  parentRef: HTMLDivElement | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resizeParent: (state: any) => void;
  data: HazardTableFilteredData;
  POE: string;
  PGA: string[];
  PGAoptions: string[];
  POEdata: XY[];
  subHeading: string;
  location: string;
}

const HazardCurves: React.FC<HazardCurvesProps> = ({
  parentWidth,
  data,
  POE,
  PGA,
  PGAoptions,
  POEdata,
  subHeading,
  location,
}: HazardCurvesProps) => {
  const colors = ['#000000', '#FE1100', '#73d629', '#ffd700', '#7fe5f0', '#003366', '#ff7f50', '#047806', '#4ca3dd'];
  const [width, setWidth] = useState<number>(0);

  const curveColors: Record<string, string> = {};

  PGAoptions.map((value, index) => {
    curveColors[value] = colors[index];
  });

  useEffect(() => {
    if (parentWidth <= 350) {
      setWidth(350);
    } else {
      setWidth(parentWidth);
    }
  }, [parentWidth]);

  const ordinalColorScale = scaleOrdinal({
    domain: POE === 'None' ? [...PGA] : [...PGA, `POE ${POE}`],
    range: colors,
  });

  return (
    <>
      <div style={{ position: 'relative', width: '100%' }}>
        <XYChart
          height={width * 0.75}
          width={width}
          xScale={{ type: 'log', domain: [1e-3, 10] }}
          yScale={{ type: 'log', domain: [1e-13, 2.0] }}
        >
          <text
            y={23}
            x={'50%'}
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={width * 0.035}
            fontWeight="bold"
          >{`${location} Hazard (opensha)`}</text>
          <text
            y={parentWidth * 0.035 + 20}
            x={'50%'}
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={width * 0.025}
          >
            {subHeading}
          </text>
          <AnimatedAxis label="Ground Motion (g)" orientation="bottom" />
          <AnimatedAxis label="Annual Frequency of Exceedance" labelOffset={20} orientation="left" />
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
          {Object.keys(data).map((key) => {
            return (
              <AnimatedLineSeries
                key={key}
                dataKey={key}
                data={data[key]}
                xAccessor={(d: XY) => d?.x}
                yAccessor={(d: XY) => d?.y}
                stroke={curveColors[key]}
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
        <div style={{ width: 100, height: 100, position: 'absolute', top: width * 0.3, left: 70, display: 'flex' }}>
          <LegendOrdinal
            direction="column"
            scale={ordinalColorScale}
            shape="line"
            style={{ fontSize: width * 0.02 }}
            shapeHeight={width * 0.02}
          />
        </div>
      </div>
    </>
  );
};

export default HazardCurves;
