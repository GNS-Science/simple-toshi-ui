import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';

interface InversionSolutionNrmlObjectParams {
  id: string;
  tab: string;
}

const InversionSolutionNrmlObject: React.FC = () => {
  const { id, tab } = useParams<InversionSolutionNrmlObjectParams>();
  const history = useHistory();
  return (
    <>
      <p>InversdionSolution Nrml</p>
      <Box>
        <Tabs
          orientation="vertical"
          value={tab ?? 'FileDetail'}
          onChange={(e, val) => history.push(`/InversionSolutionNrmlObject/${id}/${val}`)}
        >
          <Tab label="File Detail" id="fileDetailTab" value="FileDetail" />
        </Tabs>
      </Box>
    </>
  );
};

export default InversionSolutionNrmlObject;
