import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';
import { graphql } from 'babel-plugin-relay/macro';

interface InversionSolutionNrmlParams {
  id: string;
  tab: string;
}

const InversionSolutionNrml: React.FC = () => {
  const { id, tab } = useParams<InversionSolutionNrmlParams>();
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

export default InversionSolutionNrml;

const inversionSolutionNrmlQuery = graphql`
  query InversionSolutionNrmlQuery($id: ID!) {
    node(id: $id) {
      __typename
      ... on InversionSolutionNrml {
        id
        source_solution {
          id
        }
        meta {
          k
          v
        }
        file_name
        file_url
      }
    }
  }
`;
