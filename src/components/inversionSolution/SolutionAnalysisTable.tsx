import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { startOfMinute } from 'date-fns';
import React, { useEffect, useState } from 'react';

interface SolutionAnalysisTableProps {
  data: string | null;
}

interface Feature {
  id: number;
  type: string;
  properties: FeatureProperties;
  geometry: any;
}

interface FeatureProperties {
  'annual_rate.max': string;
  'annual_rate.min': string;
  'annual_rate.sum': string;
  aseismic_slip_factor: string;
  coupling_coeff: string;
  dip_degree: number;
  dip_dir: number;
  fault_name: string;
  low_depth: number;
  magnitude_count: number;
  magnitude_max: number;
  magnitude_min: number;
  parent_id: number;
  parent_name: string;
  rake: number;
  section_index: number;
  sections_index_rk: string;
  slip_rate: number;
  slip_rate_std_dev: number;
  solution_id: string;
  up_depth: number;
}

interface RowData {
  name: string;
  maxMag: number;
  minMag: number;
  maxRate: string;
  minRate: string;
  slipRate: number;
}

const SolutionAnalysisTable: React.FC<SolutionAnalysisTableProps> = ({ data }: SolutionAnalysisTableProps) => {
  const [rowData, setRowData] = useState<RowData[]>([]);

  useEffect(() => {
    if (data) {
      const dataParsed = JSON.parse(data);
      const rows: RowData[] = [];
      dataParsed.features.map((feature: Feature) => {
        rows.push({
          name: feature.properties.fault_name,
          maxMag: feature.properties.magnitude_max,
          minMag: feature.properties.magnitude_min,
          maxRate: feature.properties['annual_rate.max'],
          minRate: feature.properties['annual_rate.min'],
          slipRate: feature.properties.slip_rate,
        });
      });
      console.log('rows in useEffect', rows);
      setRowData(rows);
    }
  }, [data]);

  useEffect(() => {
    console.log(rowData);
  }, [rowData]);
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subsection Name</TableCell>
              <TableCell>Max Magnitude</TableCell>
              <TableCell>Min Magnitude</TableCell>
              <TableCell>Max Annual Rate</TableCell>
              <TableCell>Min Annual Rate</TableCell>
              <TableCell>Slip Rate</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
};

export default SolutionAnalysisTable;
