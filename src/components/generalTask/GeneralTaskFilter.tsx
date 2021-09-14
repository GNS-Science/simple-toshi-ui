import { FormControl, Input, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { SweepArgument } from '../interfaces/generaltask';

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
  argument: SweepArgument;
  onChange: (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => void;
}

const GeneralTaskFilter: React.FC<GeneralTaskFilterProps> = ({ argument, onChange }: GeneralTaskFilterProps) => {
  const [seletedItems, setSelectedItems] = useState<string[]>([]);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    onChange(event);
    setSelectedItems(event.target.value as string[]);
  };

  return (
    <div>
      <FormControl key={`${argument?.k}-container`} className={classes.formControl}>
        <InputLabel id={`${argument?.k}-label)`}>{argument?.k}</InputLabel>
        <Select
          labelId={`${argument?.k}-label`}
          id={`${argument?.k}`}
          name={`${argument?.k}`}
          value={seletedItems}
          multiple
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {argument?.v?.map((value) => (
            <MenuItem key={value} value={`${value}`}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default GeneralTaskFilter;
