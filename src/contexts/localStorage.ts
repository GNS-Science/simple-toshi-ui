import { noop } from 'lodash';
import { createContext } from 'react';
import { LocalStorageContextInterface } from '../interfaces/localStorage';

const LocalStorageContext = createContext<LocalStorageContextInterface>({
  ISFavourites: {},
  setISFavourites: noop,
  localStorageGeneralViews: [],
  setLocalStorageGeneralViews: noop,
  localStorageNamedFaultsView: '',
  setLocalStorageNamedFaultsView: noop,
  localStorageNamedFaultsLocations: [],
  setLocalStorageNamedFaultsLocations: noop,
});

export default LocalStorageContext;
