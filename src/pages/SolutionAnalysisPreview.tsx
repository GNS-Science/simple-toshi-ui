import React, { useState, useEffect } from 'react';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import axios from 'axios';
import SelectControl from '../components/common/SelectControl';
import { Alert, Button, Card, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import MultiSelect from '../components/common/MultiSelect';
import { GeoJsonObject } from 'geojson';

const FloatingCard = styled(Card)({
  zIndex: 401,
  padding: 20,
  disply: 'flex',
  justifyContent: 'center',
  left: '3%',
  top: '10%',
});

const ControlsBar = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const myStyle = {
  color: '#000000',
  weight: 1,
  opacity: 0.65,
};
interface LocationData {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
}
const solvisEndpoint = process.env.REACT_APP_SOLVIS_ENDPOINT as string;

const SolutionAnalysisPreview: React.FC = () => {
  const [locationOptions, setLocationOptions] = useState<LocationData[]>([]);
  const [locationSelections, setLocationSelections] = useState<string[]>([]);
  const [locationIDs, setLocationIDs] = useState<string[]>([]);

  const [radiiOptions, setRadiiOptions] = useState<string[]>([]);
  const [radiiSelection, setRadiiSelection] = useState<string>('');

  const [geojsonData, setGeoJsonData] = useState<GeoJsonObject>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const nz_centre: LatLngExpression = [-40.946, 174.167];
  const zoom = 5;

  const provider_url = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';

  useEffect(() => {
    const filteredLocations = locationOptions.filter((location) => locationSelections.includes(location.name));
    const filteredLocationIDs: string[] = [];
    filteredLocations.map((location) => {
      filteredLocationIDs.push(location.id);
    });
    setLocationIDs(filteredLocationIDs);
  }, [locationSelections]);

  useEffect(() => {
    const locationListID = process.env.REACT_APP_ANALYSIS_LOC_LIST_ID as string;
    const radiiID = process.env.REACT_APP_RADII_ID;

    axios
      .get(`${solvisEndpoint}/location_lists/${locationListID}/locations`, {
        headers: {
          'x-api-key': process.env.REACT_APP_SOLVIS_API_KEY as string,
        },
      })
      .then((response: any) => {
        setLocationOptions(response.data);
      })
      .catch((error: unknown) => {
        console.error(error);
      });

    axios
      .get(`${solvisEndpoint}/radii/${radiiID}`, {
        headers: {
          'x-api-key': process.env.REACT_APP_SOLVIS_API_KEY as string,
        },
      })
      .then((response: any) => {
        const radii = response.data.radii;
        const radiiFormatted = radii.map((radius: number) => `${radius / 1000}km`);
        setRadiiOptions(radiiFormatted);
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  }, []);

  const getOptions = (): string[] => {
    const locations: string[] = [];
    locationOptions.map((locationOption) => {
      locations.push(locationOption.name);
    });
    locations.sort();
    return locations;
  };
  const getGeoJson = (): void => {
    const locationSelectionsString = locationIDs.join('%2C');
    const radiiInKm = radiiSelection.slice(0, 2);

    axios
      .get(
        `${solvisEndpoint}/solution_analysis/SW52ZXJzaW9uU29sdXRpb246MTk4MzcuMGZraHVq/loc/${locationSelectionsString}/rad/${radiiInKm}`,
        {
          headers: {
            'x-api-key': process.env.REACT_APP_SOLVIS_API_KEY as string,
          },
        },
      )
      .then((response: any) => {
        if (response.data.error_message) {
          setErrorMessage(response.data.error_message);
        } else {
          setErrorMessage(null);
          const geoJsonData = JSON.parse(response.data.ruptures) as GeoJsonObject;
          setGeoJsonData(geoJsonData);
        }
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  };

  return (
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <FloatingCard>
        <ControlsBar>
          <MultiSelect
            options={getOptions()}
            selected={locationSelections}
            setOptions={setLocationSelections}
            name="Location"
          />
          <SelectControl name="Radius" options={radiiOptions} setOptions={setRadiiSelection} />
          <Button variant="outlined" onClick={getGeoJson}>
            Fetch
          </Button>
          <Typography sx={{ padding: '10px' }}>Locations: {locationSelections.join(', ')}</Typography>
        </ControlsBar>
      </FloatingCard>
      <MapContainer center={nz_centre} zoom={zoom} scrollWheelZoom={true} style={{ height: '700px' }}>
        <TileLayer url={provider_url} />
        {geojsonData && <GeoJSON key={Math.random()} data={geojsonData} style={myStyle} />}
      </MapContainer>
    </>
  );
};

export default SolutionAnalysisPreview;
