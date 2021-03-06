import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { SweepArgument } from '../../interfaces/generaltask';
import { determineClipBoard, getClipBoardObject } from '../../service/generalTask.service';
import { pluralCompare } from '../../service/generalTask.service';

const PREFIX = 'SweepArgumentFilter';

const classes = {
  formControl: `${PREFIX}-formControl`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.formControl}`]: {
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
      minWidth: 250,
    },
  },
};

interface SweepArgumentFilterProps {
  argument: SweepArgument;
  onChange: (event: SelectChangeEvent<string[]>) => void;
}

const SweepArgumentFilter: React.FC<SweepArgumentFilterProps> = ({ argument, onChange }: SweepArgumentFilterProps) => {
  const [seletedItems, setSelectedItems] = useState<string[]>([]);

  const search = useLocation().search;
  const isClipBoard: boolean = determineClipBoard(search);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
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
  }, [argument?.k, isClipBoard, search]);

  return (
    <Root>
      <FormControl className={classes.formControl} variant="standard">
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
          variant="standard"
          autoWidth={true}
        >
          {argument?.v?.map((value) => (
            <MenuItem key={value} value={`${value}`}>
              <Checkbox checked={seletedItems.indexOf(value as string) > -1} />
              <ListItemText primary={value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Root>
  );
};

export default SweepArgumentFilter;
