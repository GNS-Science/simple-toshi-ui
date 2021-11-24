import { Button, TextField } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

const PREFIX = 'LoadInsert';

const classes = {
  button: `${PREFIX}-button`,
};

const Root = styled('div')(() => ({
  [`& .${classes.button}`]: {
    margin: 10,
  },
}));

interface LoadInsertProps {
  handleImport: (value: string) => void;
}

const LoadInsert: React.FC<LoadInsertProps> = ({ handleImport }: LoadInsertProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <Root>
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
    </Root>
  );
};

export default LoadInsert;
