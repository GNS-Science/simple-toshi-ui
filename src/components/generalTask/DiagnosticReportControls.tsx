import React, { useState } from 'react';
import { Button, FormControl, Input, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
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
  const [selectedItem, setSelectedItem] = useState<string>(options[0].finalPath);

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    setViewOption(event);
    setSelectedItem(event.target.value as string);
  };

  const handleOpen = () => {
    setOpen();
  };

  return (
    <>
      <Button onClick={handleOpen}>{isOpen ? 'Show List' : 'Show Report'}</Button>
      <FormControl className={isOpen ? classes.formControl : classes.hidden}>
        <Select
          labelId={`report-hash-label`}
          name={`Report Location`}
          value={selectedItem}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {options.map((opt) => (
            <MenuItem key={opt.finalPath} value={opt.finalPath}>
              {opt.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default DiagnosticReportControls;
