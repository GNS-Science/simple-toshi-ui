import { noop } from 'lodash';
import { createContext } from 'react';
import { LocalStorageContextInterface } from '../interfaces/localStorage';

const LocalStorageContext = createContext<LocalStorageContextInterface>({
  ISFavourites: {},
  setISFavourites: noop,
  localStorageRegionalViews: [],
  setLocalStorageRegionalViews: noop,
  localStorageGeneralViews: [],
  setLocalStorageGeneralViews: noop,
  localStorageNamedFaultsView: '',
  setLocalStorageNamedFaultsView: noop,
  localStorageNamedFaultsLocations: [],
  setLocalStorageNamedFaultsLocations: noop,
  localStorageParentFaultViews: [],
  setLocalStorageParentFaultViews: noop,
  localStorageParentFault: null,
  setLocalStorageParentFault: noop,
});

export default LocalStorageContext;
