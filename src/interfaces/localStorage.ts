import { Dispatch, SetStateAction } from 'react';

export interface LocalStorageContextInterface {
  ISFavourites: Map<string, boolean>;
  setISFavourites: Dispatch<SetStateAction<Map<string, boolean>>>;
}
