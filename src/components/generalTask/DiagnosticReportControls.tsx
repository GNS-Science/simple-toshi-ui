import React, { useContext, useEffect, useState } from 'react';
import { Button, Checkbox, FormControl, Input, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';

import { diagnosticReportViewOptions as options } from '../../constants/diagnosticReport';
import LocalStorageContext from '../../contexts/localStorage';

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
  setViewOption: (newViewOptions: string[]) => void;
}

const DiagnosticReportControls: React.FC<DiagnosticReportControlsProps> = ({
  isOpen,
  setOpen,
  setViewOption,
}: DiagnosticReportControlsProps) => {
  const { reportViewSelections, setReportViewSelections } = useContext(LocalStorageContext);
  const [selectedItems, setSelectedItems] = useState<string[]>([options[0].finalPath]);

  const classes = useStyles();

  useEffect(() => {
    if (reportViewSelections.length) {
      setViewOption(reportViewSelections);
      setSelectedItems(reportViewSelections);
    }
  }, []);

  useEffect(() => {
    setViewOption(reportViewSelections);
    setSelectedItems(reportViewSelections);
  }, [reportViewSelections]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>) => {
    const value = (event.target.value as string[]) || [];
    setViewOption(value);
    setSelectedItems(value);
    setReportViewSelections(value);
  };

  return (
    <>
      <Button color="default" variant="contained" onClick={setOpen}>
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
            if (selectedArray.length === 1) {
              const index = options.findIndex((opt) => opt.finalPath === selectedArray[0]);
              return options[index].displayName;
            }
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
