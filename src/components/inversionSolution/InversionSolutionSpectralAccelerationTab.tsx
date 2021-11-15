import { Box, Card } from '@material-ui/core';
import { XYChart } from '@visx/xychart';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { getHazardTableOptions } from '../../service/inversionSolution.service';
import { InversionSolutionSpectralAccelerationTabQuery } from './__generated__/InversionSolutionSpectralAccelerationTabQuery.graphql';

interface InversionSolutionSpectralAccelerationTabProps {
  id: string;
}

const InversionSolutionSpectralAccelerationTab: React.FC<InversionSolutionSpectralAccelerationTabProps> = ({
  id,
}: InversionSolutionSpectralAccelerationTabProps) => {
  const data = useLazyLoadQuery<InversionSolutionSpectralAccelerationTabQuery>(
    inversionSolutionSpectralAccelerationTabQuery,
    { id },
  );

  const options = getHazardTableOptions(data);

  return (
    <>
      <Box>
        <Card>
          <Box>
            <div style={{ position: 'relative', width: '100%' }}>
              {/* <XYChart height={700} width={900}></XYChart> */}
            </div>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default InversionSolutionSpectralAccelerationTab;

export const inversionSolutionSpectralAccelerationTabQuery = graphql`
  query InversionSolutionSpectralAccelerationTabQuery($id: ID!) {
    node(id: $id) {
      ... on Table {
        id
        name
        created
        table_type
        object_id
        column_headers
        column_types
        rows
        dimensions {
          k
          v
        }
      }
    }
  }
`;
