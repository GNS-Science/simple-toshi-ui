import { Box, CircularProgress, Container, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  progress: {
    verticalAlign: 'middle',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Loading: React.FC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" style={{ paddingTop: '40px', wordWrap: 'break-word' }}>
      <Box className={classes.progress} width="100%" height="100%">
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default Loading;
