import React, { useContext, useEffect } from 'react';
import { Button, makeStyles } from '@material-ui/core';

import { replacer } from '../../utils';
import LocalStorageContext from '../../contexts/localStorage';

const useStyles = makeStyles(() => ({
  icon: {
    height: 35,
    filter: 'invert(88%) sepia(0%) saturate(1246%) hue-rotate(152deg) brightness(99%) contrast(97%)',
  },
  iconSelected: {
    height: 42,
    filter: 'invert(48%) sepia(27%) saturate(2609%) hue-rotate(189deg) brightness(104%) contrast(102%)',
  },
}));

interface FavouriteControlsProps {
  id: string;
}

const FavouriteControls: React.FC<FavouriteControlsProps> = ({ id }: FavouriteControlsProps) => {
  const classes = useStyles();
  const { ISFavourites, setISFavourites } = useContext(LocalStorageContext);

  const handleFavourites = (id: string) => {
    const currentFavourites = ISFavourites;
    currentFavourites.has(id) ? currentFavourites.delete(id) : currentFavourites.set(id, true);

    setISFavourites(new Map(currentFavourites));
    localStorage.setItem('IS-favourites', JSON.stringify(currentFavourites, replacer));
  };

  return (
    <>
      <Button onClick={() => handleFavourites(id)}>
        <img className={ISFavourites.has(id) ? classes.iconSelected : classes.icon} src="/hand-rock.svg" />
      </Button>
    </>
  );
};

export default FavouriteControls;
