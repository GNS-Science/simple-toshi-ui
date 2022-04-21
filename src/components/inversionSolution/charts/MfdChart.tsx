import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { XYChart, AnimatedAxis, AnimatedLineSeries, Tooltip } from '@visx/xychart';

import { MfdProps } from '../../../interfaces/inversionSolutions';
import { IMagRate, magRateData } from '../../PreviewMFD_data';
import { regionalizedMfdSeries } from '../../../constants/mfdSeries';
import { mapMFDcurveColors } from '../../../service/inversionSolution.service';
import { replaceMissingValues } from '../../../service/dynamicMfd.service';

interface MfdChartProps {
  mfdProps: MfdProps;
  rows: readonly (readonly (string | null)[] | null)[] | null | undefined;
  isV2: boolean;
}

const MfdChart: React.FC<MfdChartProps> = ({ mfdProps, rows, isV2 }: MfdChartProps) => {
  const [colors, setColors] = useState<Record<string, string>>({});

  const getMfdCurve = (series: string[], index: number): Array<IMagRate> => {
    let curves: Array<IMagRate> = [];
    if (rows)
      curves = magRateData(
        rows
          .filter((row) => row && row[1] == series[index])
          .map((r) => (r ? [parseFloat(r[2] ?? ''), parseFloat(r[3] ?? '')] : [])),
      );
    return replaceMissingValues(curves);
  };

  useEffect(() => {
    setColors(mapMFDcurveColors(mfdProps.series));
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
        regionalizedMfdSeries.map((options) => {
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

  if (!rows) {
    return <>There is no mfd curve</>;
  }

  return (
    <Box style={{ border: '1px solid', width: 'fit-content', position: 'relative' }}>
      <XYChart
        height={600}
        width={800}
        margin={{ bottom: 30, left: 50, right: 50, top: 10 }}
        xScale={{ type: 'linear', domain: [mfdProps.minMagnitude, mfdProps.maxMagnitude], zero: false }}
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
