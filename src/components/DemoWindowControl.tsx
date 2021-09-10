import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import DiagnosticsReportWindow from './DiagnosticsReportWindow';

import buildUrl from 'build-url-ts';

const reportBaseUrl = 'http://nzshm22-static-reports.s3-website-ap-southeast-2.amazonaws.com';

const url = buildUrl(reportBaseUrl, {
  path: `/opensha/DATA/${'SW52ZXJzaW9uU29sdXRpb246NzkxOC41R1FaWWI='}/solution_report/index.html`,
  hash: 'slip-rates', //'solution-mfds'
});

const DemoWindowControl: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen((v) => !v)}>{open ? 'Close reports' : 'Open reports'}</Button>
      {open && (
        <div>
          <DiagnosticsReportWindow
            url={url}
            windowTitle={'short-0'}
            title={'Report Title 0'}
            info={'some 0 specifics here'}
          />
          <DiagnosticsReportWindow
            url={url}
            windowTitle={'short-1'}
            title={'Report Title 1'}
            info={'some 1 specifics here'}
          />
          <DiagnosticsReportWindow
            url={url}
            windowTitle={'short-2'}
            title={'Report Title 2'}
            info={'some 2 specifics here'}
          />
        </div>
      )}
    </>
  );
};

export default DemoWindowControl;
