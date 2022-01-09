import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import React from 'react';
import { Typography, Box, Card } from '@mui/material';
import { GeoJsonObject } from 'geojson';
import sampleData from '../constants/sampleGeojsonData2.json';

const geoJsonData = sampleData as GeoJsonObject;

const myStyle = {
  color: '#000000',
  weight: 1,
  opacity: 0.65,
};

const HazardMapPreview1: React.FC = () => {
  const nz_centre: LatLngExpression = [-40.946, 174.167];
  const zoom = 5;

  const provider_url = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';
  const provider_attibution =
    'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri';

  return (
    <Box>
      <Card>
        <Typography variant="h5" gutterBottom>
          Hazard Map
        </Typography>
        <MapContainer center={nz_centre} zoom={zoom} scrollWheelZoom={false} style={{ height: '700px' }}>
          <TileLayer attribution={provider_attibution} url={provider_url} />
          <GeoJSON data={geoJsonData} style={myStyle} />
        </MapContainer>
      </Card>
    </Box>
  );
};

export default HazardMapPreview1;
