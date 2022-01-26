/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, Slider, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { LatLngExpression } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import axios from 'axios';

import { LocationData } from '../../interfaces/inversionSolutions';
import SelectControl from '../common/SelectControl';
import MultiSelect from '../common/MultiSelect';

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

const SliderContainer = styled('div')({
  width: '50%',
  padding: 30,
});

const myStyle = {
  color: '#000000',
  weight: 1,
  opacity: 0.65,
};

interface SolutionAnalysisTabProps {
  id: string;
}

const SolutionAanalysisTab: React.FC<SolutionAnalysisTabProps> = ({ id }: SolutionAnalysisTabProps) => {
  const solvisEndpoint = process.env.REACT_APP_SOLVIS_ENDPOINT as string;
  const nz_centre: LatLngExpression = [-40.946, 174.167];
  const zoom = 5;
  const provider_url = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';

  const [locationOptions, setLocationOptions] = useState<LocationData[]>([]);
  const [locationSelections, setLocationSelections] = useState<string[]>([]);
  const [locationIDs, setLocationIDs] = useState<string[]>([]);

  const [radiiOptions, setRadiiOptions] = useState<string[]>([]);
  const [radiiSelection, setRadiiSelection] = useState<string>('');

  const [geojsonData, setGeoJsonData] = useState<GeoJsonObject>();

  const [magRange, setMagRange] = useState<number[]>([5, 10]);
  const [rateRange, setRateRange] = useState<number[]>([-20, 0]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        `${solvisEndpoint}/solution_analysis/${id}/loc/${locationSelectionsString}/rad/${radiiInKm}?max_mag=${magRange[1]}&min_mag=${magRange[0]}&max_rate=1e${rateRange[1]}&min_rate=1e${rateRange[0]}`,
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

  const handleMagRangeChange = (event: Event, newValue: number | number[]) => {
    setMagRange(newValue as number[]);
  };

  const handleRateRangeChange = (event: Event, newValue: number | number[]) => {
    setRateRange(newValue as number[]);
  };

  const rateLabelFormat = (value: number): string => {
    return `1e${value}`;
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
          <SliderContainer>
            <Slider
              value={magRange}
              onChange={handleMagRangeChange}
              valueLabelDisplay="auto"
              min={5}
              max={10}
              step={0.1}
            />
          </SliderContainer>
          <SliderContainer>
            <Slider
              value={rateRange}
              onChange={handleRateRangeChange}
              valueLabelFormat={rateLabelFormat}
              valueLabelDisplay="auto"
              min={-20}
              max={0}
              step={1}
            />
          </SliderContainer>
        </ControlsBar>
        <Typography sx={{ padding: '10px' }}>
          Locations: {locationSelections.join(', ')}, Mag Range: {magRange[0]} - {magRange[1]}, Rate Range:{' '}
          {`1e${rateRange[0]} to 1e${rateRange[1]}`}
        </Typography>
      </FloatingCard>
      <MapContainer center={nz_centre} zoom={zoom} scrollWheelZoom={true} style={{ height: '700px' }}>
        <TileLayer url={provider_url} />
        {geojsonData && <GeoJSON key={Math.random()} data={geojsonData} style={myStyle} />}
      </MapContainer>
    </>
  );
};

export default SolutionAanalysisTab;
