import { Typography } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { useParams } from 'react-router-dom';
import KeyValueTable from './KeyValueTable';
import TruncateText from './TruncateText';
import { FileDetailQuery } from './__generated__/FileDetailQuery.graphql';

interface FileDetailParams {
  id: string;
}

const fileDetailQuery = graphql`
  query FileDetailQuery($id: ID!) {
    node(id: $id) {
      ... on File {
        id
        file_name
        file_size
        file_url
        md5_digest
        meta {
          k
          v
        }
      }
    }
  }
`;

const FileDetail: React.FC = () => {
  const { id } = useParams<FileDetailParams>();
  const data = useLazyLoadQuery<FileDetailQuery>(fileDetailQuery, { id });

  if (!data?.node) {
    return (
      <Typography variant="h5" gutterBottom>
        File Detail: Id Not Found
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        <a href={data?.node?.file_url ?? ''}>Download</a>
      </Typography>
      <Typography>
        <strong>File name:</strong> {data?.node?.file_name}
      </Typography>
      <Typography>
        <strong>File size:</strong> {data?.node?.file_size} bytes
      </Typography>
      <Typography>
        <strong>MD5 digest:</strong> {data?.node?.md5_digest}
      </Typography>
      <Typography>
        <strong>File ID:</strong> {data?.node?.id}
      </Typography>

      {data?.node?.meta && <KeyValueTable header="Meta" data={data?.node?.meta} />}
    </>
  );
};

export default FileDetail;
