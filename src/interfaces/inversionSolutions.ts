import { XY } from './common';

export interface HazardTableOptions {
  forecastTime: string[];
  backgroundSeismicity: string[];
  PGA: string[];
  gmpe: string[];
  location: string[];
}

export type HazardTableFilteredData = Record<string, XY[]>;
