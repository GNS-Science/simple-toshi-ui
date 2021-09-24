export interface LocalStorageContextInterface {
  ISFavourites: LocalStorageInstance;
  setISFavourites: (newValue: LocalStorageInstance) => void;
}

export type LocalStorageInstance = Record<string, LocalStorageValue> | null;
export interface LocalStorageValue {
  producedBy: string;
}
