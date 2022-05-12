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
  localStorageRuptureMapLocation: string[];
  setLocalStorageRuptureMapLocation: (newValue: string[]) => void;
  localStorageRuptureMapRadii: string;
  setLocalStorageRuptureMapRadii: (newValue: string) => void;
  localStorageRuptureMapMagRange: number[];
  setLocalStorageRuptureMapMagRange: (newValue: number[]) => void;
  localStorageRuptureMapRateRange: number[];
  setLocalStorageRuptureMapRateRange: (newValue: number[]) => void;
}

export type ISFavouritesInstance = Record<string, ISFavouriteValue> | null;
export interface ISFavouriteValue {
  producedBy: string;
}
