import { Checkbox, FormControl, Input, MenuItem, Select } from '@material-ui/core';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface MultiSelectProps {
  options: string[];
  setOptions: Dispatch<SetStateAction<string[]>>;
  name: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, setOptions, name }: MultiSelectProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([options[0]]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedItems(event.target.value as string[]);
    setOptions(event.target.value as string[]);
  };

  return (
    <>
      <FormControl>
        <Select
          name={name}
          value={selectedItems}
          multiple
          onChange={handleChange}
          input={<Input />}
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
