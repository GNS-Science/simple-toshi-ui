import { IMagRate } from '../components/PreviewMFD_data';

export const replaceMissingValues = (data: IMagRate[]): IMagRate[] => {
  const defaultData = Array.from({ length: 50 }, (v, i) => {
    const x = Math.round((5.05 + i / 10) * 100) / 100;
    return { mag: x, rate: 1e-20 };
  });
  defaultData.map((x) => {
    for (const z of data) {
      if (z.mag == x.mag) {
        x.rate = z.rate;
      }
    }
  });
  return defaultData;
};
