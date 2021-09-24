import { noop } from 'lodash';
import { createContext } from 'react';
import { LocalStorageContextInterface } from '../interfaces/localStorage';

const LocalStorageContext = createContext<LocalStorageContextInterface>({
  ISFavourites: {},
  setISFavourites: noop,
});

export default LocalStorageContext;
