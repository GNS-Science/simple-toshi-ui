import { InversionSolutionHazardTabQueryResponse } from '../components/inversionSolution/__generated__/InversionSolutionHazardTabQuery.graphql';
import { XY } from '../interfaces/common';
import { HazardTableFilteredData, HazardTableOptions } from '../interfaces/inversionSolutions';
import * as mathjs from 'mathjs';

const minXBound = parseFloat(process.env.REACT_APP_MIN_X_BOUND ?? '0');
const minYBound = 1e-13;

export const minDataFilter = (data: XY[]): XY[] => {
  return data.filter((xy) => {
    return xy.x >= minXBound && xy.y >= minYBound;
  });
};

export const filterData = (
  data: InversionSolutionHazardTabQueryResponse,
  location: string,
  pgaValue: string,
  forecastTime: string,
  gmpe: string,
  backgroundSeismisity: string,
): XY[] => {
  const xy: XY[] = [];
  const rows = data?.node?.rows;
  const filtered = rows?.filter((item) => {
    if (
      item &&
      item[0] === forecastTime &&
      item[1] === backgroundSeismisity &&
      item[2] === pgaValue &&
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

  return minDataFilter(xy);
};

export const filterMultipleCurves = (
  pgaValues: string[],
  data: InversionSolutionHazardTabQueryResponse,
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

export const getHazardTableOptions = (data: InversionSolutionHazardTabQueryResponse): HazardTableOptions => {
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

  return {
    forecastTime: Array.from(forecastTimes),
    backgroundSeismicity: Array.from(bgSeismicity),
    PGA: Array.from(pga),
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
    dataSet.push({ x: value === 'PGA' ? 0 : parseFloat(value), y: result[0] });
  });

  return dataSet;
};
