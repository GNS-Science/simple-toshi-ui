import { XY } from './common';

export interface HazardTableOptions {
  forecastTime: string[];
  backgroundSeismicity: string[];
  PGA: string[];
  gmpe: string[];
  location: string[];
}
export interface LocationData {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
}

export type HazardTableFilteredData = Record<string, XY[]>;

export interface MfdProps {
  series: string[];
  colours: string[];
  maxMagnitude: number;
  minMagnitude: number;
}
