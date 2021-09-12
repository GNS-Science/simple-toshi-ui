import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import DiagnosticsReportWindow from '../DiagnosticsReportWindow';

import buildUrl from 'build-url-ts';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { GeneralTaskFilterContainerQuery } from './__generated__/GeneralTaskFilterContainerQuery.graphql';
import { generalTaskFilterContainerQuery } from './GeneralTaskFilterContainer';

const reportBaseUrl = 'http://nzshm22-static-reports.s3-website-ap-southeast-2.amazonaws.com';

const createUrl = (id: string) => {
  return buildUrl(reportBaseUrl, {
    path: `/opensha/DATA/${id}/solution_report/index.html`,
    hash: 'slip-rates', //'solution-mfds'
  });
};

interface DemoWindowControlProps {
  queryRef: PreloadedQuery<GeneralTaskFilterContainerQuery, Record<string, unknown>>;
}

const DemoWindowControl: React.FC<DemoWindowControlProps> = ({ queryRef }: DemoWindowControlProps) => {
  const [open, setOpen] = useState(false);
  const data = usePreloadedQuery<GeneralTaskFilterContainerQuery>(generalTaskFilterContainerQuery, queryRef);
  const subtasks = data?.nodes?.result?.edges.map((subtask) => subtask?.node);
  const subtaskIds: string[] = [];
  subtasks?.map((subtask) => {
    if (subtask?.__typename === 'AutomationTask' && subtask?.inversion_solution) {
      subtaskIds.push(subtask?.inversion_solution?.id);
    }
  });
  console.log(subtaskIds);
  return (
    <>
      <Button onClick={() => setOpen((v) => !v)}>{open ? 'Close reports' : 'Open reports'}</Button>
      {open && (
        <div>
          {subtaskIds?.map((id, index) => (
            <DiagnosticsReportWindow
              key={index}
              url={createUrl(id)}
              windowTitle={`short-${index}`}
              title={`Report Title ${index}`}
              info={`info ${index}`}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default DemoWindowControl;
