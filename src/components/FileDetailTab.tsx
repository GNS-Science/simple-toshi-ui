import { Typography } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import React from 'react';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Link } from 'react-router-dom';
import { formatBytes } from './FileDetail';
import { FileDetailTabQuery } from './__generated__/FileDetailTabQuery.graphql';

export const fileDetailTabQuery = graphql`
  query FileDetailTabQuery($id: ID!) {
    node(id: $id) {
      ... on File {
        id
        file_name
        file_size
        file_url
        md5_digest
        relations {
          edges {
            node {
              role
              thing {
                ... on Node {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface FileDetailTabProps {
  queryRef: PreloadedQuery<FileDetailTabQuery, Record<string, unknown>>;
}

const FileDetailTab: React.FC<FileDetailTabProps> = ({ queryRef }: FileDetailTabProps) => {
  const data = usePreloadedQuery<FileDetailTabQuery>(fileDetailTabQuery, queryRef);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        File Detail (id: {data?.node?.id})
      </Typography>
      <Typography>
        <strong>File name:</strong> {data?.node?.file_name}
      </Typography>
      <Typography>
        <strong>File size:</strong> {formatBytes(data?.node?.file_size ?? 0)}
      </Typography>
      <Typography>
        <strong>MD5 digest:</strong> {data?.node?.md5_digest}
      </Typography>
      <Typography>
        <strong>Written by: </strong>
        {data?.node?.relations?.edges
          ?.filter((e) => e?.node?.role === 'WRITE')
          ?.map((e, i, { length }) => {
            return (
              <React.Fragment key={e?.node?.thing?.id}>
                <Link to={`/RuptureGenerationTask/${e?.node?.thing?.id}`}>
                  {Buffer.from(e?.node?.thing?.id ?? '', 'base64').toString()}
                </Link>
                {i + 1 !== length && <span>, </span>}
              </React.Fragment>
            );
          })}
      </Typography>
      <Typography>
        <a href={data?.node?.file_url ?? ''}>Download</a>
      </Typography>
    </>
  );
};

export default FileDetailTab;
