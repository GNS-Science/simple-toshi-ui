import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as math from 'mathjs';

interface SolutionAnalysisTableProps {
  data: string | null;
}

interface Feature {
  id: number;
  type: string;
  properties: FeatureProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  magnitude_count: string;
  'magnitude.max': number;
  'magnitude.min': number;
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
          maxMag: math.round(feature.properties['magnitude.max'], 1),
          minMag: math.round(feature.properties['magnitude.min'], 1),
          maxRate: Number(feature.properties['annual_rate.max']).toPrecision(3),
          minRate: Number(feature.properties['annual_rate.min']).toPrecision(3),
          slipRate: math.round(feature.properties.slip_rate, 1),
        });
      });
      setRowData(rows);
    }
  }, [data]);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subsection Name</TableCell>
              <TableCell>Min Magnitude</TableCell>
              <TableCell>Max Magnitude</TableCell>
              <TableCell>Min Annual Rate</TableCell>
              <TableCell>Max Annual Rate</TableCell>
              <TableCell>Slip Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData &&
              rowData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.minMag}</TableCell>
                  <TableCell>{row.maxMag}</TableCell>
                  <TableCell>{row.minRate}</TableCell>
                  <TableCell>{row.maxRate}</TableCell>
                  <TableCell>{row.slipRate}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SolutionAnalysisTable;
