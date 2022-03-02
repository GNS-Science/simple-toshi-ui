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
import {
  mfdCurvesOptions,
  oldMFDseries,
  regionalizedMfdColors,
  regionalizedMfdSeries,
  subductionMFDprops,
  v1MFDseries,
} from '../../constants/mfdSeries';

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
    options.push(option.displayName);
  });

  const series: string[] = [];
  regionalizedMfdSeries.map((option) => {
    series.push(option.path);
  });

  const [region, setRegion] = useState<string>('TVZ');
  const [mfdCurveNames, setMfdCurveNames] = useState<string[]>(options);
  const [mfdCurvePaths, setMfdCurvePaths] = useState<string[]>([]);
  const [mfdProps, setMfdProps] = useState<MfdProps>({ series: [], colours: [], maxMagnitude: 10.0, minMagnitude: 0 });

  const data = useLazyLoadQuery<InversionSolutionMfdTabQuery>(inversionSolutionMfdTabQuery, { id: mfdTableId });
  const rows = data?.node?.rows;

  const config_type = meta?.filter((kv) => kv?.k == 'config_type')[0]?.v;

  // //Removes filename & file id from inversion meta data list
  const cleanedMeta = meta?.filter((el) => {
    return el?.k !== 'rupture_set' && el?.k !== 'rupture_set_file_id';
  });
  // //Converting cleaned data to string
  const metaAsString = cleanedMeta?.map((kv) => ' ' + kv?.k + ': ' + kv?.v).toString() ?? '';

  useEffect(() => {
    if (isV2 === false) {
      if (config_type == 'subduction') {
        setMfdProps(subductionMFDprops);
      } else {
        let series: string[];
        rows?.some((value) => {
          return value?.includes('InversionTargetMFDs.targetOnFaultSupraSeisMFD_SansTVZ');
        })
          ? (series = oldMFDseries)
          : (series = v1MFDseries);
        setMfdProps({
          colours: regionalizedMfdColors,
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
    const selections: string[] = [];
    mfdCurveNames.map((name) => {
      mfdCurvesOptions.map((curve) => {
        if (curve.displayName === name) {
          selections.push(curve.path);
        }
      });
    });
    setMfdCurvePaths(selections);
  }, [mfdCurveNames]);

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
        return mfdCurvePaths.some((curve) => {
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
  }, [region, mfdCurvePaths]);

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
            <MultiSelect name="MFD Curves" options={options} selected={mfdCurveNames} setOptions={setMfdCurveNames} />
          </ControlsBar>
        </>
      )}
      <MfdChart mfdProps={mfdProps} rows={rows} isV2={isV2} />
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
