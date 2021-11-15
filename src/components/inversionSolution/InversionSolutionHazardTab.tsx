import React, { useEffect, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { Typography, Box, Card, Snackbar } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import SelectControl from '../common/SelectControl';
import { InversionSolutionHazardTabQuery } from './__generated__/InversionSolutionHazardTabQuery.graphql';
import { XY } from '../../interfaces/common';
import { filterData, getHazardTableOptions } from '../../service/inversionSolution.service';
import MultiSelect from '../common/MultiSelect';
import MuiAlert from '@material-ui/lab/Alert';

import { scaleOrdinal } from '@visx/scale';
import { LegendOrdinal } from '@visx/legend';
import { HazardTableFilteredData } from '../../interfaces/inversionSolutions';
import { AnimatedAxis, AnimatedLineSeries, Grid, Tooltip, XYChart } from '@visx/xychart';
import { toProperCase } from '../../utils';

interface InversionSolutionHazardTabProps {
  id: string;
}

const InversionSolutionHazardTab: React.FC<InversionSolutionHazardTabProps> = ({
  id,
}: InversionSolutionHazardTabProps) => {
  const data = useLazyLoadQuery<InversionSolutionHazardTabQuery>(inversionSolutionHazardTabQuery, { id });
  const options = getHazardTableOptions(data);

  const [location, setLocation] = useState<string>(options.location[0]);
  const [PGA, setPGA] = useState<string[]>([options.PGA[0]]);
  const [forecastTime, setForecastTime] = useState<string>(options.forecastTime[0]);
  const [gmpe, setGmpe] = useState<string>(options.gmpe[0]);
  const [backgroundSeismicity, setBackgroundSeismicity] = useState<string>(options.backgroundSeismicity[0]);
  const [POE, setPOE] = useState<string>('None');
  const [POEdata, setPOEdata] = useState<XY[]>([]);

  const [filteredData, setFilteredData] = useState<HazardTableFilteredData>({});
  const [openNotification, setOpenNotification] = useState<boolean>(false);

  useEffect(() => {
    const filtered: HazardTableFilteredData = {};
    const pgaValues: string[] = [...PGA];
    if (pgaValues.includes('PGA')) {
      const index = pgaValues.indexOf('PGA');
      pgaValues[index] = '0.0';
    }

    pgaValues.map((pgaValue) => {
      const xy = filterData(data, location, pgaValue, forecastTime, gmpe, backgroundSeismicity);
      pgaValue === '0.0' ? (filtered['PGA'] = xy) : (filtered[pgaValue] = xy);
    });
    setFilteredData(filtered);
  }, [location, PGA, forecastTime, gmpe, backgroundSeismicity]);

  useEffect(() => {
    if (POE !== 'None') {
      const data = getPoE();
      setPOEdata(data);
    }
  }, [POE]);

  const handleSetPGA = (selections: string[]) => {
    if (selections.length > 8) {
      return setOpenNotification(true);
    }

    if (selections.includes('PGA')) {
      const i = selections.indexOf('PGA');
      selections[i] = '0.0';
    }

    const sorted = selections.sort((a: string, b: string): number => {
      const result = parseFloat(a) - parseFloat(b);
      return result;
    });

    if (sorted.includes('0.0')) {
      const i = sorted.indexOf('0.0');
      sorted[i] = 'PGA';
    }

    setPGA(sorted);
  };

  const colors = ['#FE1100', '#73d629', '#ffd700', '#7fe5f0', '#003366', '#ff7f50', '#047806', '#4ca3dd'];

  const ordinalColorScale = scaleOrdinal({
    domain: [...PGA],
    range: colors,
  });

  const getPoE = () => {
    const yValue = POE === '2%' ? 1 / 475 : 1 / 2475;
    return [
      { x: 1e-3, y: yValue },
      { x: 10, y: yValue },
    ];
  };

  return (
    <>
      <SelectControl name="Location" options={options.location} setOptions={setLocation} />
      <MultiSelect name="PGA/SA Period" selected={[]} options={options.PGA} setOptions={handleSetPGA} />
      <SelectControl name="Forecast Timespan" options={options.forecastTime} setOptions={setForecastTime} />
      <SelectControl
        name="Background Seismicity"
        options={options.backgroundSeismicity}
        setOptions={setBackgroundSeismicity}
      />
      <SelectControl name="Background Motion Model" options={options.gmpe} setOptions={setGmpe} />
      <Box>
        <Card>
          <Box style={{ width: '100%', padding: '1rem' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <XYChart
                height={700}
                width={900}
                xScale={{ type: 'log', domain: [1e-3, 10] }}
                yScale={{ type: 'log', domain: [1e-13, 2.0] }}
              >
                <text y={23} x={20} fontSize={20} fontWeight="bold">{`${location} hazard (opensha)`}</text>
                <text y={42} x={20} fontSize={15}>
                  {`PGA/SA Period: ${PGA.join(', ')}. Model: ${gmpe}. Background: ${toProperCase(
                    backgroundSeismicity,
                  )}d. Forecast: ${forecastTime} years.`}
                </text>
                <AnimatedAxis orientation="bottom" />
                <AnimatedAxis orientation="left" />
                <text y={11} x={-500} transform="rotate(-90)" fontSize={15}>
                  Annual Frequency of Exceedance
                </text>
                <text y={685} x={350} fontSize={15}>
                  Ground Motion (g)
                </text>
                {Object.keys(filteredData).map((key, index) => {
                  return (
                    <AnimatedLineSeries
                      key={key}
                      dataKey={key}
                      data={filteredData[key]}
                      xAccessor={(d: XY) => d?.x}
                      yAccessor={(d: XY) => d?.y}
                      stroke={colors[index]}
                    />
                  );
                })}
                {POE !== 'None' && (
                  <AnimatedLineSeries dataKey="poe" data={POEdata} xAccessor={(d) => d.x} yAccessor={(d) => d.y} />
                )}
                <Grid rows columns lineStyle={{ opacity: '90%' }} />
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
                    if (datum) {
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
              </XYChart>
              <div style={{ width: 100, height: 100, position: 'absolute', top: 50, left: 780, display: 'flex' }}>
                <LegendOrdinal direction="column" scale={ordinalColorScale} shape="line" style={{ fontSize: '15px' }} />
              </div>
            </div>
          </Box>
        </Card>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openNotification}
        onClose={() => setOpenNotification(false)}
      >
        <MuiAlert variant="filled" severity="warning">
          Sorry, we cannot show more than 8 curves in one chart.
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default InversionSolutionHazardTab;

export const inversionSolutionHazardTabQuery = graphql`
  query InversionSolutionHazardTabQuery($id: ID!) {
    node(id: $id) {
      ... on Table {
        id
        name
        created
        table_type
        object_id
        column_headers
        column_types
        rows
        dimensions {
          k
          v
        }
      }
    }
  }
`;
