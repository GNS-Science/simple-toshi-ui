import { InversionSolutionHazardTabQueryResponse } from '../components/inversionSolution/__generated__/InversionSolutionHazardTabQuery.graphql';
import { XY } from '../interfaces/common';

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
    if (item) {
      return (
        item?.includes(location) &&
        item?.includes(pgaValue) &&
        item?.includes(forecastTime) &&
        item?.includes(gmpe) &&
        item?.includes(backgroundSeismisity)
      );
    }
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
