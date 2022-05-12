/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, Dispatch, SetStateAction, useCallback, useContext } from 'react';
import {
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/styles';
import { GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { AxiosError } from 'axios';

import SelectControl from '../common/SelectControl';
import { solvisApiService } from '../../service/api';
import SolutionAnalysisTable from './SolutionAnalysisTable';
import RangeSliderWithInputs from '../common/RangeSliderWithInputs';
import {
  nz_centre,
  zoom,
  provider_url,
  solutionRuptureMapLocationOptions,
  solutionRuptureMapRadiiOptions,
} from '../../constants/solutionRuptureMap';
import LocalStorageContext from '../../contexts/localStorage';

const StyledAccordion = styled(Accordion)({
  borderRadius: '1px',
});

const StyledAccordionSummary = styled(AccordionSummary)({
  border: '1px solid #DBDBDB',
  borderRadius: '1px',
});

const StyledAccordionDetails = styled(AccordionDetails)({
  alignItems: 'center',
  justifyContent: 'center',
});

const ControlsBar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
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
  const {
    localStorageRuptureMapLocation,
    setLocalStorageRuptureMapLocation,
    localStorageRuptureMapRadii,
    setLocalStorageRuptureMapRadii,
    localStorageRuptureMapMagRange,
    setLocalStorageRuptureMapMagRange,
    localStorageRuptureMapRateRange,
    setLocalStorageRuptureMapRateRange,
  } = useContext(LocalStorageContext);

  const [locationIDs, setLocationIDs] = useState<string[]>([]);

  const [rupturesData, setRupturesData] = useState<GeoJsonObject>();
  const [locationsData, setLocationsData] = useState<GeoJsonObject>();
  const [tableData, setTableData] = useState<string | null>(null);

  const [showLocation, setShowLocation] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [disableFetch, setDisableFetch] = useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState('');

  const radiiInKm = useCallback(() => {
    return localStorageRuptureMapRadii === '100km'
      ? localStorageRuptureMapRadii.slice(0, 3)
      : localStorageRuptureMapRadii.slice(0, 2);
  }, [localStorageRuptureMapRadii]);

  const getGeoJson = useCallback(() => {
    setShowLoading(true);
    const locationSelectionsString = locationIDs.join('%2C');
    solvisApiService
      .getSolutionAnalysis(
        id,
        locationSelectionsString,
        radiiInKm(),
        localStorageRuptureMapMagRange,
        localStorageRuptureMapRateRange,
      )
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
  }, [setShowLoading, locationIDs, id, radiiInKm, localStorageRuptureMapMagRange, localStorageRuptureMapRateRange]);

  useEffect(() => {
    getGeoJson();
  }, [getGeoJson]);

  useEffect(() => {
    setDisableFetch(false);
  }, [
    localStorageRuptureMapLocation,
    localStorageRuptureMapRadii,
    localStorageRuptureMapMagRange,
    localStorageRuptureMapRateRange,
  ]);

  const getOptions = (): string[] => {
    const locations: string[] = [];
    solutionRuptureMapLocationOptions.map((locationOption) => {
      locations.push(locationOption.name);
    });
    locations.sort();
    return locations;
  };

  const radiiFormatted = solutionRuptureMapRadiiOptions.radii.map((radius: number) => `${radius / 1000}km`);

  const rateLabelFormat = (value: number): string => {
    return `1e${value}`;
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowLocation(event.target.checked);
  };

  useEffect(() => {
    const filteredLocations = solutionRuptureMapLocationOptions.filter((location) =>
      localStorageRuptureMapLocation.includes(location.name),
    );
    const filteredLocationIDs: string[] = [];
    filteredLocations.map((location) => {
      filteredLocationIDs.push(location.id);
    });
    setLocationIDs(filteredLocationIDs);
  }, [localStorageRuptureMapLocation]);

  return (
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <StyledAccordion defaultExpanded={true}>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            <strong>Locations:</strong>{' '}
            {localStorageRuptureMapLocation.length > 0 ? localStorageRuptureMapLocation.join(', ') : 'None'}{' '}
            <strong>Radii: </strong>
            {localStorageRuptureMapRadii || 'None'} <strong>Mag Range:</strong> {localStorageRuptureMapMagRange[0]} -{' '}
            {localStorageRuptureMapMagRange[1]} <strong>Rate Range:</strong>{' '}
            {`1e${localStorageRuptureMapRateRange[0]} - 1e${localStorageRuptureMapRateRange[1]}`}
          </Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <ControlsBar>
            <Autocomplete
              multiple
              value={localStorageRuptureMapLocation}
              onChange={(event: any, newValue: string[] | null) => {
                setLocalStorageRuptureMapLocation(newValue as string[]);
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
            <SelectControl name="Radius" options={radiiFormatted} setOptions={setLocalStorageRuptureMapRadii} />
            <FormControlLabel control={<Switch defaultChecked onChange={handleSwitchChange} />} label="Show Location" />
            {showLoading ? (
              <CircularProgress />
            ) : (
              <Button variant="outlined" onClick={getGeoJson} disabled={disableFetch}>
                Fetch
              </Button>
            )}
          </ControlsBar>
          <ControlsBar>
            <RangeSliderWithInputs
              label="Magtitude Range"
              inputProps={{ step: 0.1, min: 5, max: 10, type: 'number' }}
              valuesRange={localStorageRuptureMapMagRange}
              setValues={setLocalStorageRuptureMapMagRange}
            />
            <RangeSliderWithInputs
              label="Rate Range"
              inputProps={{ step: 1, min: -20, max: 0, type: 'number' }}
              valuesRange={localStorageRuptureMapRateRange}
              setValues={setLocalStorageRuptureMapRateRange}
              valueLabelFormat={rateLabelFormat}
            />
          </ControlsBar>
        </StyledAccordionDetails>
      </StyledAccordion>
      <MapContainer center={nz_centre} zoom={zoom} scrollWheelZoom={true} style={{ height: '700px' }}>
        <TileLayer url={provider_url} />
        {rupturesData && <GeoJSON key={Math.random()} data={rupturesData} style={myStyle} />}
        {showLocation && locationsData && <GeoJSON key={Math.random()} data={locationsData} style={myStyle} />}
      </MapContainer>
      <ControlsBar>
        <Button style={{ padding: 10, margin: 10 }} variant="contained" onClick={() => setShowTable((v) => !v)}>
          {showTable && rupturesData ? 'Hide Table' : 'Show Table'}
        </Button>
      </ControlsBar>
      {showTable && rupturesData && <SolutionAnalysisTable data={tableData} id={id} />}
    </>
  );
};

export default SolutionAnalysisTab;
