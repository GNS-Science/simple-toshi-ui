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

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px 0px`,
    padding: theme.spacing(1),
  },
}));

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
        <Link to={`/FileDetail/${id}`}>[more]</Link>
      </Typography>
    </Card>
  );
};

export default MiniFile;
