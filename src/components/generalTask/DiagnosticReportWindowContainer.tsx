import React, { useState } from 'react';
import buildUrl from 'build-url-ts';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { GeneralTaskFilterContainerQuery } from './__generated__/GeneralTaskFilterContainerQuery.graphql';
import { generalTaskFilterContainerQuery } from './GeneralTaskFilterContainer';
import { Card, CardContent, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FilteredSubtask, SweepArguments } from '../../interfaces/generaltask';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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
  buttonContainer: {
    paddingLeft: '25%',
    paddingRight: '25%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    paddingLeft: 70,
    paddingRight: 70,
  },
  image: {
    padding: '30px',
    width: '100%',
  },
}));

const reportBaseUrl = process.env.REACT_APP_REPORTS_URL;
interface DiagnosticReportWindowContainerProps {
  readonly sweepArgs?: SweepArguments;
  queryRef: PreloadedQuery<GeneralTaskFilterContainerQuery, Record<string, unknown>>;
  finalPath: string;
}

const DiagnosticReportWindowContainer: React.FC<DiagnosticReportWindowContainerProps> = ({
  sweepArgs,
  queryRef,
  finalPath,
}: DiagnosticReportWindowContainerProps) => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState<number>(0);
  const data = usePreloadedQuery<GeneralTaskFilterContainerQuery>(generalTaskFilterContainerQuery, queryRef);
  const subtasks = data?.nodes?.result?.edges.map((subtask) => subtask?.node);
  const filteredSubtasks: FilteredSubtask[] = [];

  subtasks?.map((subtask) => {
    if (
      subtask &&
      subtask !== null &&
      subtask.__typename === 'AutomationTask' &&
      subtask.inversion_solution !== null &&
      subtask.inversion_solution.meta !== null
    ) {
      const newSubtask: FilteredSubtask = {
        __typename: 'AutomationTask',
        inversion_solution: {
          id: subtask.inversion_solution.id,
          meta: [],
        },
      };
      subtask.inversion_solution.meta.map((kv) => {
        kv !== null &&
          sweepArgs?.some((argument) => argument?.k?.includes(kv.k as string)) &&
          newSubtask.inversion_solution.meta.push(kv);
      });
      filteredSubtasks.push(newSubtask);
    }
  });

  const reportUrl = (finalPath: string, id: string) => {
    return buildUrl(reportBaseUrl, {
      path: `/opensha/DATA/${id}/solution_report/resources/${finalPath}`,
    });
  };

  const nextImage = () => {
    currentImage < filteredSubtasks.length - 1 && setCurrentImage(currentImage + 1);
  };

  const prevImage = () => {
    currentImage > 0 && setCurrentImage(currentImage - 1);
  };

  if (!filteredSubtasks[currentImage]) {
    return <Typography> There are no subtasks to show. </Typography>;
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography>
            <h4>Inversion Solution {filteredSubtasks[currentImage].inversion_solution.id} </h4>
          </Typography>
          <Typography>
            {filteredSubtasks[currentImage].inversion_solution.meta.map((kv) => (
              <span key={kv?.k}>
                {kv?.k}: {kv?.v}, &nbsp;
              </span>
            ))}
          </Typography>
          <Link to={`/InversionSolution/${filteredSubtasks[currentImage].inversion_solution.id}`}>[more]</Link>
          <div className={classes.buttonContainer}>
            <IconButton className={classes.button} color="primary" onClick={prevImage} disabled={currentImage === 0}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              className={classes.button}
              color="primary"
              onClick={nextImage}
              disabled={currentImage === filteredSubtasks.length - 1}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
          <img
            className={classes.image}
            src={reportUrl(finalPath, filteredSubtasks[currentImage].inversion_solution.id)}
            alt={finalPath}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default DiagnosticReportWindowContainer;
