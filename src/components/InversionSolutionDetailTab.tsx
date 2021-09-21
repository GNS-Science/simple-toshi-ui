import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatBytes } from './FileDetail';
import { InversionSolutionDetailTabQuery } from './__generated__/InversionSolutionDetailTabQuery.graphql';
import KeyValueTable from './common/KeyValueTable';

interface InversionSolutionDetailTabProps {
  id?: string | null | undefined;
  produced_by_id?: string | null | undefined;
  file_name?: string | null | undefined;
  file_size: number | null | undefined;
  file_url?: string | null | undefined;
  md5_digest?: string | null | undefined;
  meta:
    | readonly ({
        readonly k: string | null;
        readonly v: string | null;
      } | null)[]
    | null
    | undefined;
  metrics:
    | ReadonlyArray<{
        readonly k: string | null;
        readonly v: string | null;
      } | null>
    | null
    | undefined;
}

const InversionSolutionDetailTab: React.FC<InversionSolutionDetailTabProps> = ({
  produced_by_id,
  file_name,
  file_size,
  file_url,
  md5_digest,
  meta,
  metrics,
}: InversionSolutionDetailTabProps) => {
  const producedByIdString = Buffer.from(produced_by_id ?? '', 'base64').toString();
  const producedByType = producedByIdString.slice(0, producedByIdString.indexOf(':'));
  return (
    <>
      <Typography>
        <strong>File name:</strong> {file_name}
      </Typography>
      <Typography>
        <strong>Produced by:</strong>{' '}
        <Link to={`/${producedByType}/${produced_by_id}`}>
          {Buffer.from(produced_by_id ?? '', 'base64').toString()}
        </Link>
      </Typography>
      <Typography>
        <strong>File size:</strong> {formatBytes(file_size ?? 0)}
      </Typography>
      <Typography>
        <strong>MD5 digest:</strong> {md5_digest}
      </Typography>
      <Typography>
        <a href={file_url ?? ''}>Download</a>
      </Typography>
      {meta && <KeyValueTable header="Meta" data={meta} />}
      {metrics && <KeyValueTable header="Metrics" data={metrics} />}
    </>
  );
};

export default InversionSolutionDetailTab;
