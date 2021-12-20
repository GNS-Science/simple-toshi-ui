import React, { useState, useEffect } from 'react';
import { LatLngExpression, LeafletEventHandlerFnMap, LatLng, icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON, Tooltip, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Typography, Box, Card } from '@mui/material';
import { GeoJsonObject } from 'geojson';
import sampleData from '../constants/sampleGeojsonData1.json';

const geoJsonData = sampleData as GeoJsonObject;

const HazardMapPreview2: React.FC = () => {
  const nz_centre: LatLngExpression = [-40.946, 174.167];
  const zoom = 5;
  const [showMarker, setShowMarker] = useState<boolean>(false);
  const [position, setPosition] = useState<LatLng | null>(null);

  const provider_url = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';
  const provider_attibution =
    'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri';

  const pinIcon = icon({
    iconUrl: '/map-pin.png',
    iconSize: [38, 60],
    shadowSize: [50, 64],
    iconAnchor: [16, 60],
    popupAnchor: [4, -60],
  });

  useEffect(() => {
    setShowMarker(true);
  }, [position]);

  return (
    <Box>
      <Card>
        <Typography variant="h5" gutterBottom>
          Hazard Map
        </Typography>
        <MapContainer center={nz_centre} zoom={zoom} scrollWheelZoom={false} style={{ height: '700px' }}>
          <TileLayer attribution={provider_attibution} url={provider_url} />
          <GeoJSON
            data={geoJsonData}
            style={(feature) => {
              return { color: feature?.properties.stroke, weight: feature?.properties['stroke-width'] };
            }}
            eventHandlers={{
              click: (e) => {
                setPosition(e.latlng);
              },
            }}
          ></GeoJSON>
          {showMarker && position && (
            <>
              <Marker position={position} icon={pinIcon}>
                <Popup>{`Position Latlng ${position.toString()}`}</Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </Card>
    </Box>
  );
};

export default HazardMapPreview2;
