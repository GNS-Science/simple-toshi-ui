import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import { diagnosticReportViewOptions as options } from '../../constants/diagnosticReport';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(2),
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
interface DiagnosticReportControlsProps {
  isOpen: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  setOpen: () => void;
  setViewOption: (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => void;
}

const DiagnosticReportControls: React.FC<DiagnosticReportControlsProps> = ({
  isOpen,
  setShowFilters,
  setOpen,
  setViewOption,
}: DiagnosticReportControlsProps) => {
  const [selectedItem, setSelectedItem] = useState<string>('');

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    setViewOption(event);
    setSelectedItem(event.target.value as string);
  };

  const handleOpen = () => {
    setOpen();
    setShowFilters((v) => !v);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id={`report-hash-label`}>Report Location</InputLabel>
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
      <Button onClick={handleOpen}>{isOpen ? 'Close reports' : 'Open reports'}</Button>
    </>
  );
};

export default DiagnosticReportControls;
