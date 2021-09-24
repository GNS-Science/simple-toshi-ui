import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';

import LocalStorageContext from '../../contexts/localStorage';

const useStyles = makeStyles(() => ({
  icon: {
    height: 35,
    filter: 'invert(48%) sepia(27%) saturate(2609%) hue-rotate(189deg) brightness(104%) contrast(102%)',
  },
}));

interface FavouriteStatusProps {
  id: string;
}

const FavouriteStatus: React.FC<FavouriteStatusProps> = ({ id }: FavouriteStatusProps) => {
  const classes = useStyles();
  const { ISFavourites } = useContext(LocalStorageContext);

  if (ISFavourites?.hasOwnProperty(id)) {
    return <img className={classes.icon} src="/hand-rock.svg" />;
  }

  return <></>;
};

export default FavouriteStatus;
