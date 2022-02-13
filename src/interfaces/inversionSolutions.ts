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
export interface SolutionAnalysisGeojsonFeature {
  id: number;
  type: string;
  properties: FeatureProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geometry: any;
}
export interface FeatureProperties {
  'annual_rate.max': string;
  'annual_rate.min': string;
  'annual_rate.sum': string;
  aseismic_slip_factor: string;
  coupling_coeff: string;
  dip_degree: number;
  dip_dir: number;
  fault_name: string;
  low_depth: number;
  magnitude_count: string;
  'magnitude.max': number;
  'magnitude.min': number;
  parent_id: number;
  parent_name: string;
  rake: number;
  section_index: number;
  sections_index_rk: string;
  slip_rate: number;
  slip_rate_std_dev: number;
  solution_id: string;
  up_depth: number;
}
export interface RowData {
  name: string;
  maxMag: number;
  minMag: number;
  maxRate: string;
  minRate: string;
  slipRate: number;
}
