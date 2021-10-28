interface PlotOptions {
  displayName: string;
  typePath: string;
  path: string;
}
type MfdPlotOptions = Record<string, PlotOptions>;

export const mfdPlotOptions: MfdPlotOptions = {
  nucleationCumulative: {
    displayName: 'Nucleation Cumulative',
    typePath: 'nucleation_cumulative',
    path: '_cumulative_nucleation.png',
  },
  nucleationIncremental: {
    displayName: 'Nucleation Incremental',
    typePath: 'nucleation_incremental',
    path: '_nucleation.png',
  },
  participationCumulative: {
    displayName: 'Participation Cumulative',
    typePath: 'participation_cumulative',
    path: '_cumulative_participation.png',
  },
  participationIncremental: {
    displayName: 'Participation Incremental',
    typePath: 'participation_incremental',
    path: '_participation.png',
  },
};

export interface NamedFaultsOption {
  displayName: string;
  path: string;
}

export const namedFaultsOptions: NamedFaultsOption[] = [
  {
    displayName: 'Alpine George to Jacksons',
    path: 'Alpine_George_to_Jacksons_',
  },
  {
    displayName: 'Alpine Jacksons to Kaniere',
    path: 'Alpine_Jacksons_to_Kaniere_',
  },
  {
    displayName: 'Alpine Kariere to Springs Junction',
    path: 'Alpine_Kaniere_to_Springs_Junction_',
  },
  {
    displayName: 'Awanui',
    path: 'Awanui_',
  },
  {
    displayName: 'Awatere',
    path: 'Awatere_',
  },
  {
    displayName: 'Cape Egmont',
    path: 'Cape_Egmont_',
  },
  {
    displayName: 'Dunstan',
    path: 'Dunstan_',
  },
  {
    displayName: 'Edgecumbe',
    path: 'Edgecumbe_',
  },
  {
    displayName: 'Flaxmore Waimea Tahunanui',
    path: 'Flaxmore_Waimea_Tahunanui_',
  },
  {
    displayName: 'Fox Peak',
    path: 'Fox_Peak_',
  },
  {
    displayName: 'Greendale',
    path: 'Greendale_',
  },
  {
    displayName: 'Hope',
    path: 'Hope_',
  },
  {
    displayName: 'Kaiapo',
    path: 'Kaiapo_',
  },
  {
    displayName: 'Kekerengu',
    path: 'Kekerengu_',
  },
  {
    displayName: 'Kerepehi',
    path: 'Kerepehi_',
  },
  {
    displayName: 'Lees Valley',
    path: 'Lees_Valley_',
  },
  {
    displayName: 'Needles',
    path: 'Needles_',
  },
  {
    displayName: 'Ohariu',
    path: 'Ohariu_',
  },
  {
    displayName: 'Ostler',
    path: 'Ostler_',
  },
  {
    displayName: 'Paeroa',
    path: 'Paeroa_',
  },
  {
    displayName: 'Porters Pass',
    path: 'Porters_Pass_',
  },
  {
    displayName: 'Poutu',
    path: 'Poutu_',
  },
  {
    displayName: 'Te Tatua o Wairere',
    path: 'Te_Tatua_o_Wairere_',
  },
  {
    displayName: 'Titri',
    path: 'Titri_',
  },
  {
    displayName: 'Waihi',
    path: 'Waihi_',
  },
  {
    displayName: 'Wairarapa',
    path: 'Wairarapa_',
  },
  {
    displayName: 'Wairau',
    path: 'Wairau_',
  },
  {
    displayName: 'Wairoa North',
    path: 'Wairoa_North_',
  },
  {
    displayName: 'Wellington Pahiatua',
    path: 'Wellington_Pahiatua_',
  },
  {
    displayName: 'Wellington Wellington Hutt Valley',
    path: 'Wellington_Wellington_Hutt_Valley_',
  },
  {
    displayName: 'Whanamoa',
    path: 'Whangamoa_',
  },
  {
    displayName: 'White Creek',
    path: 'White_Creek_',
  },
  {
    displayName: 'Akatore',
    path: '_Akatore_',
  },
];
