import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
import { SweepArgument } from '../../interfaces/generaltask';
import { determineClipBoard, getClipBoardObject } from '../../service/generalTask.service';
import { pluralCompare } from '../../service/generalTask.service';

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
  const search = useLocation().search;
  const isClipBoard: boolean = determineClipBoard(search);

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    onChange(event);
    setSelectedItems(event.target.value as string[]);
  };

  useEffect(() => {
    if (isClipBoard) {
      getClipBoardObject(search)
        .then((res) => {
          if (res.filter.data?.length) {
            res.filter.data.map((kv) => {
              if (kv.k.includes(argument?.k as string) || pluralCompare(kv.k, argument?.k as string)) {
                setSelectedItems(kv.v);
              }
            });
          }
        })
        .catch(() => {
          setSelectedItems([]);
        });
    }
  }, []);

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
