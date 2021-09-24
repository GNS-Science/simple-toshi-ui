import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';

import LocalStorageContext from '../../contexts/localStorage';

const useStyles = makeStyles(() => ({
  icon: {
    height: 20,
    filter: 'invert(48%) sepia(27%) saturate(2609%) hue-rotate(189deg) brightness(104%) contrast(102%)',
  },
  iconHidden: {
    visibility: 'hidden',
  },
}));

interface FavouriteStatusProps {
  id: string;
}

const FavouriteStatus: React.FC<FavouriteStatusProps> = ({ id }: FavouriteStatusProps) => {
  const classes = useStyles();
  const { ISFavourites } = useContext(LocalStorageContext);

  const favourited = () => {
    //TODO can we one-liner?
    if (ISFavourites) {
      for (const item in ISFavourites) {
        if (ISFavourites[item].producedBy === id) return true;
      }
    }
  };

  return (
    <>
      <img className={favourited() ? classes.icon : classes.iconHidden} src="/hand-rock.svg" />
    </>
  );
};

export default FavouriteStatus;
