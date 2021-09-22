import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Button, Card, CardContent, IconButton, makeStyles, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import buildUrl from 'build-url-ts';

import { inversionSolutionDiagnosticContainerQuery } from './InversionSolutionDiagnosticContainer';
import { ValidatedSubtask, SweepArguments } from '../../interfaces/generaltask';
import { InversionSolutionDiagnosticContainerQuery } from './__generated__/InversionSolutionDiagnosticContainerQuery.graphql';
import { replacer, reviver } from '../../utils';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  buttonContainer: {
    paddingLeft: '25%',
    paddingRight: '25%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingLeft: 70,
    paddingRight: 70,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    padding: '5px',
    maxHeight: '90vh',
    maxWidth: '100%',
  },
  icon: {
    filter: 'invert(88%) sepia(0%) saturate(1246%) hue-rotate(152deg) brightness(99%) contrast(97%)',
  },
  iconSelected: {
    filter: 'invert(48%) sepia(27%) saturate(2609%) hue-rotate(189deg) brightness(104%) contrast(102%)',
  },
}));

const reportBaseUrl = process.env.REACT_APP_REPORTS_URL;
interface DiagnosticReportsCardProps {
  readonly sweepArgs?: SweepArguments;
  queryRef: PreloadedQuery<InversionSolutionDiagnosticContainerQuery, Record<string, unknown>>;
  finalPath: string;
}

const DiagnosticReportsCard: React.FC<DiagnosticReportsCardProps> = ({
  sweepArgs,
  queryRef,
  finalPath,
}: DiagnosticReportsCardProps) => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [favourites, setFavourites] = useState(new Map());
  const [discards, setDiscards] = useState(new Map());
  const data = usePreloadedQuery<InversionSolutionDiagnosticContainerQuery>(
    inversionSolutionDiagnosticContainerQuery,
    queryRef,
  );
  const subtasks = data?.nodes?.result?.edges.map((subtask) => subtask?.node);
  const validatedSubtasks: ValidatedSubtask[] = [];

  useEffect(() => {
    const cachedFavourites = localStorage.getItem('favourites');
    cachedFavourites !== null && setFavourites(JSON.parse(cachedFavourites, reviver));
    const cachedDiscards = localStorage.getItem('discards');
    cachedDiscards !== null && setDiscards(JSON.parse(cachedDiscards, reviver));
  }, []);

  const handleFavouritesAndDiscards = (id: string, type: string) => {
    const currentFavourites = favourites;
    const currentDiscards = discards;

    if (type === 'favourite') {
      if (currentDiscards.has(id) && !currentFavourites.has(id)) {
        currentDiscards.delete(id);
        currentFavourites.set(id, true);
      } else if (!currentDiscards.has(id) && currentFavourites.has(id)) {
        currentFavourites.delete(id);
      } else {
        currentFavourites.set(id, true);
      }
    }

    if (type === 'discard') {
      if (currentFavourites.has(id) && !currentDiscards.has(id)) {
        currentFavourites.delete(id);
        currentDiscards.set(id, true);
      } else if (!currentFavourites.has(id) && currentDiscards.has(id)) {
        currentDiscards.delete(id);
      } else {
        currentDiscards.set(id, true);
      }
    }

    setFavourites(new Map(currentFavourites));
    setDiscards(new Map(currentDiscards));
    localStorage.setItem('IS-favourites', JSON.stringify(currentFavourites, replacer));
    localStorage.setItem('IS-discards', JSON.stringify(discards, replacer));
  };

  subtasks?.map((subtask) => {
    if (
      subtask &&
      subtask !== null &&
      subtask.__typename === 'AutomationTask' &&
      subtask.inversion_solution !== null &&
      subtask.inversion_solution.meta !== null
    ) {
      const newSubtask: ValidatedSubtask = {
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
      validatedSubtasks.push(newSubtask);
    }
  });

  const reportUrl = (finalPath: string, id: string) => {
    return buildUrl(reportBaseUrl, {
      path: `/opensha/DATA/${id}/solution_report/resources/${finalPath}`,
    });
  };

  const nextImage = () => {
    currentImage < validatedSubtasks.length - 1 && setCurrentImage(currentImage + 1);
  };

  const prevImage = () => {
    currentImage > 0 && setCurrentImage(currentImage - 1);
  };

  if (!subtasks || subtasks.length === 0) {
    return <Typography> Filter query has not run. </Typography>;
  }

  if (!validatedSubtasks[currentImage]) {
    return <Typography> There are no valid reports to show. </Typography>;
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography>
            <h4>
              Inversion Solution {validatedSubtasks[currentImage].inversion_solution.id}&nbsp;&nbsp;&nbsp;
              <Link to={`/InversionSolution/${validatedSubtasks[currentImage].inversion_solution.id}`}>[more]</Link>
            </h4>
          </Typography>
          <Typography>
            {validatedSubtasks[currentImage].inversion_solution.meta.map((kv) => (
              <span key={kv?.k}>
                {kv?.k}: {kv?.v}, &nbsp;
              </span>
            ))}
          </Typography>
          <div className={classes.buttonContainer}>
            <IconButton className={classes.button} color="primary" onClick={prevImage} disabled={currentImage === 0}>
              <ArrowBackIosIcon />
            </IconButton>
            <Typography>
              {currentImage + 1}&nbsp;of&nbsp;{validatedSubtasks.length}
            </Typography>
            <IconButton
              className={classes.button}
              color="primary"
              onClick={nextImage}
              disabled={currentImage === validatedSubtasks.length - 1}
            >
              <ArrowForwardIosIcon />
            </IconButton>
            <Button
              onClick={() =>
                handleFavouritesAndDiscards(validatedSubtasks[currentImage].inversion_solution.id, 'favourite')
              }
            >
              <img
                className={
                  favourites.has(validatedSubtasks[currentImage].inversion_solution.id)
                    ? classes.iconSelected
                    : classes.icon
                }
                src="/hand-rock.svg"
              />
            </Button>
            <Button
              onClick={() =>
                handleFavouritesAndDiscards(validatedSubtasks[currentImage].inversion_solution.id, 'discard')
              }
            >
              <img
                className={
                  discards.has(validatedSubtasks[currentImage].inversion_solution.id)
                    ? classes.iconSelected
                    : classes.icon
                }
                src="/hand-scissors.svg"
              />
            </Button>
          </div>
          <div className={classes.imageContainer}>
            <img
              className={classes.image}
              src={reportUrl(finalPath, validatedSubtasks[currentImage].inversion_solution.id)}
              alt={finalPath}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DiagnosticReportsCard;
