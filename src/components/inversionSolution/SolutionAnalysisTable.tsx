import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { RowData } from '../../interfaces/inversionSolutions';
import { generateSolutionAnalysisTable } from '../../service/inversionSolution.service';

interface SolutionAnalysisTableProps {
  data: string | null;
}
const columns: GridColDef[] = [
  { field: 'id', hide: true },
  { field: 'name', headerName: 'Subsection Name', width: 150 },
  { field: 'minMag', headerName: 'Min Magnitude', type: 'number', width: 150 },
  { field: 'maxMag', headerName: 'Max Magnitude', type: 'number', width: 150 },
  { field: 'minRate', headerName: 'Min Annual Rate', width: 150 },
  { field: 'maxRate', headerName: 'Max Annual Rate', width: 150 },
  { field: 'slipRate', headerName: 'Slip Rate', type: 'number', width: 150 },
];

const SolutionAnalysisTable: React.FC<SolutionAnalysisTableProps> = ({ data }: SolutionAnalysisTableProps) => {
  const [rowData, setRowData] = useState<RowData[]>([]);

  useEffect(() => {
    if (data) {
      const tableData = generateSolutionAnalysisTable(data);
      setRowData(tableData);
    }
  }, [data]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rowData} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  );
};
export default SolutionAnalysisTable;
