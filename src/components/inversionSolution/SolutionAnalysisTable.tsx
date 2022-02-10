import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { RowData } from '../../interfaces/inversionSolutions';
import { generateSolutionAnalysisTable } from '../../service/inversionSolution.service';

interface SolutionAnalysisTableProps {
  data: string | null;
}

const SolutionAnalysisTable: React.FC<SolutionAnalysisTableProps> = ({ data }: SolutionAnalysisTableProps) => {
  const [rowData, setRowData] = useState<RowData[]>([]);

  useEffect(() => {
    if (data) {
      const tableData = generateSolutionAnalysisTable(data);
      setRowData(tableData);
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
