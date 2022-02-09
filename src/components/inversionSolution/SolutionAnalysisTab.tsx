/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, CircularProgress, FormControlLabel, Slider, Switch, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { LatLngExpression } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

import { LocationData } from '../../interfaces/inversionSolutions';
import SelectControl from '../common/SelectControl';
import MultiSelect from '../common/MultiSelect';
import { solvisApiService } from '../../service/api';
import { AxiosError } from 'axios';
import SolutionAnalysisTable from './SolutionAnalysisTable';

const FloatingCard = styled(Card)({
  zIndex: 401,
  padding: 20,
  disply: 'flex',
  justifyContent: 'center',
  left: '3%',
  top: '10%',
});

const ControlsBar = styled('div')({
  paddingTop: 10,
  paddingBottom: 10,
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

const SolutionAnalysisTab: React.FC<SolutionAnalysisTabProps> = ({ id }: SolutionAnalysisTabProps) => {
  const nz_centre: LatLngExpression = [-40.946, 174.167];
  const zoom = 5;
  const provider_url = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';

  const [locationOptions, setLocationOptions] = useState<LocationData[]>([]);
  const [locationSelections, setLocationSelections] = useState<string[]>([]);
  const [locationIDs, setLocationIDs] = useState<string[]>([]);

  const [radiiOptions, setRadiiOptions] = useState<string[]>([]);
  const [radiiSelection, setRadiiSelection] = useState<string>('');

  const [rupturesData, setRupturesData] = useState<GeoJsonObject>();
  const [locationsData, setLocationsData] = useState<GeoJsonObject>();
  const [tableData, setTableData] = useState<string | null>(null);

  const [magRange, setMagRange] = useState<number[]>([5, 10]);
  const [rateRange, setRateRange] = useState<number[]>([-20, 0]);

  const [showLocation, setShowLocation] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    const filteredLocations = locationOptions.filter((location) => locationSelections.includes(location.name));
    const filteredLocationIDs: string[] = [];
    filteredLocations.map((location) => {
      filteredLocationIDs.push(location.id);
    });
    setLocationIDs(filteredLocationIDs);
  }, [locationSelections]);

  useEffect(() => {
    locationSelections.length && radiiSelection.length && getGeoJson();
  }, [id]);

  useEffect(() => {
    solvisApiService.getLocationList().then((response) => {
      setLocationOptions(response.data);
    });

    solvisApiService.getRadiiList().then((response) => {
      const radii = response.data.radii;
      const radiiFormatted = radii.map((radius: number) => `${radius / 1000}km`);
      setRadiiOptions(radiiFormatted);
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

  const radiiInKm = () => {
    if (radiiSelection === '100km') {
      return radiiSelection.slice(0, 3);
    } else {
      return radiiSelection.slice(0, 2);
    }
  };

  const getGeoJson = (): void => {
    setShowLoading(true);
    const locationSelectionsString = locationIDs.join('%2C');
    solvisApiService
      .getSolutionAnalysis(id, locationSelectionsString, radiiInKm(), magRange, rateRange)
      .then((response) => {
        setShowLoading(false);
        setShowLoading(false);
        if (response.data.error_message) {
          setErrorMessage(response.data.error_message);
        } else {
          setErrorMessage(null);
        }
        setTableData(response.data.ruptures);
        setRupturesData(JSON.parse(response.data.ruptures) as GeoJsonObject);
        setLocationsData(JSON.parse(response.data.locations) as GeoJsonObject);
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          setErrorMessage(`Error: ${error.response.status} ${error.response.data.message}`);
        } else if (error.request) {
          setErrorMessage(`Error: request failed`);
        } else {
          setErrorMessage(`Error: ${error.message}`);
        }
        setShowLoading(false);
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

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowLocation(event.target.checked);
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
          <div>
            {showLoading ? (
              <CircularProgress />
            ) : (
              <Button variant="outlined" onClick={getGeoJson}>
                Fetch
              </Button>
            )}
          </div>
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
          <FormControlLabel control={<Switch defaultChecked onChange={handleSwitchChange} />} label="Show Location" />
        </ControlsBar>
        <Typography sx={{ padding: '10px' }}>
          Locations: {locationSelections.join(', ')}, Mag Range: {magRange[0]} - {magRange[1]}, Rate Range:{' '}
          {`1e${rateRange[0]} to 1e${rateRange[1]}`}
        </Typography>
      </FloatingCard>
      <MapContainer center={nz_centre} zoom={zoom} scrollWheelZoom={true} style={{ height: '700px' }}>
        <TileLayer url={provider_url} />
        {rupturesData && <GeoJSON key={Math.random()} data={rupturesData} style={myStyle} />}
        {showLocation && locationsData && <GeoJSON key={Math.random()} data={locationsData} style={myStyle} />}
      </MapContainer>
      <ControlsBar>
        <Button variant="contained">Show Table</Button>
      </ControlsBar>
      {rupturesData && <SolutionAnalysisTable data={tableData} />}
    </>
  );
};

export default SolutionAnalysisTab;
