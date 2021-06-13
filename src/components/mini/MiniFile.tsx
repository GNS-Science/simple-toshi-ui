import React from 'react';
import { Card, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TruncateText from '../TruncateText';
import { formatBytes } from '../FileDetail';

interface MiniFileProps {
  id?: string;
  file_size?: number | null;
  file_name?: string | null;
}

const useStyles = makeStyles({
  root: {
    margin: '16px 0px',
    padding: '8px',
  },
});

const MiniFile: React.FC<MiniFileProps> = ({ id, file_size, file_name }: MiniFileProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Typography>
        <strong>Type: </strong> File
      </Typography>
      <Typography>
        <strong>File name:</strong> <TruncateText text={file_name ?? ''} />
      </Typography>
      <Typography>
        <strong>File size:</strong> {formatBytes(file_size ?? 0)}
      </Typography>
      <Typography>
        <Link to={`FileDetail/${id}`}>[more]</Link>
      </Typography>
    </Card>
  );
};

export default MiniFile;
