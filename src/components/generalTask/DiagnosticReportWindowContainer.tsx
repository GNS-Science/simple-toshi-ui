import React, { useState } from 'react';
import buildUrl from 'build-url-ts';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { GeneralTaskFilterContainerQuery } from './__generated__/GeneralTaskFilterContainerQuery.graphql';
import { generalTaskFilterContainerQuery } from './GeneralTaskFilterContainer';
import { Button, Card, CardContent, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const reportBaseUrl = process.env.REACT_APP_REPORTS_URL;
console.log(reportBaseUrl);

interface DiagnosticReportWindowContainerProps {
  queryRef: PreloadedQuery<GeneralTaskFilterContainerQuery, Record<string, unknown>>;
  finalPath: string;
}

const DiagnosticReportWindowContainer: React.FC<DiagnosticReportWindowContainerProps> = ({
  queryRef,
  finalPath,
}: DiagnosticReportWindowContainerProps) => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState<number>(0);
  const data = usePreloadedQuery<GeneralTaskFilterContainerQuery>(generalTaskFilterContainerQuery, queryRef);
  console.log(data);
  const subtasks = data?.nodes?.result?.edges.map((subtask) => subtask?.node);
  const subtaskIds: string[] = [];

  subtasks?.map((subtask) => {
    subtask?.__typename === 'AutomationTask' &&
      subtask?.inversion_solution &&
      subtaskIds.push(subtask?.inversion_solution?.id);
  });

  const reportUrl = (finalPath: string, id: string) => {
    return buildUrl(reportBaseUrl, {
      path: `/opensha/DATA/${id}/solution_report/resources/${finalPath}`,
    });
  };

  const nextImage = () => {
    currentImage < subtaskIds.length - 1 && setCurrentImage(currentImage + 1);
  };

  const prevImage = () => {
    currentImage > 0 && setCurrentImage(currentImage - 1);
  };

  return (
    <>
      <Button color="primary" onClick={prevImage} disabled={currentImage === 0}>
        {' '}
        Previous{' '}
      </Button>
      <Button color="primary" onClick={nextImage} disabled={currentImage === subtaskIds.length - 1}>
        {' '}
        Next{' '}
      </Button>
      <Card className={classes.root}>
        <CardContent>
          <img style={{ width: '100%' }} src={reportUrl(finalPath, subtaskIds[currentImage])} alt={finalPath} />;
        </CardContent>
      </Card>
      ;
    </>
  );
};

export default DiagnosticReportWindowContainer;
