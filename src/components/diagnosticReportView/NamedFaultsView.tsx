import { styled } from '@mui/material/styles';
import buildUrl from 'build-url-ts';
import React, { useEffect, useState } from 'react';
import { mfdPlotOptions, NamedFaultsOption, namedFaultsOptions, PlotOption } from '../../constants/nameFaultsMfds';
import MultiSelect from '../common/MultiSelect';
import SelectControl from '../common/SelectControl';

const PREFIX = 'NamedFaultsView';

const classes = {
  imageContainer: `${PREFIX}-imageContainer`,
  image: `${PREFIX}-image`,
};

const Root = styled('div')(() => ({
  [`& .${classes.imageContainer}`]: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  [`& .${classes.image}`]: {
    padding: '5px',
    maxHeight: '80vh',
    width: '25%',
    objectFit: 'contain',
    flexGrow: 3,
    flexShrink: 4,
  },
}));

interface NamedFaultsViewProps {
  id: string;
  namedFaultsView: string;
  setNamedFaultsView: (selection: string) => void;
  namedFaultsLocations: string[];
  setNamedFaultsLocations: (selection: string[]) => void;
}

const NamedFaultsView: React.FC<NamedFaultsViewProps> = ({
  id,
  namedFaultsView,
  setNamedFaultsView,
  namedFaultsLocations,
  setNamedFaultsLocations,
}: NamedFaultsViewProps) => {
  const [namedFaultsSelection, setNamedFaultsSelection] = useState<NamedFaultsOption[]>([namedFaultsOptions[0]]);
  const [mfdPlotSelection, setMfdPlotSelection] = useState<PlotOption>(mfdPlotOptions[0]);

  const faultOptions: string[] = [];

  namedFaultsOptions.map((option) => {
    faultOptions.push(option.displayName);
  });

  const mfdPlot: string[] = [];

  mfdPlotOptions.map((option) => {
    mfdPlot.push(option.displayName);
  });

  useEffect(() => {
    const filtered = namedFaultsOptions.filter((option) => {
      const result = namedFaultsLocations?.includes(option.displayName);
      return result;
    });
    setNamedFaultsSelection(filtered);
    mfdPlotOptions.map((option) => {
      if (namedFaultsView === option.displayName) {
        setMfdPlotSelection(option);
      }
    });
  }, [namedFaultsView, namedFaultsLocations]);

  const namedFaultsUrl = (id: string, typePath: string, faultPath: string, typeSuffix: string) => {
    return buildUrl(process.env.REACT_APP_REPORTS_URL, {
      path: `/opensha/DATA/${id}/named_fault_mfds/${typePath}/${faultPath}${typeSuffix}`,
    });
  };

  return (
    <Root>
      <MultiSelect
        name="Named Faults"
        selected={namedFaultsLocations}
        options={faultOptions}
        setOptions={setNamedFaultsLocations}
      />
      <SelectControl name="Mfd Plot Views" options={mfdPlot} setOptions={setNamedFaultsView} />
      <div className={classes.imageContainer}>
        {namedFaultsSelection?.map((item) => (
          <img
            key={item.path}
            className={classes.image}
            src={namedFaultsUrl(id, mfdPlotSelection.typePath as string, item.path, mfdPlotSelection?.path as string)}
          />
        ))}
      </div>
    </Root>
  );
};

export default NamedFaultsView;
