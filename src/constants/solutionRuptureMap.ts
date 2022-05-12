import { LatLngExpression } from 'leaflet';

interface SolutionAnalysisLocationOption {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  population: number;
}

export const nz_centre: LatLngExpression = [-40.946, 174.167];
export const zoom = 5;
export const provider_url =
  'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';

export const solutionRuptureMapRadiiOptions = {
  id: '6',
  radii: [10000, 20000, 30000, 40000, 50000, 100000],
};

export const solutionRuptureMapLocationOptions: SolutionAnalysisLocationOption[] = [
  {
    id: 'WLG',
    name: 'Wellington',
    latitude: -41.276825,
    longitude: 174.777969,
    population: 200000,
  },
  {
    id: 'GIS',
    name: 'Gisborne',
    latitude: -38.662334,
    longitude: 178.017654,
    population: 50000,
  },
  {
    id: 'CHC',
    name: 'Christchurch',
    latitude: -43.52565,
    longitude: 172.639847,
    population: 300000,
  },
  {
    id: 'IVC',
    name: 'Invercargill',
    latitude: -46.413056,
    longitude: 168.3475,
    population: 80000,
  },
  {
    id: 'DUD',
    name: 'Dunedin',
    latitude: -45.8740984,
    longitude: 170.5035755,
    population: 100000,
  },
  {
    id: 'NPE',
    name: 'Napier',
    latitude: -39.4902099,
    longitude: 176.917839,
    population: 80000,
  },
  {
    id: 'NPL',
    name: 'New Plymouth',
    latitude: -39.0579941,
    longitude: 174.0806474,
    population: 80000,
  },
  {
    id: 'PMR',
    name: 'Palmerston North',
    latitude: -40.356317,
    longitude: 175.6112388,
    population: 70000,
  },
  {
    id: 'NSN',
    name: 'Nelson',
    latitude: -41.2710849,
    longitude: 173.2836756,
    population: 80000,
  },
  {
    id: 'BHE',
    name: 'Blenheim',
    latitude: -41.5118691,
    longitude: 173.9545856,
    population: 50000,
  },
  {
    id: 'WHK',
    name: 'Whakatane',
    latitude: -37.9519223,
    longitude: 176.9945977,
    population: 50000,
  },
  {
    id: 'GMN',
    name: 'Greymouth',
    latitude: -42.4499469,
    longitude: 171.2079875,
    population: 30000,
  },
  {
    id: 'ZQN',
    name: 'Queenstown',
    latitude: -45.03,
    longitude: 168.66,
    population: 15000,
  },
  {
    id: 'AKL',
    name: 'Auckland',
    latitude: -36.848461,
    longitude: 174.763336,
    population: 2000000,
  },
  {
    id: 'ROT',
    name: 'Rotorua',
    latitude: -38.1446,
    longitude: 176.2378,
    population: 77000,
  },
  {
    id: 'TUO',
    name: 'Taupo',
    latitude: -38.6843,
    longitude: 176.0704,
    population: 26000,
  },
  {
    id: 'WRE',
    name: 'Whangarei',
    latitude: -35.7275,
    longitude: 174.3166,
    population: 55000,
  },
  {
    id: 'LVN',
    name: 'Levin',
    latitude: -40.6218,
    longitude: 175.2866,
    population: 19000,
  },
  {
    id: 'TMZ',
    name: 'Tauranga',
    latitude: -37.687,
    longitude: 176.1654,
    population: 130000,
  },
  {
    id: 'TIU',
    name: 'Timaru',
    latitude: -44.3904,
    longitude: 171.2373,
    population: 28000,
  },
  {
    id: 'OAM',
    name: 'Oamaru',
    latitude: -45.0966,
    longitude: 170.9714,
    population: 14000,
  },
  {
    id: 'PUK',
    name: 'Pukekohe',
    latitude: -37.2004,
    longitude: 174.901,
    population: 27000,
  },
  {
    id: 'HLZ',
    name: 'Hamilton',
    latitude: -37.7826,
    longitude: 175.2528,
    population: 165000,
  },
  {
    id: 'LYJ',
    name: 'Lower Hutt',
    latitude: -41.2127,
    longitude: 174.8997,
    population: 112000,
  },
  {
    id: 'KBZ',
    name: 'Kaikoura',
    latitude: -42.4,
    longitude: 173.68,
    population: 2400,
  },
];
