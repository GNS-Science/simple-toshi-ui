import { makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import buildUrl from 'build-url-ts';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { parentFaultsOptions, ParentViewsOption, parentViewsOptions } from '../../constants/parentFault';
import ControlsBar from '../common/ControlsBar';
import MultiSelect from '../common/MultiSelect';

const useStyles = makeStyles(() => ({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  image: {
    padding: '5px',
    maxHeight: '80vh',
    width: '25%',
    objectFit: 'contain',
    flexGrow: 3,
    flexShrink: 4,
  },
}));

interface ParentFaultViewProps {
  id: string;
  parentFaultViews: string[];
  setParentFaultViews: (views: string[]) => void;
  parentFault: string;
  setParentFault: (fault: string) => void;
  setDisableHotkey: Dispatch<SetStateAction<boolean>>;
}

const ParentFaultView: React.FC<ParentFaultViewProps> = ({
  id,
  parentFaultViews,
  setParentFaultViews,
  parentFault,
  setParentFault,
  setDisableHotkey,
}: ParentFaultViewProps) => {
  const classes = useStyles();
  const [viewsSelctions, setViewsSelections] = useState<ParentViewsOption[]>([parentViewsOptions[0]]);

  const viewsOptions: string[] = [];
  parentViewsOptions.map((view) => {
    viewsOptions.push(view.displayName);
  });

  useEffect(() => {
    const filtered = parentViewsOptions.filter((option) => {
      return parentFaultViews.includes(option.displayName);
    });
    setViewsSelections(filtered);
  }, [parentFaultViews]);

  const getUrl = (path: string) => {
    return buildUrl(process.env.REACT_APP_REPORTS_URL, {
      path: `/opensha/DATA/${id}/solution_report/parent_sect_pages/${parentFault}/resources${path}`,
    });
  };

  return (
    <>
      <ControlsBar>
        <MultiSelect name="Views" selected={parentFaultViews} options={viewsOptions} setOptions={setParentFaultViews} />
        <Autocomplete
          value={parentFault}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(event: any, newValue: string | null) => {
            setParentFault(newValue as string);
          }}
          id="controllable-states-demo"
          options={parentFaultsOptions}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Parent Faults" />}
          onOpen={() => setDisableHotkey(true)}
          onClose={() => setDisableHotkey(false)}
        />
      </ControlsBar>
      <div className={classes.imageContainer}>
        {viewsSelctions.map((option) => (
          <img key={option.path} className={classes.image} src={getUrl(option.path)} alt={option.path} />
        ))}
      </div>
    </>
  );
};

export default ParentFaultView;
