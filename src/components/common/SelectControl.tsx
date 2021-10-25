import React, { Dispatch, SetStateAction, useState } from 'react';
import { Checkbox, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 260,
    maxWidth: 300,
  },
  hidden: {
    visibility: 'hidden',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
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

interface SelectControlProps {
  options: string[];
  setOptions: Dispatch<SetStateAction<string>>;
  label: string;
}

const SelectControl: React.FC<SelectControlProps> = ({ options, setOptions, label }: SelectControlProps) => {
  const [selectedItems, setSelectedItems] = useState<string>(options[0]);

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    const value = (event.target.value as string) || '';
    setSelectedItems(value);
    setOptions(value);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select
          labelId={`report-hash-label`}
          label={'hello'}
          name={`Report Location`}
          value={selectedItems}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              <Checkbox checked={selectedItems.indexOf(opt) > -1} />
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectControl;
