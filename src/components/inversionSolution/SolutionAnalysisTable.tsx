import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

import { RowData } from '../../interfaces/inversionSolutions';
import { generateSolutionAnalysisTable } from '../../service/inversionSolution.service';

interface SolutionAnalysisTableProps {
  id: string;
  data: string | null;
}
const columns: GridColDef[] = [
  { field: 'id', hide: true },
  { field: 'name', headerName: 'Subsection Name', width: 150 },
  { field: 'minMag', headerName: 'Min Magnitude', type: 'number', width: 150 },
  { field: 'maxMag', headerName: 'Max Magnitude', type: 'number', width: 150 },
  { field: 'minRate', headerName: 'Min Annual Rate', type: 'number', width: 150 },
  { field: 'maxRate', headerName: 'Max Annual Rate', type: 'number', width: 150 },
  { field: 'slipRate', headerName: 'Slip Rate', type: 'number', width: 150 },
];

const SolutionAnalysisTable: React.FC<SolutionAnalysisTableProps> = ({ id, data }: SolutionAnalysisTableProps) => {
  const [rowData, setRowData] = useState<RowData[]>([]);

  const handler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.nativeEvent.stopImmediatePropagation();
  };

  useEffect(() => {
    if (data) {
      const tableData = generateSolutionAnalysisTable(data);
      setRowData(tableData);
    }
  }, [data]);

  return (
    <div
      onKeyDown={(e) => {
        handler(e);
      }}
    >
      <DataGrid
        style={{ height: 400, width: '100%' }}
        rows={rowData}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{ toolbar: { csvOptions: { fileName: `${id}_analysis` } } }}
      />
    </div>
  );
};
export default SolutionAnalysisTable;
