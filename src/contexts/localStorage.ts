import { noop } from 'lodash';
import { createContext } from 'react';
import { LocalStorageContextInterface } from '../interfaces/localStorage';

const LocalStorageContext = createContext<LocalStorageContextInterface>({
  ISFavourites: {},
  setISFavourites: noop,
  localStorageRegionalViews: [],
  setLocalStorageRegionalViews: noop,
  localStorageNonRegionalViews: [],
  setLocalStorageNonRegionalViews: noop,
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
  localStorageRuptureMapLocation: null,
  setLocalStorageRuptureMapLocation: noop,
  localStorageRuptureMapRadii: null,
  setLocalStorageRuptureMapRadii: noop,
  localStorageRuptureMapMagRange: [5, 10],
  setLocalStorageRuptureMapMagRange: noop,
  localStorageRuptureMapRateRange: [-20, 0],
  setLocalStorageRuptureMapRateRange: noop,
});

export default LocalStorageContext;
