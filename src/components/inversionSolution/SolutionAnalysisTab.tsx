/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';
import {
  Alert,
  Autocomplete,
  Button,
  Card,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import { LatLngExpression } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { AxiosError } from 'axios';

import { LocationData } from '../../interfaces/inversionSolutions';
import SelectControl from '../common/SelectControl';
import { solvisApiService } from '../../service/api';
import SolutionAnalysisTable from './SolutionAnalysisTable';
import RangeSliderWithInputs from '../common/RangeSliderWithInputs';

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

const myStyle = {
  color: '#000000',
  weight: 1,
  opacity: 0.65,
};
interface SolutionAnalysisTabProps {
  id: string;
  setDisableHotkey?: Dispatch<SetStateAction<boolean>>;
}

const SolutionAnalysisTab: React.FC<SolutionAnalysisTabProps> = ({
  id,
  setDisableHotkey,
}: SolutionAnalysisTabProps) => {
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
  const [showTable, setShowTable] = useState<boolean>(false);
  const [disableFetch, setDisableFetch] = useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState('');

  const radiiInKm = useCallback(() => {
    if (radiiSelection === '100km') {
      return radiiSelection.slice(0, 3);
    } else {
      return radiiSelection.slice(0, 2);
    }
  }, [radiiSelection]);

  const getGeoJsonCallback = useCallback(() => {
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
        setDisableFetch(true);
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
  }, [setShowLoading, locationIDs, id, magRange, radiiInKm, rateRange]);

  useEffect(() => {
    const filteredLocations = locationOptions.filter((location) => locationSelections.includes(location.name));
    const filteredLocationIDs: string[] = [];
    filteredLocations.map((location) => {
      filteredLocationIDs.push(location.id);
    });
    setLocationIDs(filteredLocationIDs);
  }, [locationOptions, locationSelections]);

  useEffect(() => {
    setDisableFetch(false);
  }, [locationSelections, radiiSelection, magRange, rateRange]);

  useEffect(() => {
    locationSelections.length && radiiSelection.length && getGeoJsonCallback();
  }, [getGeoJsonCallback, locationSelections, radiiSelection, id]);

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
          <Autocomplete
            multiple
            value={locationSelections}
            onChange={(event: any, newValue: string[] | null) => {
              setLocationSelections(newValue as string[]);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={getOptions()}
            style={{ width: 500, marginLeft: 16 }}
            renderInput={(params) => <TextField {...params} label="Locations" variant="standard" />}
            blurOnSelect={true}
            onFocus={() => {
              setDisableHotkey && setDisableHotkey(true);
            }}
            onBlur={() => {
              setDisableHotkey && setDisableHotkey(false);
            }}
            limitTags={1}
          />
          <SelectControl name="Radius" options={radiiOptions} setOptions={setRadiiSelection} />
          <FormControlLabel control={<Switch defaultChecked onChange={handleSwitchChange} />} label="Show Location" />
          {showLoading ? (
            <CircularProgress />
          ) : (
            <Button variant="outlined" onClick={getGeoJsonCallback} disabled={disableFetch}>
              Fetch
            </Button>
          )}
        </ControlsBar>
        <ControlsBar>
          <RangeSliderWithInputs
            label="Magtitude Range"
            inputProps={{ step: 0.1, min: 5, max: 10, type: 'number' }}
            valuesRange={magRange}
            setValues={setMagRange}
          />
          <RangeSliderWithInputs
            label="Rate Range"
            inputProps={{ step: 1, min: -20, max: 0, type: 'number' }}
            valuesRange={rateRange}
            setValues={setRateRange}
            valueLabelFormat={rateLabelFormat}
          />
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
        <Button variant="contained" onClick={() => setShowTable((v) => !v)}>
          {showTable && rupturesData ? 'Hide Table' : 'Show Table'}
        </Button>
      </ControlsBar>
      {showTable && rupturesData && <SolutionAnalysisTable data={tableData} id={id} />}
    </>
  );
};

export default SolutionAnalysisTab;
