import React, { useContext } from 'react';
import { Button, makeStyles } from '@material-ui/core';

import LocalStorageContext from '../../contexts/localStorage';
import _ from 'lodash';

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
  producedBy: string;
}

const FavouriteControls: React.FC<FavouriteControlsProps> = ({ id, producedBy }: FavouriteControlsProps) => {
  const classes = useStyles();
  const { ISFavourites, setISFavourites } = useContext(LocalStorageContext);

  const handleFavourites = () => {
    let favourites = ISFavourites;
    if (favourites === null) {
      favourites = {
        [id]: { producedBy },
      };
    } else if (favourites[id]) {
      favourites = _.omit(favourites, id);
    } else {
      favourites[id] = { producedBy };
    }
    setISFavourites(favourites);
  };

  return (
    <>
      <Button onClick={handleFavourites}>
        <img className={ISFavourites?.hasOwnProperty(id) ? classes.iconSelected : classes.icon} src="/hand-rock.svg" />
      </Button>
    </>
  );
};

export default FavouriteControls;
