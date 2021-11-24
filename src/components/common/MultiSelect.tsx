import { Checkbox, FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

const PREFIX = 'MultiSelect';

const classes = {
  formControl: `${PREFIX}-formControl`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.formControl}`]: {
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
  selected: string[];
  setOptions: (selections: string[]) => void;
  name: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selected, setOptions, name }: MultiSelectProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([options[0]]);

  useEffect(() => {
    if (selected.length) setSelectedItems(selected);
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedItems(event.target.value as string[]);
    setOptions(event.target.value as string[]);
  };

  return (
    <Root>
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
    </Root>
  );
};

export default MultiSelect;
