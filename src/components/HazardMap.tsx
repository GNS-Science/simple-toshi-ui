import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import React from 'react';
import { Typography, Box, Card, FormControl, MenuItem, Select, Slider } from '@mui/material';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import sampleData from '../constants/sampleGeojsonData1.json';
import { GeoJsonObject } from 'geojson';

const geoJsonData = sampleData as GeoJsonObject;

const generateHazardData = () => {
  let i;
  const data: number[][] = [];
  for (i = 0; i < 250; i++) {
    data.push([
      0.02,
      5,
      Math.random() * (-39 - -40) + -40,
      Math.random() * (176 - 174) + 174,
      Math.random() * (1 - 0.9) + 0.9,
    ]);
  }
  for (i = 0; i < 250; i++) {
    data.push([
      0.02,
      7,
      Math.random() * (-39 - -40) + -40,
      Math.random() * (178 - 175) + 175,
      Math.random() * (0.2 - 0.1) + 0.1,
    ]);
  }
  for (i = 0; i < 250; i++) {
    data.push([
      0.02,
      8,
      Math.random() * (-39 - -40) + -40,
      Math.random() * (178 - 175) + 175,
      Math.random() * (1 - 0.8) + 0.8,
    ]);
  }
  for (i = 0; i < 250; i++) {
    data.push([
      0.1,
      6,
      Math.random() * (-39 - -40) + -40,
      Math.random() * (178 - 175) + 175,
      Math.random() * (1 - 0.8) + 0.8,
    ]);
  }
  for (i = 0; i < 250; i++) {
    data.push([
      0.1,
      9,
      Math.random() * (-39 - -40) + -40,
      Math.random() * (178 - 175) + 175,
      Math.random() * (1 - 0.8) + 0.8,
    ]);
  }
  return data;
};

const HazardMap: React.FC = () => {
  // Default coordinates set to Masterton station
  const nz_centre: LatLngExpression = [-40.946, 174.167];
  // const position: LatLngExpression = [-40.946, 175.667]; //Masterton
  const zoom = 5;
  const [prob, setProb] = React.useState<number>(0.02);
  const [mag, setMag] = React.useState<number>(5);
  const [rows, setRows] = React.useState<number[][]>([]);

  //L.tileLayer.provider('Esri.DeLorme').;

  // var Stadia_Outdoors = L.tileLayer(
  //   'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
  //   maxZoom: 20,
  //   attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  // });
  // var Esri_OceanBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
  //   attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
  //   maxZoom: 13
  // });

  // const provider_url = 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png';
  // const provider_attibution =
  //   '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

  const provider_url = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';
  const provider_attibution =
    'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri';

  React.useEffect(() => {
    setRows(generateHazardData());
  }, []);
  const filteredRows = rows?.filter((row) => row && row[0] === prob && row[1] >= mag);

  return (
    <Box>
      <Box style={{ display: 'flex' }}>
        <FormControl style={{ flexWrap: 'wrap', margin: '16px' }} variant="standard">
          <Typography>Probability</Typography>
          <Select value={prob} onChange={(e) => setProb(e.target.value as number)} variant="standard">
            <MenuItem value={0.02}>2%</MenuItem>
            <MenuItem value={0.1}>10%</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ flexWrap: 'wrap', flexGrow: 1, margin: '16px' }} variant="standard">
          <Typography>Magnitude</Typography>
          <Slider
            value={mag}
            step={0.1}
            min={5}
            max={9}
            marks={[
              { value: 5, label: '5.0' },
              { value: 9, label: '9.0' },
            ]}
            track="inverted"
            valueLabelDisplay="on"
            valueLabelFormat={(v) => v.toFixed(1)}
            onChange={(_e, v) => setMag(v as number)}
          />
        </FormControl>
      </Box>
      <Card>
        <Typography variant="h5" gutterBottom>
          Hazard Map
        </Typography>
        <Map center={nz_centre} zoom={zoom} scrollWheelZoom={false} style={{ height: '700px' }}>
          {/* <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={filteredRows}
            longitudeExtractor={(m: string) => m[3]}
            latitudeExtractor={(m: string) => m[2]}
            intensityExtractor={(m: string) => parseFloat(m[4])}
            maxZoom={10}
          /> */}
          <TileLayer attribution={provider_attibution} url={provider_url} />
          <GeoJSON data={geoJsonData} />
        </Map>
      </Card>
    </Box>
  );
};

export default HazardMap;
