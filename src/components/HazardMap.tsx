import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import React from 'react';
import { Typography, Box, Card } from '@material-ui/core';

const HazardMap: React.FC = () => {
  // Default coordinates set to Masterton station
  const nz_centre: LatLngExpression = [-40.946, 174.167];
  // const position: LatLngExpression = [-40.946, 175.667]; //Masterton
  const zoom = 5;

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

  return (
    <>
      <Box>
        <Card>
          <Typography variant="h5" gutterBottom>
            Hazard Map
          </Typography>
          <MapContainer center={nz_centre} zoom={zoom} scrollWheelZoom={false} style={{ height: '700px' }}>
            <TileLayer attribution={provider_attibution} url={provider_url} />
            {/*<Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>*/}
          </MapContainer>
        </Card>
      </Box>
    </>
  );
};

export default HazardMap;
