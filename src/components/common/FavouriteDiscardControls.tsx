import React, { useContext } from 'react';
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

interface FavouriteDiscardControlsProps {
  id: string;
}

const FavouriteDiscardControls: React.FC<FavouriteDiscardControlsProps> = ({ id }: FavouriteDiscardControlsProps) => {
  const classes = useStyles();
  const { ISFavourites, setISFavourites, ISDiscards, setISDiscards } = useContext(LocalStorageContext);

  const handleFavouritesAndDiscards = (id: string, type: string) => {
    const currentFavourites = ISFavourites;
    const currentDiscards = ISDiscards;

    if (type === 'favourite') {
      if (currentDiscards.has(id) && !currentFavourites.has(id)) {
        currentDiscards.delete(id);
        currentFavourites.set(id, true);
      } else if (!currentDiscards.has(id) && currentFavourites.has(id)) {
        currentFavourites.delete(id);
      } else {
        currentFavourites.set(id, true);
      }
    }

    if (type === 'discard') {
      if (currentFavourites.has(id) && !currentDiscards.has(id)) {
        currentFavourites.delete(id);
        currentDiscards.set(id, true);
      } else if (!currentFavourites.has(id) && currentDiscards.has(id)) {
        currentDiscards.delete(id);
      } else {
        currentDiscards.set(id, true);
      }
    }

    setISFavourites(new Map(currentFavourites));
    setISDiscards(new Map(currentDiscards));
    localStorage.setItem('IS-favourites', JSON.stringify(currentFavourites, replacer));
    localStorage.setItem('IS-discards', JSON.stringify(currentDiscards, replacer));
  };

  return (
    <>
      <Button onClick={() => handleFavouritesAndDiscards(id, 'favourite')}>
        <img className={ISFavourites.has(id) ? classes.iconSelected : classes.icon} src="/hand-rock.svg" />
      </Button>
      <Button onClick={() => handleFavouritesAndDiscards(id, 'discard')}>
        <img className={ISDiscards.has(id) ? classes.iconSelected : classes.icon} src="/hand-scissors.svg" />
      </Button>
    </>
  );
};

export default FavouriteDiscardControls;
