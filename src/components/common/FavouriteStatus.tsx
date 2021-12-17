import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';

import LocalStorageContext from '../../contexts/localStorage';

const PREFIX = 'FavouriteStatus';

const classes = {
  icon: `${PREFIX}-icon`,
  iconHidden: `${PREFIX}-iconHidden`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
  [`& .${classes.icon}`]: {
    height: 20,
    filter: 'invert(48%) sepia(27%) saturate(2609%) hue-rotate(189deg) brightness(104%) contrast(102%)',
  },

  [`& .${classes.iconHidden}`]: {
    visibility: 'hidden',
    height: 20,
  },
}));

interface FavouriteStatusProps {
  id: string;
}

const FavouriteStatus: React.FC<FavouriteStatusProps> = ({ id }: FavouriteStatusProps) => {
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
    <Root>
      <img className={favourited() ? classes.icon : classes.iconHidden} src="/hand-rock.svg" />
    </Root>
  );
};

export default FavouriteStatus;
