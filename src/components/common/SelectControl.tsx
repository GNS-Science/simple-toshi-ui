import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const PREFIX = 'SelectControl';

const classes = {
  formControl: `${PREFIX}-formControl`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.formControl}`]: {
    margin: theme.spacing(2),
    minWidth: 200,
    maxWidth: 300,
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 500,
    },
  },
};

interface SelectControlProps {
  options: string[];
  setOptions: (selection: string) => void;
  name: string;
}

const SelectControl: React.FC<SelectControlProps> = ({ options, setOptions, name }: SelectControlProps) => {
  const [selectedItems, setSelectedItems] = useState<string>(options[0] ?? '');

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = (event.target.value as string) || '';
    setSelectedItems(value);
    setOptions(value);
  };

  return (
    <Root>
      <FormControl className={classes.formControl} variant="standard">
        <InputLabel>{name}</InputLabel>
        <Select
          labelId={`report-hash-label`}
          label={name}
          name={name}
          value={selectedItems}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
          variant="standard"
        >
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Root>
  );
};

export default SelectControl;
