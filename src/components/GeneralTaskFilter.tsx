import { FormControl, Input, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 260,
    maxWidth: 300,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface GeneralTaskFilterProps {
  readonly data?: readonly ({
    readonly k: string | null;
    readonly v: readonly (string | null)[] | null;
  } | null)[];
  onChange: (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => void;
}

const GeneralTaskFilter: React.FC<GeneralTaskFilterProps> = ({ data, onChange }: GeneralTaskFilterProps) => {
  const classes = useStyles();

  return (
    <div>
      {data?.map((kv) => (
        <FormControl key={`${kv?.k}-container`} className={classes.formControl}>
          <InputLabel id={`${kv?.k}-label)`}>{kv?.k}</InputLabel>
          <Select
            labelId={`${kv?.k}-label`}
            id={`${kv?.k}`}
            name={`${kv?.k}`}
            value={''}
            onChange={onChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {kv?.v?.map((value) => (
              <MenuItem key={value} value={`${value}`}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </div>
  );
};

export default GeneralTaskFilter;
