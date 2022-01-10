import React from 'react';

import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, Container, Typography } from '@mui/material';

const PREFIX = 'Preview';

const classes = {
  root: `${PREFIX}-root`,
  bullet: `${PREFIX}-bullet`,
  pos: `${PREFIX}-pos`,
};

const StyledContainer = styled(Container)({
  [`& .${classes.root}`]: {
    minWidth: 275,
  },
  [`& .${classes.bullet}`]: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  [`& .${classes.pos}`]: {
    marginBottom: 3,
  },
});

function Preview(): React.ReactElement {
  return (
    <StyledContainer>
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
            <Button size="small" href="/deckgl">
              deckGL
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
    </StyledContainer>
  );
}

export default Preview;
