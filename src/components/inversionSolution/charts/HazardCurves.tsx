import { Typography } from '@mui/material';
import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { AnimatedAxis, AnimatedLineSeries, Grid, Tooltip, XYChart } from '@visx/xychart';
import React, { useEffect, useMemo, useState } from 'react';
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
  timeSpan: string;
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
  timeSpan,
}: HazardCurvesProps) => {
  const [currentColors, setCurrentColors] = useState<string[]>([]);
  const [headingSize, setHeadingSize] = useState<number>(0);
  const [subHeadingSize, setSubHeadingSize] = useState<number>(0);

  useEffect(() => {
    parentWidth * 0.035 >= 24 ? setHeadingSize(24) : setHeadingSize(parentWidth * 0.035);
    parentWidth * 0.025 >= 15 ? setSubHeadingSize(15) : setSubHeadingSize(parentWidth * 0.025);
  }, [parentWidth]);

  const curveColors: Record<string, string> = useMemo(() => {
    const colors = ['#000000', '#FE1100', '#73d629', '#ffd700', '#7fe5f0', '#003366', '#ff7f50', '#047806', '#4ca3dd'];
    const currentColors: Record<string, string> = {};

    PGAoptions.map((value, index) => {
      currentColors[value] = colors[index];
    });
    return currentColors;
  }, [PGAoptions]);

  useEffect(() => {
    const currentColorsArray: string[] = [];
    PGA.map((value) => {
      currentColorsArray.push(curveColors[value]);
    });
    setCurrentColors(currentColorsArray);
  }, [curveColors, PGA]);

  const ordinalColorScale = scaleOrdinal({
    domain: POE === 'None' ? [...PGA] : [...PGA, `PoE ${POE}`],
    range: POE === 'None' ? [...currentColors] : [...currentColors, '#989C9C'],
  });

  return (
    <>
      <div style={{ position: 'relative', width: '100%' }}>
        <XYChart
          height={parentWidth * 0.75}
          width={parentWidth}
          xScale={{ type: 'log', domain: [1e-3, 10] }}
          yScale={{ type: 'log', domain: [1e-5, 1] }}
        >
          <text
            y={18}
            x={'50%'}
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={headingSize}
            fontWeight="bold"
          >{`${location} Hazard (opensha)`}</text>
          <text
            y={headingSize + 18}
            x={'50%'}
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={subHeadingSize}
          >
            {subHeading}
          </text>
          <AnimatedAxis label="Acceleration (g)" orientation="bottom" />
          <AnimatedAxis label={`Probability of Exceedance in ${timeSpan} Years`} labelOffset={20} orientation="left" />
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
                    <Typography>x: {datum.x.toExponential(2)}</Typography>
                    <Typography>y: {datum.y.toExponential(2)}</Typography>
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
              stroke={'#989C9C'}
            />
          )}
        </XYChart>
        <div
          style={{ width: 100, height: 100, position: 'absolute', top: parentWidth * 0.35, left: 70, display: 'flex' }}
        >
          <LegendOrdinal
            direction="column"
            scale={ordinalColorScale}
            shape="line"
            style={{ fontSize: parentWidth * 0.02 }}
            shapeHeight={parentWidth * 0.02}
          />
        </div>
      </div>
    </>
  );
};

export default HazardCurves;
