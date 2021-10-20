import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles(() => ({
  button: {
    margin: 10,
  },
}));

interface LoadInsertProps {
  handleImport: (value: string) => void;
}

const LoadInsert: React.FC<LoadInsertProps> = ({ handleImport }: LoadInsertProps) => {
  const classes = useStyles();
  const [value, setValue] = useState<string>('');

  return (
    <>
      <form onSubmit={() => handleImport(value)}>
        <TextField
          id="standard-full-width"
          fullWidth
          multiline
          rows={7}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          variant="filled"
          placeholder="Paste your json here"
        />
        <Button type="submit" className={classes.button} variant="contained" color="primary">
          Import
        </Button>
      </form>
    </>
  );
};

export default LoadInsert;
