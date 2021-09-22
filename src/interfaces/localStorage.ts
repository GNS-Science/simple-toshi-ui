import { Dispatch, SetStateAction } from 'react';

export interface LocalStorageContextInterface {
  ISFavourites: Map<string, boolean>;
  ISDiscards: Map<string, boolean>;
  setISFavourites: Dispatch<SetStateAction<Map<string, boolean>>>;
  setISDiscards: Dispatch<SetStateAction<Map<string, boolean>>>;
}
