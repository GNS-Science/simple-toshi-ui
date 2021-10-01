import { Button, Typography } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import React, { useContext, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import DiagnosticReportControls from '../components/diagnosticReportView/DiagnosticReportControls';
import MySolutionsList from '../components/mySolutions/MySolutionsList';
import LocalStorageContext from '../contexts/localStorage';
import { SolutionItem } from '../interfaces/mySolutions';
import { MySolutionsQuery } from './__generated__/MySolutionsQuery.graphql';
import { diagnosticReportViewOptions as options } from '../constants/diagnosticReport';

const MySolutions: React.FC = () => {
  const { ISFavourites } = useContext(LocalStorageContext);
  const [showList, setShowList] = useState(true);
  const [viewOptions, setViewOptions] = useState<string[]>([options[0].finalPath]);
  const id: string[] = [];

  for (const inversionSolution in ISFavourites) {
    id.push(ISFavourites[inversionSolution].producedBy);
  }

  const data = useLazyLoadQuery<MySolutionsQuery>(mySolutionsQuery, { id });
  const inversionSolutions = data?.nodes?.result?.edges.map((e) => e?.node) ?? [];
  const validatedIS: SolutionItem[] = [];

  inversionSolutions.map((item) => {
    if (item && item !== null && item.__typename === 'AutomationTask') {
      validatedIS.push(item);
    }
  });
  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    const newValue = (event.target.value as string[]) || [];
    setViewOptions(newValue);
  };
  return (
    <>
      <Typography variant="h5" gutterBottom>
        My Solutions
      </Typography>
      <Button variant="contained" color="default">
        Show Report
      </Button>
      <DiagnosticReportControls setViewOption={handleChange} />
      <MySolutionsList solutionsList={validatedIS} />
    </>
  );
};

export default MySolutions;

export const mySolutionsQuery = graphql`
  query MySolutionsQuery($id: [ID!]) {
    nodes(id_in: $id) {
      result {
        edges {
          node {
            __typename
            ... on AutomationTask {
              id
              parents {
                edges {
                  node {
                    parent {
                      ... on GeneralTask {
                        id
                        created
                        title
                        description #hover
                        model_type
                        swept_arguments
                        notes #hover
                      }
                    }
                  }
                }
              }
              inversion_solution {
                id
                meta {
                  k
                  v
                }
              }
            }
          }
        }
      }
    }
  }
`;
