export type ArgumentKeyValuePair = {
  readonly k: string | null;
  readonly v: string | null;
} | null;
export interface XY {
  x: number;
  y: number;
}

export interface XYCurve {
  variable: string;
  x: number;
  y: number;
}
