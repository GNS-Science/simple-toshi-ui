import React, { useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Tooltip } from '@mui/material';

import LocalStorageContext from '../../contexts/localStorage';
import _ from 'lodash';

const PREFIX = 'FavouriteControls';

const classes = {
  icon: `${PREFIX}-icon`,
  iconSelected: `${PREFIX}-iconSelected`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
  [`& .${classes.icon}`]: {
    height: 35,
    filter: 'invert(88%) sepia(0%) saturate(1246%) hue-rotate(152deg) brightness(99%) contrast(97%)',
  },

  [`& .${classes.iconSelected}`]: {
    height: 35,
    filter: 'invert(48%) sepia(27%) saturate(2609%) hue-rotate(189deg) brightness(104%) contrast(102%)',
  },
}));

interface FavouriteControlsProps {
  id: string;
  producedBy: string;
}

const FavouriteControls: React.FC<FavouriteControlsProps> = ({ id, producedBy }: FavouriteControlsProps) => {
  const { ISFavourites, setISFavourites } = useContext(LocalStorageContext);

  const handleFavourites = () => {
    let favourites = { ...ISFavourites };
    favourites[id] ? (favourites = _.omit(favourites, id)) : (favourites[id] = { producedBy });
    setISFavourites(favourites);
  };

  const keypressHandler = (event: KeyboardEvent) => {
    if (event.key === 'r' || event.key === 'R') handleFavourites();
  };

  useEffect(() => {
    window.addEventListener('keypress', keypressHandler);
    return () => window.removeEventListener('keypress', keypressHandler);
  }, [id, ISFavourites]);

  return (
    <Root>
      <Tooltip title="use (r/R) to favourite/remove item">
        <Button onClick={handleFavourites}>
          <img
            className={ISFavourites?.hasOwnProperty(id) ? classes.iconSelected : classes.icon}
            src="/hand-rock.svg"
          />
        </Button>
      </Tooltip>
    </Root>
  );
};

export default FavouriteControls;
