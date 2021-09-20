import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { useState } from 'react';
import { SweepArgument } from '../../interfaces/generaltask';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.7),
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

interface SweepArgumentFilterProps {
  argument: SweepArgument;
  onChange: (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => void;
}

const SweepArgumentFilter: React.FC<SweepArgumentFilterProps> = ({ argument, onChange }: SweepArgumentFilterProps) => {
  const [seletedItems, setSelectedItems] = useState<string[]>([]);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    onChange(event);
    setSelectedItems(event.target.value as string[]);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id={`${argument?.k}-label)`}>{argument?.k}</InputLabel>
        <Select
          labelId={`${argument?.k}-label`}
          id={`${argument?.k}`}
          name={`${argument?.k}`}
          value={seletedItems}
          multiple
          onChange={handleChange}
          renderValue={(selectedItems) => (selectedItems as string[]).join(', ')}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {argument?.v?.map((value) => (
            <MenuItem key={value} value={`${value}`}>
              <Checkbox checked={seletedItems.indexOf(value as string) > -1} />
              <ListItemText primary={value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SweepArgumentFilter;
