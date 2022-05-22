import { solutionRuptureMapLocationOptions, solutionRuptureMapRadiiOptions } from '../constants/solutionRuptureMap';

export const rateLabelFormat = (value: number): string => {
  return `1e${value}`;
};

export const getLocationIdString = (currentSelection: string[]): string => {
  const filteredLocations = solutionRuptureMapLocationOptions.filter((location) =>
    currentSelection.includes(location.name),
  );
  const filteredLocationIDs: string[] = [];
  filteredLocations.map((location) => {
    filteredLocationIDs.push(location.id);
  });

  return filteredLocationIDs.join('%2C');
};

export const getRadiiInKm = (radii: string): string => {
  return radii === '100km' ? radii.slice(0, 3) : radii.slice(0, 2);
};

export const getLocationOptions = (): string[] => {
  const locations: string[] = [];
  solutionRuptureMapLocationOptions.map((locationOption) => {
    locations.push(locationOption.name);
  });
  locations.sort();
  return locations;
};

export const radiiOptions = solutionRuptureMapRadiiOptions.radii.map((radius: number) => `${radius / 1000}km`);
