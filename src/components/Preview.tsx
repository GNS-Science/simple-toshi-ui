import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
// prettier-ignore
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 3,
  },
});

function Preview(): React.ReactElement {
  const classes = useStyles();

  return (
    <Container>
      <Typography color="textPrimary" variant="h4" gutterBottom>
        Preview features
      </Typography>
      <Card className={classes.root}>
        <CardContent>
          <Typography color="textPrimary" variant="h5" gutterBottom>
            MFD Histogram
          </Typography>
          <Typography className={classes.pos} component="p">
            A traditional histogram, can use variable bin widths.
            <Button size="small" href="/preview/MFD">
              go
            </Button>
          </Typography>
        </CardContent>
      </Card>

      <Card className={classes.root}>
        <CardContent>
          <Typography color="textPrimary" variant="h5" gutterBottom>
            Line MFD
          </Typography>
          <Typography className={classes.pos} component="p">
            A replica of the multi series MFD seen in opensha Named Faults plots. Uses log scaling
            <Button size="small" href="/preview/LineMFD">
              go
            </Button>
          </Typography>
        </CardContent>
      </Card>

      <Card className={classes.root}>
        <CardContent>
          <Typography color="textPrimary" variant="h5" gutterBottom>
            Hazard
          </Typography>
          <Typography className={classes.pos} component="p">
            An interactive map using `leaflet`.
            <Button size="small" href="/preview/hazard">
              go
            </Button>
          </Typography>
        </CardContent>
      </Card>

      <Card className={classes.root}>
        <CardContent>
          <Typography color="textPrimary" variant="h5" gutterBottom>
            Mixed static and dynamic content
          </Typography>
          <Typography className={classes.pos} component="p">
            Mix static images and dynamic content - to make if more cohesive.
            <Button size="small" href="/preview/views">
              go
            </Button>
          </Typography>
        </CardContent>
      </Card>

      <Card className={classes.root}>
        <CardContent>
          <Typography color="textPrimary" variant="h5" gutterBottom>
            Launching report windows
          </Typography>
          <Typography className={classes.pos} component="p">
            needs some work for cross-browser compat
            <Button size="small" href="/preview/DR">
              go
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Preview;
