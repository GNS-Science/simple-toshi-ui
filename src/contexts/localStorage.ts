import { noop } from 'lodash';
import { createContext } from 'react';
import { LocalStorageContextInterface } from '../interfaces/localStorage';

const LocalStorageContext = createContext<LocalStorageContextInterface>({
  ISFavourites: new Map(),
  ISDiscards: new Map(),
  setISFavourites: noop,
  setISDiscards: noop,
});

export default LocalStorageContext;
