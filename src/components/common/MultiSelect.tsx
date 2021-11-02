import { Checkbox, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
    maxWidthg: 300,
  },
}));
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 500,
    },
  },
};
interface MultiSelectProps {
  options: string[];
  setOptions: (selections: string[]) => void;
  name: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, setOptions, name }: MultiSelectProps) => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = useState<string[]>([options[0]]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedItems(event.target.value as string[]);
    setOptions(event.target.value as string[]);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>{name}</InputLabel>
        <Select
          name={name}
          value={selectedItems}
          multiple
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
          renderValue={(selected) => {
            const selectedArray = selected as string[];
            if (selectedArray.length === 1) {
              return selectedItems[0];
            }
            if (selectedArray.length >= 1) return 'Multiple selected';
          }}
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

export default MultiSelect;
