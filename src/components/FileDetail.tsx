import { Typography } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { Link, useParams } from 'react-router-dom';
import KeyValueTable from './KeyValueTable';
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

/**
 * Formats bytes to human readable string. Adapted from:
 * https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript/
 */
const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const FileDetail: React.FC = () => {
  const { id } = useParams<FileDetailParams>();
  const data = useLazyLoadQuery<FileDetailQuery>(fileDetailQuery, { id });

  if (!data?.node) {
    return (
      <Typography variant="h5" gutterBottom>
        File ID Not Found
      </Typography>
    );
  }

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

      {data?.node?.meta && <KeyValueTable header="Meta" data={data?.node?.meta} />}
    </>
  );
};

export default FileDetail;
