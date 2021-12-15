import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import React from 'react';
import { Typography, Box, Card, FormControl, MenuItem, Select, Slider } from '@mui/material';
import { GeoJsonObject } from 'geojson';
import sampleData from '../constants/sampleGeojsonData1.json';

const geoJsonData = sampleData as GeoJsonObject;

const HazardMapPreview2: React.FC = () => {
  const nz_centre: LatLngExpression = [-40.946, 174.167];
  const zoom = 5;
  const [prob, setProb] = React.useState<number>(0.02);
  const [mag, setMag] = React.useState<number>(5);

  const provider_url = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';
  const provider_attibution =
    'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri';

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
          <TileLayer attribution={provider_attibution} url={provider_url} />
          <GeoJSON data={geoJsonData} />
        </Map>
      </Card>
    </Box>
  );
};

export default HazardMapPreview2;
