/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
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

const StyledAccordion = styled(Accordion)({
  padding: 20,
  disply: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledAccordionDetails = styled(AccordionDetails)({
  padding: 20,
  disply: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

  useEffect(() => {
    const filteredLocations = locationOptions.filter((location) => locationSelections.includes(location.name));
    const filteredLocationIDs: string[] = [];
    filteredLocations.map((location) => {
      filteredLocationIDs.push(location.id);
    });
    setLocationIDs(filteredLocationIDs);
  }, [locationSelections]);

  useEffect(() => {
    setDisableFetch(false);
  }, [locationSelections, radiiSelection, magRange, rateRange]);

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
      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography sx={{ padding: '10px' }}>
            {' '}
            <strong>Locations:</strong> {locationSelections.length > 0 ? locationSelections.join(', ') : 'None'}{' '}
            <strong>Radii: </strong>
            {radiiSelection || 'None'} <strong>Mag Range:</strong> {magRange[0]} - {magRange[1]}{' '}
            <strong>Rate Range:</strong> {`1e${rateRange[0]} to 1e${rateRange[1]}`}
          </Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
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
              <Button variant="outlined" onClick={getGeoJson} disabled={disableFetch}>
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
        </StyledAccordionDetails>
      </StyledAccordion>
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
