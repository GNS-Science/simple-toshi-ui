export interface LocalStorageContextInterface {
  ISFavourites: ISFavouritesInstance;
  setISFavourites: (newValue: ISFavouritesInstance) => void;
  localStorageRegionalViews: string[];
  setLocalStorageRegionalViews: (newValue: string[]) => void;
  localStorageNonRegionalViews: string[];
  setLocalStorageNonRegionalViews: (newValue: string[]) => void;
  localStorageGeneralViews: string[];
  setLocalStorageGeneralViews: (newValue: string[]) => void;
  localStorageNamedFaultsView: string;
  setLocalStorageNamedFaultsView: (newValue: string) => void;
  localStorageNamedFaultsLocations: string[];
  setLocalStorageNamedFaultsLocations: (newValue: string[]) => void;
  localStorageParentFaultViews: string[];
  setLocalStorageParentFaultViews: (newValue: string[]) => void;
  localStorageParentFault: string | null;
  setLocalStorageParentFault: (newValue: string | null) => void;
}

export type ISFavouritesInstance = Record<string, ISFavouriteValue> | null;
export interface ISFavouriteValue {
  producedBy: string;
}
