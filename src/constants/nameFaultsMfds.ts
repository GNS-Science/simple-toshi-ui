export interface PlotOption {
  displayName: string;
  typePath: string;
  path: string;
}

export const mfdPlotOptions: PlotOption[] = [
  {
    displayName: 'Nucleation Cumulative',
    typePath: 'nucleation_cumulative',
    path: '_cumulative_nucleation.png',
  },
  {
    displayName: 'Nucleation Incremental',
    typePath: 'nucleation_incremental',
    path: '_nucleation.png',
  },
  {
    displayName: 'Participation Cumulative',
    typePath: 'participation_cumulative',
    path: '_cumulative_participation.png',
  },
  {
    displayName: 'Participation Incremental',
    typePath: 'participation_incremental',
    path: '_participation.png',
  },
];

export interface NamedFaultsOption {
  displayName: string;
  path: string;
}

export const namedFaultsOptions: NamedFaultsOption[] = [
  {
    displayName: 'Alpine George to Jacksons',
    path: 'Alpine_George_to_Jacksons',
  },
  {
    displayName: 'Alpine Jacksons to Kaniere',
    path: 'Alpine_Jacksons_to_Kaniere',
  },
  {
    displayName: 'Alpine Kariere to Springs Junction',
    path: 'Alpine_Kaniere_to_Springs_Junction',
  },
  {
    displayName: 'Awanui',
    path: 'Awanui',
  },
  {
    displayName: 'Awatere',
    path: 'Awatere',
  },
  {
    displayName: 'Cape Egmont',
    path: 'Cape_Egmont',
  },
  {
    displayName: 'Dunstan',
    path: 'Dunstan',
  },
  {
    displayName: 'Edgecumbe',
    path: 'Edgecumbe',
  },
  {
    displayName: 'Flaxmore Waimea Tahunanui',
    path: 'Flaxmore_Waimea_Tahunanui',
  },
  {
    displayName: 'Fox Peak',
    path: 'Fox_Peak',
  },
  {
    displayName: 'Greendale',
    path: 'Greendale',
  },
  {
    displayName: 'Hope',
    path: 'Hope',
  },
  {
    displayName: 'Kaiapo',
    path: 'Kaiapo',
  },
  {
    displayName: 'Kekerengu',
    path: 'Kekerengu',
  },
  {
    displayName: 'Kerepehi',
    path: 'Kerepehi',
  },
  {
    displayName: 'Lees Valley',
    path: 'Lees_Valley',
  },
  {
    displayName: 'Needles',
    path: 'Needles',
  },
  {
    displayName: 'Ohariu',
    path: 'Ohariu',
  },
  {
    displayName: 'Ostler',
    path: 'Ostler',
  },
  {
    displayName: 'Paeroa',
    path: 'Paeroa',
  },
  {
    displayName: 'Porters Pass',
    path: 'Porters_Pass',
  },
  {
    displayName: 'Poutu',
    path: 'Poutu',
  },
  {
    displayName: 'Te Tatua o Wairere',
    path: 'Te_Tatua_o_Wairere',
  },
  {
    displayName: 'Titri',
    path: 'Titri',
  },
  {
    displayName: 'Waihi',
    path: 'Waihi',
  },
  {
    displayName: 'Wairarapa',
    path: 'Wairarapa',
  },
  {
    displayName: 'Wairau',
    path: 'Wairau',
  },
  {
    displayName: 'Wairoa North',
    path: 'Wairoa_North',
  },
  {
    displayName: 'Wellington Pahiatua',
    path: 'Wellington_Pahiatua',
  },
  {
    displayName: 'Wellington Wellington Hutt Valley',
    path: 'Wellington_Wellington_Hutt_Valley',
  },
  {
    displayName: 'Whanamoa',
    path: 'Whangamoa',
  },
  {
    displayName: 'White Creek',
    path: 'White_Creek',
  },
  {
    displayName: 'Akatore',
    path: '_Akatore',
  },
];
