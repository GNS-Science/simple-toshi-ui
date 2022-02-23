import React, { useEffect, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Box, Typography } from '@mui/material';

import { InversionSolutionMfdTabQuery } from './__generated__/InversionSolutionMfdTabQuery.graphql';

import ControlsBar from '../common/ControlsBar';
import SelectControl from '../common/SelectControl';
import MultiSelect from '../common/MultiSelect';
import { MfdProps } from '../../interfaces/inversionSolutions';
import MfdChart from './charts/MfdChart';
import { mfdCurvesOptions, regionalizedMfdColors, regionalizedMfdSeries } from '../../constants/regionalizedMfdSeries';

interface InversionSolutionMfdTabProps {
  mfdTableId: string;
  meta:
    | readonly ({
        readonly k: string | null;
        readonly v: string | null;
      } | null)[]
    | null
    | undefined;
  isV2: boolean;
}

const InversionSolutionMfdTab: React.FC<InversionSolutionMfdTabProps> = ({
  mfdTableId,
  meta,
  isV2,
}: InversionSolutionMfdTabProps) => {
  const options: string[] = [];
  mfdCurvesOptions.map((option) => {
    options.push(option.path);
  });

  const series: string[] = [];
  regionalizedMfdSeries.map((option) => {
    series.push(option.path);
  });

  const [region, setRegion] = useState<string>('TVZ');
  const [mfdCurves, setMfdCurves] = useState<string[]>(options);
  const [mfdProps, setMfdProps] = useState<MfdProps>({ series: [], colours: [], maxMagnitude: 10.0, minMagnitude: 0 });

  const data = useLazyLoadQuery<InversionSolutionMfdTabQuery>(inversionSolutionMfdTabQuery, { id: mfdTableId });
  const rows = data?.node?.rows;
  console.log(rows);
  // setRowsData(rows);

  const config_type = meta?.filter((kv) => kv?.k == 'config_type')[0]?.v;
  // console.log(meta);
  // console.log(config_type);

  // //Removes filename & file id from inversion meta data list
  const cleanedMeta = meta?.filter((el) => {
    return el?.k !== 'rupture_set' && el?.k !== 'rupture_set_file_id';
  });
  // //Converting cleaned data to string
  const metaAsString = cleanedMeta?.map((kv) => ' ' + kv?.k + ': ' + kv?.v).toString() ?? '';

  useEffect(() => {
    if (isV2 === false) {
      if (config_type == 'subduction') {
        setMfdProps({
          colours: ['steelblue', 'red'],
          series: ['targetOnFaultSupraSeisMFD', 'solutionMFD_rateWeighted'],
          maxMagnitude: 9.5,
          minMagnitude: 6.5,
        });
      } else {
        let series: string[] = [];
        rows?.some((value) => {
          return value?.includes('InversionTargetMFDs.targetOnFaultSupraSeisMFD_SansTVZ');
        })
          ? (series = [
              'trulyOffFaultMFD.all',
              'InversionTargetMFDs.targetOnFaultSupraSeisMFD_SansTVZ',
              'InversionTargetMFDs.targetOnFaultSupraSeisMFD_TVZ',
              'totalSubSeismoOnFaultMFD',
              'solutionMFD_rateWeighted',
            ])
          : (series = [
              'trulyOffFaultMFD.all',
              'targetOnFaultSupraSeisMFD_SansTVZ',
              'targetOnFaultSupraSeisMFD_TVZ',
              'totalSubSeismoOnFaultMFD',
              'solutionMFD_rateWeighted',
            ]);
        setMfdProps({
          colours: ['orange', 'steelblue', 'lightgray', 'black', 'red'],
          series,
          maxMagnitude: 9.0,
          minMagnitude: 5.0,
        });
      }
    } else {
      const series: string[] = [];
      regionalizedMfdSeries.map((item) => {
        if (item.path.includes('TVZ') && !item.path.includes('SansTVZ')) {
          series.push(item.path);
        }
      });
      setMfdProps({
        series,
        colours: regionalizedMfdColors,
        maxMagnitude: 9.0,
        minMagnitude: 5.0,
      });
    }
  }, [isV2]);

  useEffect(() => {
    if (isV2) {
      let filteredSeries: string[];
      if (region === 'Both') {
        filteredSeries = series.filter((item) => {
          return item.includes('all') || item === 'solutionMFD';
        });
      } else {
        filteredSeries = series.filter((item) => {
          return item.includes(region) && !item.includes(`Sans${region}`);
        });
      }
      filteredSeries = filteredSeries.filter((item) => {
        return mfdCurves.some((curve) => {
          return item.includes(curve);
        });
      });
      setMfdProps({
        series: filteredSeries,
        colours: mfdProps.colours,
        maxMagnitude: 9,
        minMagnitude: 5,
      });
    }
  }, [region, mfdCurves]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Solution Target vs final Magnitude Frequency distribution
      </Typography>
      <Box style={{ width: '100%', color: '#646464', padding: '1rem' }}>{metaAsString}</Box>
      {isV2 && (
        <>
          <ControlsBar>
            <SelectControl name="Region" options={['TVZ', 'SansTVZ', 'Both']} setOptions={setRegion} />
            <MultiSelect name="MFD Curves" options={options} selected={mfdCurves} setOptions={setMfdCurves} />
          </ControlsBar>
        </>
      )}
      <MfdChart mfdProps={mfdProps} rows={rows} />
    </>
  );
};

export default InversionSolutionMfdTab;

export const inversionSolutionMfdTabQuery = graphql`
  query InversionSolutionMfdTabQuery($id: ID!) {
    node(id: $id) {
      ... on Table {
        id
        name
        column_types
        column_headers
        rows
      }
    }
  }
`;
