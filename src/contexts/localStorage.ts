import { noop } from 'lodash';
import { createContext } from 'react';
import { LocalStorageContextInterface } from '../interfaces/localStorage';

const LocalStorageContext = createContext<LocalStorageContextInterface>({
  ISFavourites: {},
  setISFavourites: noop,
  reportViewSelections: [],
  setReportViewSelections: noop,
  localStorageRegionalView: [],
  setLocalStorageRegionalView: noop,
});

export default LocalStorageContext;
