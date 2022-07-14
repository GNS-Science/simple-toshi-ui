import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import TruncateText from '../TruncateText';
import { formatBytes } from '../FileDetail';

const PREFIX = 'MiniFile';

const classes = {
  root: `${PREFIX}-root`,
};

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.root}`]: {
    margin: `${theme.spacing(2)} 0px`,
    padding: theme.spacing(1),
  },
}));

interface MiniFileProps {
  id?: string;
  __typename?: string;
  file_size?: number | null;
  file_name?: string | null;
}

const MiniFile: React.FC<MiniFileProps> = ({ id, __typename, file_size, file_name }: MiniFileProps) => {
  return (
    <StyledCard className={classes.root}>
      <Typography>
        <strong>Type: </strong> {__typename}
      </Typography>
      <Typography>
        <strong>File name:</strong> <TruncateText text={file_name ?? ''} />
      </Typography>
      <Typography>
        <strong>File size:</strong> {formatBytes(file_size ?? 0)}
      </Typography>
      <Typography>
        {__typename === 'File' ? (
          <Link to={`/FileDetail/${id}`}>[more]</Link>
        ) : (
          <Link to={`/${__typename}/${id}`}>[more]</Link>
        )}
      </Typography>
    </StyledCard>
  );
};

export default MiniFile;
