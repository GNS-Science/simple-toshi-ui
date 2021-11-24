import { Box, CircularProgress, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const PREFIX = 'Loading';

const classes = {
  progress: `${PREFIX}-progress`,
};

const StyledContainer = styled(Container)(() => ({
  [`& .${classes.progress}`]: {
    verticalAlign: 'middle',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Loading: React.FC = () => {
  return (
    <StyledContainer maxWidth="md" style={{ paddingTop: '40px', wordWrap: 'break-word' }}>
      <Box className={classes.progress} width="100%" height="100%">
        <CircularProgress />
      </Box>
    </StyledContainer>
  );
};

export default Loading;
