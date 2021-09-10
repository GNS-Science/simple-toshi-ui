import { graphql } from 'babel-plugin-relay/macro';
import React from 'react';
import GeneralTaskFilter from './GeneralTaskFilter';

interface GeneralTaskFilterContainerProps {
  readonly sweepArgs?: readonly ({
    readonly k: string | null;
    readonly v: readonly (string | null)[] | null;
  } | null)[];
  onChange: (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => void;
}

const GeneralTaskFilterContainer: React.FC<GeneralTaskFilterContainerProps> = ({
  sweepArgs,
  onChange,
}: GeneralTaskFilterContainerProps) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {sweepArgs?.map((argument) => (
        <GeneralTaskFilter key={`${argument?.k}-filter`} argument={argument} onChange={onChange} />
      ))}
    </div>
  );
};

export default GeneralTaskFilterContainer;

// const GeneralTaskFilterContainerQuery = graphql`
//   query GeneralTaskFilterContainerQuery($id: [ID!]) {
//     nodes(id_in: $id) {
//       result {
//         edges {
//           node {
//             __typename
//             ... on AutomationTask {
//               created
//               task_type
//               inversion_solution {
//                 id
//                 file_name
//                 meta {
//                   k
//                   v
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
