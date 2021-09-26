import React, { useState } from 'react';
import { Button, Checkbox, FormControl, Input, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';

import { diagnosticReportViewOptions as options } from '../../constants/diagnosticReport';

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
interface DiagnosticReportControlsProps {
  isOpen: boolean;
  setOpen: () => void;
  setViewOption: (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => void;
}

const DiagnosticReportControls: React.FC<DiagnosticReportControlsProps> = ({
  isOpen,
  setOpen,
  setViewOption,
}: DiagnosticReportControlsProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([options[0].finalPath]);

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    setViewOption(event);
    setSelectedItems(event.target.value as string[]);
  };

  return (
    <>
      <Button color="primary" variant="contained" onClick={setOpen}>
        {isOpen ? 'Show List' : 'Show Report'}
      </Button>
      <FormControl className={isOpen ? classes.formControl : classes.hidden}>
        <Select
          labelId={`report-hash-label`}
          name={`Report Location`}
          value={selectedItems}
          multiple
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => {
            const selectedArray = selected as string[];
            if (selectedArray.length === 1) return selectedArray[0];
            if (selectedArray.length >= 1) return 'Multiple selected';
          }}
          MenuProps={MenuProps}
        >
          {options.map((opt) => (
            <MenuItem key={opt.finalPath} value={opt.finalPath}>
              <Checkbox checked={selectedItems.indexOf(opt.finalPath as string) > -1} />
              {opt.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default DiagnosticReportControls;
