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
  localStorageRuptureMapLocation: [],
  setLocalStorageRuptureMapLocation: noop,
  localStorageRuptureMapRadii: '10km',
  setLocalStorageRuptureMapRadii: noop,
  localStorageRuptureMapMagRange: [5, 10],
  setLocalStorageRuptureMapMagRange: noop,
  localStorageRuptureMapRateRange: [-20, 0],
  setLocalStorageRuptureMapRateRange: noop,
});

export default LocalStorageContext;
