import { InversionSolutionHazardTabQueryResponse } from '../components/inversionSolution/__generated__/InversionSolutionHazardTabQuery.graphql';
import { XY, XYCurve } from '../interfaces/common';
import { HazardTableOptions } from '../interfaces/inversionSolutions';

const minXBound = parseFloat(process.env.REACT_APP_MIN_X_BOUND ?? '0');

export const minDataFilter = (data: XY[]): XY[] => {
  return data.filter((xy) => {
    return xy.x >= minXBound;
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
