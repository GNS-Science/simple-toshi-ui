export interface LocalStorageContextInterface {
  ISFavourites: ISFavouritesInstance;
  setISFavourites: (newValue: ISFavouritesInstance) => void;
  reportViewSelections: string[];
  setReportViewSelections: (newValue: string[]) => void;
}

export type ISFavouritesInstance = Record<string, ISFavouriteValue> | null;
export interface ISFavouriteValue {
  producedBy: string;
}
