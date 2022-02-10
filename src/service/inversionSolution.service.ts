import { InversionSolutionHazardChartsQueryResponse } from '../components/inversionSolution/__generated__/InversionSolutionHazardChartsQuery.graphql';
import { XY } from '../interfaces/common';
import { HazardTableFilteredData, HazardTableOptions } from '../interfaces/inversionSolutions';
import * as mathjs from 'mathjs';

const minXBound = parseFloat(process.env.REACT_APP_MIN_X_BOUND ?? '0');
const minYBound = 1e-5;

export const minDataFilter = (data: XY[]): XY[] => {
  return data.filter((xy) => {
    return xy.x >= minXBound && xy.y >= minYBound;
  });
};

export const filterData = (
  data: InversionSolutionHazardChartsQueryResponse,
  location: string,
  pgaValue: string,
  forecastTime: string,
  gmpe: string,
  backgroundSeismisity: string,
): XY[] => {
  const xy: XY[] = [];
  const rows = data?.node?.rows;
  const pga = pgaValue.replace('s', '');

  const filtered = rows?.filter((item) => {
    if (
      item &&
      item[0] === forecastTime &&
      item[1] === backgroundSeismisity &&
      item[2] === pga &&
      item[3] === gmpe &&
      item[4] === location
    )
      return true;
  });

  filtered?.map((item) => {
    if (item) {
      const slicedArray = item.slice(7, 9);
      const object: XY = {
        x: parseFloat(slicedArray[0] as string),
        y: parseFloat(slicedArray[1] as string),
      };
      xy.push(object);
    }
  });

  return xy;
};

export const filterMultipleCurves = (
  pgaValues: string[],
  data: InversionSolutionHazardChartsQueryResponse,
  location: string,
  forecastTime: string,
  gmpe: string,
  backgroundSeismicity: string,
): HazardTableFilteredData => {
  const filteredCurves: HazardTableFilteredData = {};

  pgaValues.map((pgaValue) => {
    const pga = pgaValue === 'PGA' ? '0.0' : pgaValue;
    const curve = filterData(data, location, pga, forecastTime, gmpe, backgroundSeismicity);
    filteredCurves[pgaValue] = curve;
  });

  return filteredCurves;
};

export const cropCurves = (data: HazardTableFilteredData): HazardTableFilteredData => {
  const croppedCurves: HazardTableFilteredData = {};
  Object.keys(data).map((key) => {
    croppedCurves[key] = minDataFilter(data[key]);
  });
  //Checks to see if ALL data has been filtered out, if so, replaces with one (almost) zero data point so the chart renders.
  if (Object.keys(croppedCurves).length === 0) {
    croppedCurves.PGA = [{ x: 0.000000000000000001, y: 0.000000000000000001 }];
  }
  return croppedCurves;
};

export const getHazardTableOptions = (data: InversionSolutionHazardChartsQueryResponse): HazardTableOptions => {
  const rows = data?.node?.rows;

  const forecastTimes = new Set<string>();
  const bgSeismicity = new Set<string>();
  const pga = new Set<string>();
  const gmpe = new Set<string>();
  const locations = new Set<string>();

  rows?.map((row) => {
    if (row) {
      row[0] !== null && forecastTimes.add(row[0]);
      row[1] !== null && bgSeismicity.add(row[1]);
      row[2] !== null && pga.add(row[2] === '0.0' ? 'PGA' : row[2]);
      row[3] !== null && gmpe.add(row[3]);
      row[4] !== null && locations.add(row[4]);
    }
  });

  const pgaArray = Array.from(pga);
  const pgaWithSeconds: string[] = [];
  pgaArray.map((value) => {
    value === 'PGA' ? pgaWithSeconds.push('PGA') : pgaWithSeconds.push(`${value}s`);
  });

  return {
    forecastTime: Array.from(forecastTimes),
    backgroundSeismicity: Array.from(bgSeismicity),
    PGA: pgaWithSeconds,
    gmpe: Array.from(gmpe),
    location: Array.from(locations),
  };
};

export const getSpectralAccelerationData = (
  pgaValues: string[],
  xValue: number,
  filteredCurves: HazardTableFilteredData,
): XY[] => {
  const dataSet: XY[] = [];

  pgaValues.map((value) => {
    try {
      let p1: number[] = [];
      let p2: number[] = [];
      const p3 = [Math.log(2e-3), Math.log(xValue)];
      const p4 = [Math.log(10), Math.log(xValue)];

      filteredCurves[value].find((xy, i) => {
        if (xy.y <= xValue) {
          p1 = [Math.log(xy.x), Math.log(xy.y)];
          p2 = [Math.log(filteredCurves[value][i - 1].x), Math.log(filteredCurves[value][i - 1].y)];
          return true;
        }
      });
      const point = mathjs.intersect(p1, p2, p3, p4);
      const result = [Math.exp(point[0] as number), mathjs.exp(mathjs.exp(point[1] as number))];
      dataSet.push({ x: value === 'PGA' ? 0.01 : parseFloat(value), y: result[0] });
    } catch {
      dataSet.push({ x: value === 'PGA' ? 0.01 : parseFloat(value), y: 0 });
    }
  });

  return dataSet;
};
