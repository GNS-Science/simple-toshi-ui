export interface ParentViewsOption {
  displayName: string;
  path: string;
}

export const parentViewsOptions: ParentViewsOption[] = [
  {
    displayName: 'Along Strike Mo & b',
    path: '/sect_along_strike_mo_b.png',
  },
  {
    displayName: 'Along strike rates',
    path: '/sect_along_strike.png',
  },
  {
    displayName: 'Co-rupture counts',
    path: '/corupture_count.png',
  },
  {
    displayName: 'Co-rupture rates',
    path: '/corupture_rate.png',
  },
  {
    displayName: 'Section MFD (Cumulative)',
    path: '/sect_mfd_cumulative.png',
  },
  {
    displayName: 'Section MFD (Incremental)',
    path: '/sect_mfd.png',
  },
];

export const parentFaultsOptions: string[] = [
  'Acheron',
  'Acton',
  'Aka_Aka',
  'Akatarawa',
  'Akatore',
  'Akitio_Ridge',
  'Akitio_Trough_West',
  'Albury',
  'Alderman_West_5',
  'Alderman_West_6',
  'Alexander',
  'Alfredton_North',
  'Alfredton_South',
  'Alpine_Caswell',
  'Alpine_Caswell_South_George',
  'Alpine_George_landward',
  'Alpine_George_seaward',
  'Alpine_George_to_Jacksons',
  'Alpine_Jacksons_to_Kaniere',
  'Alpine_Kaniere_to_Springs_Junction',
  'Alpine_Nancy',
  'Alpine_Resolution_Charles',
  'Alpine_Resolution_Dagg',
  'Alpine_Resolution_Five_Fingers',
  'Alpine_Springs_Junction_to_Tophouse',
  'AmberBlyth',
  'Aorangi_Ridge',
  'Aorangi_Trough',
  'Aotea_Evans_Bay',
  'Ararata',
  'Ariel_Bank',
  'Ariel_Bank_2',
  'Ariel_East',
  'Awahokomo',
  'Awamoa',
  'Awanui',
  'Awanui_1',
  'Awanui_2',
  'Awanui_3',
  'Awatere_Northeast_1',
  'Awatere_Northeast_2',
  'Awatere_Southwest',
  'Backbone',
  'Balmoral',
  'Barefell',
  'Barn',
  'Barrier_Range',
  'Beacon_Hill',
  'Beaumont_River',
  'Ben_McLeod',
  'Bennett_Knoll',
  'Bidwill',
  'Big_Ben',
  'Billys_Ridge',
  'BKSmt_North',
  'BKSmt_West',
  'Black_Blob_Haast_Ridge',
  'Black_Hill',
  'Blue_Lake',
  'Blue_Mountain',
  'Boby_Stream',
  'BooBoo',
  'Braemar',
  'Brothers',
  'Browning_Pass',
  'Bruce',
  'Calypso_2',
  'Campbell_Bank',
  'Campbell_Hills',
  'Cape_Egmont_Central',
  'Cape_Egmont_North',
  'Cape_Egmont_South',
  'Cape_Foulwind_1',
  'Cape_Foulwind_2',
  'Cape_Foulwind_4',
  'Cardrona_Hawea',
  'Carterton',
  'Caswell_211',
  'Caswell_High_1',
  'Caswell_High_10',
  'Caswell_High_3',
  'Caswell_High_4',
  'Caswell_High_5',
  'Caswell_High_67',
  'Caswell_High_8',
  'Caswell_High_9',
  'Catherine',
  'CenPeg1n2',
  'Central_Balleny',
  'Central_Wedge_1_2_3',
  'Central_Wedge_4_South_Wedge_411',
  'Chamberlain',
  'Chancet',
  'Cheeseman',
  'Clarence_Central',
  'Clarence_Northeast',
  'Clarence_Southwest',
  'Clear_Hills_Waikopiro',
  'Clifton',
  'Cloudy_1',
  'Cloudy_2',
  'Cloudy_3',
  'Cluden',
  'Coal_Creek',
  'Conway_Trough_East',
  'Conway_Trough_West',
  'Cross_Eden',
  'Dalgety',
  'Darran',
  'Dillon',
  'Dingle',
  'Doctors',
  'Double_Hill',
  'Dreyers_Rock',
  'Dromedary',
  'Drury',
  'Dryburgh',
  'Dry_River_Huangarua_1',
  'Dry_River_Huangarua_2',
  'Dry_River_Huangarua_3',
  'Dunback_Hill',
  'Dunstan',
  'EarthquakeFlat_Tumunui',
  'East_Cape_Ridge_1',
  'East_Cape_Ridge_2',
  'Edgecumbe_1987',
  'Edgecumbe_Coastal',
  'Edith',
  'Elliott',
  'EQ_rupture_13June2011',
  'EQ_rupture_22Feb2011',
  'EQ_rupture_23Dec2011',
  'Esk_North',
  'Esk_South',
  'F14_North',
  'F16_Central',
  'F16_North',
  'F16_South',
  'F17_Central',
  'F17_South',
  'Falstone',
  'Farewell',
  'Fern_Gully',
  'Fidget',
  'Fisherman_1',
  'Fisherman_2',
  'Fisherman_3',
  'Five_Fingers',
  'Flat_Stream_Glenpark',
  'Flaxmore_Waimea_Tahunanui',
  'Fowlers',
  'Foxley_Station',
  'Fox_Peak',
  'Gable_End_North',
  'Gable_End_South',
  'Galloway',
  'Galloway_Shanty',
  'Garibaldi',
  'Garvie',
  'Gibbs',
  'Gibson',
  'Gimmerburn',
  'Glasgow',
  'Glenbrook',
  'Glendhu_Ridge',
  'Goodger',
  'Grampian',
  'Grandview',
  'Great_Groove',
  'Greendale',
  'Green_Island',
  'Gunn_Glacier',
  'Hanmer',
  'Hariki',
  'Harper',
  'Harris_Road',
  'Hauroko_North',
  'Hauroko_South',
  'Hawkdun',
  'Hawke_Bay_1',
  'Hawke_Bay_2',
  'Hawke_Bay_4',
  'Hawke_Bay_5_11',
  'Hawke_Bay_7',
  'Hawke_Bay_8',
  'Hawkswood',
  'Hedgehope',
  'High_Peak_Sheffield',
  'Hillfoot',
  'Himatangi',
  'Hohonu',
  'Hohonu_North',
  'Hohonu_South',
  'Hokonui',
  'Hollyford',
  'Honeycomb',
  'Honeycomb_Ridge',
  'Hope_Conway',
  'Hope_Hamner_SE',
  'Hope_Hamner_SW',
  'Hope_Hanmer_NW',
  'Hope_Hope_River',
  'Hope_Hurunui',
  'Hope_Kakapo_2_Hamner',
  'Hope_Seaward',
  'Hope_Taramakau',
  'Hope_Te_Rapa',
  'Hopkins',
  'Hororata',
  'Horse_Flat',
  'Houtunui',
  'Hump_Ridge',
  'Hundalee',
  'Hunters',
  'Hunter_Valley',
  'Hurunui_Peak',
  'Hutt_Peel',
  'Huxley',
  'Hyde_North',
  'Hyde_South_The_Twins',
  'Ihaia',
  'Inangahua',
  'Inglewood',
  'Irishman_Creek',
  'Jagged',
  'Jollie_Range',
  'Jordan',
  'Kahurangi',
  'Kaiapo',
  'Kaikorai',
  'Kaikoura_2',
  'Kaikoura_Mangamaunu',
  'Kaingaroa_1',
  'Kaingaroa_2',
  'Kaingaroa_3',
  'Kairakau_2',
  'Kairakau_North',
  'Kairakau_South',
  'Kaiwara_North',
  'Kaiwara_South',
  'Kakapo',
  'Karamea',
  'Karamea_North',
  'Karamea_South',
  'Karangarua',
  'Kaumingi',
  'Kaweka',
  'Keepa',
  'Kekerengu_1',
  'Kekerengu_Bank',
  'Kelly',
  'Kenepuru',
  'Kerepehi_Awaiti',
  'Kerepehi_Elstow',
  'Kerepehi_Offshore',
  'Kerepehi_Okoroire',
  'Kerepehi_Te_Poi',
  'Kerepehi_Waitoa',
  'Kereu',
  'Kermadec_Trench',
  'Kermadec_Trench_slope1',
  'Kidnappers_Ridge',
  'Kina',
  'Kiri',
  'Kirkliston',
  'Klondyke_Moor',
  'Knowles_Top',
  'Kohaihai',
  'Kohaihai_South',
  'Kongahau',
  'Kotare_Moutuhora',
  'Kowai_View_Hill',
  'Kowhai',
  'Kututaruhe',
  'Lachlan_1_2',
  'Lachlan_3',
  'Lake_Heron',
  'Lake_Onslow',
  'Landsborough_2',
  'Leader_Central',
  'Leader_North',
  'Leader_South',
  'Leedstown',
  'Lees_Valley',
  'Leithfield_NCVI_NCVII',
  'Leonard_Mound',
  'Levin_Anticline',
  'Liebig_North',
  'Lilybank',
  'Lindis_River',
  'Little_Hillfoot',
  'Little_Valley',
  'Livingstone',
  'Logan_Burn',
  'London_Hill',
  'Long_Valley',
  'Lord_Range',
  'Lowry',
  'Lyell',
  'Lyell_South',
  'Macaulay_2',
  'Madagascar',
  'Madden_Banks',
  'Mahia_2',
  'Maimai',
  'Maimai_Brunner_Anticline',
  'Maimai_North',
  'Maimai_South',
  'Makuri_Waewaepa',
  'Maleme',
  'Manahi_1',
  'Manahi_2',
  'Mangatangi',
  'Marlborough_Slope_10',
  'Marlborough_Slope_11',
  'Marlborough_Slope_2',
  'Marlborough_Slope_3',
  'Marlborough_Slope_4',
  'Marlborough_Slope_9',
  'Martinborough',
  'Mascarin',
  'Masterton',
  'Mataikona',
  'Mataikona_East',
  'Matata',
  'Mathias',
  'Matiri_West',
  'Maunga',
  'Maungati',
  'Maungatua_North_Taieri',
  'McKerchar',
  'McKerrow_Douglas_Duplex',
  'Middle_Range',
  'Mid_Dome',
  'Milford_Basin_5_to_George_R2',
  'Mistake_Rolleston',
  'Mohaka_North',
  'Mohaka_South',
  'Mokonui_Northeast',
  'Mokonui_Southwest',
  'Monowai',
  'Moonlight_North',
  'Moonlight_South',
  'Moonshine',
  'Mossburn',
  'Motatapu',
  'Motu',
  'Motunau',
  'Motu_o_Kura_East',
  'Motuokura_North',
  'Motu_o_Kura_Ridge',
  'Motu_River',
  'Moumahaki_Okaia_4',
  'Mt_Adams',
  'Mt_Arden',
  'Mt_Culverden',
  'Mt_Lawry',
  'Mt_Roon',
  'Mt_Stewart',
  'Mt_Sutton',
  'Mt_White',
  'Mungo',
  'Murchison_1_Ice_Lake',
  'Murphys_Creek',
  'Needles',
  'Needles_East_2',
  'Nevis',
  'Ngapotiki',
  'Ngatoro_South_2',
  'Ngatoro_South_5',
  'Ngatoro_West_1',
  'Nichols_Rock',
  'Norfolk',
  'North_Branch',
  'North_Canterbury_Shelf_11',
  'North_Canterbury_Shelf_2',
  'North_Canterbury_Shelf_4',
  'Northern_Ohariu',
  'North_Mernoo_15',
  'North_Mernoo_26',
  'North_Mernoo_E2_1',
  'North_Mernoo_E2_2',
  'North_Mernoo_F1',
  'North_Mernoo_F2',
  'North_Mernoo_Fa_1',
  'North_Mernoo_Fa_2',
  'North_Mernoo_G',
  'North_Mernoo_H',
  'North_Mernoo_I',
  'North_Mernoo_J',
  'North_Mernoo_K2',
  'North_Mernoo_K3',
  'North_Mernoo_L',
  'North_Mernoo_M',
  'Nukumuru_Waitotara_1_6',
  'NW_Cardrona_North',
  'NW_Cardrona_South',
  'Oaonui',
  'Observation',
  'Offshore_Splay_Thrust',
  'Ohae_1',
  'Ohae_2',
  'Ohae_3',
  'Ohariu',
  'Ohariu_South_1',
  'Ohariu_South_2',
  'Ohena_2',
  'Ohena_3',
  'Ohena_4',
  'Ohena_5',
  'Ohiwa_1',
  'Okaia_3',
  'Okaia_5',
  'Okupe_1',
  'Old_Man',
  'Omakere_Ridge',
  'Omakere_South',
  'Omanawa_Falls',
  'Omarama_Saddle',
  'OmihiLwrHuru',
  'Onepoto',
  'Opape_1',
  'Opawa',
  'Opotiki_2',
  'Opotiki_3',
  'Opouawe_Uruti',
  'Orakeikorako',
  'Oruawharo_Mangatoro',
  'Ostler_North',
  'Ostler_South',
  'Otaheke_North',
  'Otaheke_South',
  'Otaki_Forks_1',
  'Otaki_Forks_2',
  'Otakiri',
  'Otanomomo',
  'Otara_East_1',
  'Otara_East_2',
  'Otaraia',
  'Otara_West_1',
  'Otara_West_2',
  'Otara_West_3',
  'Paddys_Ridge',
  'Paeroa',
  'Pahaua',
  'Pahaua_SE1',
  'Pahaua_SE2',
  'Pahiatua',
  'Pakarae',
  'Pakupaku_Ridge',
  'Pakupaku_Ridge_East',
  'Palliser_Kaiwhata',
  'Pancake',
  'Paoanui_Ridge_North',
  'Papaku',
  'Paparoa_West',
  'Paparoa_West_North',
  'Papatea',
  'Parihaka',
  'Paritu_Ridge',
  'Paritu_West',
  'Patoka_Rangiora',
  'Pa_Valley',
  'Pegasus_Bay',
  'Pihama',
  'Pikikiruna',
  'Pikikiruna_Offshore',
  'Pisa',
  'Pohangina',
  'Point_Gibson',
  'Pokeno',
  'Pongaroa_Weber',
  'Porangahau_Basin',
  'Porangahau_Northeast',
  'Porangahau_Ridge',
  'Poroutawhao',
  'Porters_Pass',
  'PorWest2_PaoanuiRSouth',
  'Potts_Range',
  'Potts_River',
  'Poulter',
  'Poutu',
  'Poverty_Bay',
  'Puke_Knoll',
  'Pukekohe',
  'Puke_Ridge',
  'Pukeroro_2',
  'Pukeroro_Ridge',
  'Pukerua_Shepherds_Gully_1',
  'Pukerua_Shepherds_Gully_2',
  'Pukerua_Shepherds_Gully_3',
  'Puketerata',
  'Puketerata_North',
  'Pylap',
  'Quartz_Creek',
  'Queen_Charlotte',
  'Raggedy_Blackstone',
  'Rahotu',
  'Rakaia',
  'Ranfurly',
  'Rangefront',
  'Rangipo_Central',
  'Rangipo_South',
  'Rangitaiki_1',
  'Rangitaiki_2',
  'Rangitikei_Offshore_1',
  'Rapuwai',
  'Raukumara_16',
  'Raukumara_17',
  'Raukumara_18',
  'Raukumara_20',
  'Raukumara_21',
  'Raukumara_24',
  'Raukumara_25',
  'Raukumara_9',
  'Rauoterangi',
  'Redcliffe',
  'Repongaere',
  'Ridge_Road_Okaia_2',
  'Ritchie_Ridge',
  'Ritchie_Ridge_1',
  'Ritchie_West_1',
  'Riversdale',
  'Riversdale_North',
  'Riwha',
  'Roaring_Lion',
  'Roaring_Meg',
  'Rock_Garden_Ritchie_East',
  'Rock_Garden_Ritchie_East_1',
  'Rock_Garden_South_east',
  'Rocks_Creek',
  'Ruahine_Central',
  'Ruahine_North',
  'Ruahine_South',
  'Ruataniwha',
  'Ruatoria',
  'Ruatoria_South_1',
  'Ruatoria_South_2',
  'Ruatoria_South_3',
  'Ruatoria_South_4',
  'Ruby_Bay_Moutere',
  'Sailor',
  'Saunders_Road',
  'Settlement',
  'Shepherds_Gully_Mana',
  'Shingle_Peak',
  'Skippers',
  'Sliver_Stream_Merton',
  'Snares',
  'Snowgrass',
  'Solander',
  'South_Wedge_1',
  'South_Wedge_2',
  'South_Wedge_3_6_10',
  'South_Wedge_5',
  'Spey_Mica_Burn',
  'Springbank',
  'Spylaw',
  'Starvation_Ashley',
  'StoneJug',
  'Stonewall',
  'Straight_Creek',
  'St_Stephens',
  'Sugarloaf',
  'Surville',
  'Takapu',
  'Taonui',
  'Tauranga_Trough_East_2',
  'Tauranga_Trough_West_2',
  'Tauru',
  'Te_Anau',
  'Te_Arawa_1',
  'Te_Arawa_2',
  'Te_Arawa_3',
  'Te_Heka',
  'Te_Ikaarongamai',
  'Te_Kapu_Bank',
  'Te_Kapu_Bank_East',
  'Te_Puninga',
  'Te_Rapa_1',
  'Te_Rapa_2',
  'Te_Tatua_o_Wairere',
  'Teviot',
  'Te_Whaiti_North',
  'Te_Whaiti_South',
  'The_Humps',
  'The_Wolds',
  'Timaru_Creek',
  'Tin_Hut',
  'Tirohanga',
  'Titri_Central',
  'Titri_North',
  'Titri_South',
  'Tokata',
  'Tokomaru',
  'Torlesse',
  'Totara_Saddle',
  'Tuaheni_Ridge',
  'Tuakana_6',
  'Tuakana_7',
  'Tuapeka',
  'Tuatoru_1',
  'Tuatoru_2',
  'Tukituki_Thrust',
  'Turi_Central',
  'Turi_North',
  'Turi_South',
  'Turnagain',
  'Tutaki',
  'Two_Thumb_Stream',
  'Upper_Kowhai_Manakau',
  'Upper_Slope',
  'Uruti_Basin',
  'Uruti_Basin_2',
  'Uruti_East_PorWest_1',
  'Uruti_North',
  'Uruti_Point',
  'Uruti_Ridge_2',
  'Veil_Stream',
  'Vernon_1',
  'Vernon_2',
  'Vernon_3',
  'Vernon_4',
  'Virginia',
  'Volkner_3',
  'Volkner_4',
  'Waewaepa',
  'Waihemo',
  'Waihi_South',
  'Waihi_West',
  'Waihopai',
  'Waikaia',
  'Waikaka',
  'Waikuku',
  'Waimana_North',
  'Waimana_South',
  'Waimanawa_Waikaremoana',
  'Waimarama_1_2',
  'Waimarama_3_4',
  'Waimate',
  'Waimea_Offshore',
  'Waiohau_North',
  'Waiohau_South',
  'Waiotahi_North',
  'Waiotahi_South',
  'Waipiata',
  'Waipukaka',
  'Waipukurau_Poukawa',
  'Waipuna',
  'Wairarapa_1',
  'Wairarapa_2',
  'Wairarapa_3',
  'Wairarapa_Needles',
  'Wairata',
  'Wairau',
  'Wairau_2',
  'Wairau_3',
  'Wairoa_North',
  'Waitaha',
  'Waitahuna_1',
  'Waitahuna_2',
  'Waitaki',
  'Waitangi',
  'Waitawhiti',
  'Waitotara_10_11',
  'Waitotara_8_9',
  'Wakamarama',
  'Wakamarama_Offshore',
  'Wakarara',
  'Wanaka',
  'Warea',
  'Waverley_Okaia_1',
  'Wellington_Hutt_Valley_1',
  'Wellington_Hutt_Valley_2',
  'Wellington_Hutt_Valley_3',
  'Wellington_Hutt_Valley_4',
  'Wellington_Hutt_Valley_5',
  'Wellington_Pahiatua',
  'Wellington_Tararua_1',
  'Wellington_Tararua_2',
  'Wellington_Tararua_3',
  'Wendon_Valley',
  'West_Balleny',
  'West_Wakatipu',
  'Whaiti_Ridge',
  'Whakaari_4',
  'Whakatane_North',
  'Whakatane_South',
  'Whangamata_West',
  'Whangamoa',
  'Wharanui',
  'Whareama_Bank',
  'Wharekauhau',
  'Wheao_North',
  'Wheao_South',
  'Whenuakura',
  'White_Creek',
  'White_Creek_buried',
  'White_Hill',
  'White_Island_1',
  'White_Island_2',
  'Whitemans_Valley',
  'Woodville',
];
