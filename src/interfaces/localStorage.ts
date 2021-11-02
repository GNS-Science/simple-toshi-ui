export interface LocalStorageContextInterface {
  ISFavourites: ISFavouritesInstance;
  setISFavourites: (newValue: ISFavouritesInstance) => void;
  localStorageRegionalView: string[];
  setLocalStorageRegionalView: (newValue: string[]) => void;
  localStorageGeneralViews: string[];
  setLocalStorageGeneralViews: (newValue: string[]) => void;
  localStorageNamedFaultsView: string;
  setLocalStorageNamedFaultsView: (newValue: string) => void;
  localStorageNamedFaultsLocations: string[];
  setLocalStorageNamedFaultsLocations: (newValue: string[]) => void;
}

export type ISFavouritesInstance = Record<string, ISFavouriteValue> | null;
export interface ISFavouriteValue {
  producedBy: string;
}
