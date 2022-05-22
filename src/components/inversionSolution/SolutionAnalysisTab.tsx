/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';
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
import { nz_centre, zoom, provider_url } from '../../constants/solutionRuptureMap';
import {
  getLocationIdString,
  rateLabelFormat,
  getRadiiInKm,
  getLocationOptions,
  radiiOptions,
} from '../../service/solutionRuptureMap.service';

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
  const [rupturesData, setRupturesData] = useState<GeoJsonObject>();
  const [locationsData, setLocationsData] = useState<GeoJsonObject>();
  const [tableData, setTableData] = useState<string | null>(null);

  const [showLocation, setShowLocation] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [disableFetch, setDisableFetch] = useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState('');

  const [location, setLocation] = useState<string[]>([]);
  const [radii, setRadii] = useState<string>('10km');
  const [magRange, setMagRange] = useState<number[]>([5, 10]);
  const [rateRange, setRateRange] = useState<number[]>([-20, 0]);

  const getGeoJson = useCallback(() => {
    setShowLoading(true);
    solvisApiService
      .getSolutionAnalysis(id, getLocationIdString(location), getRadiiInKm(radii), magRange, rateRange)
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
  }, [setShowLoading, id, radii, location, magRange, rateRange]);

  useEffect(() => {
    if (location.length) getGeoJson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setDisableFetch(false);
  }, [location, radii, magRange, rateRange]);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowLocation(event.target.checked);
  };

  return (
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <StyledAccordion defaultExpanded={true}>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            <strong>Locations:</strong> {location.length > 0 ? location.join(', ') : 'None'} <strong>Radii: </strong>
            {radii || 'None'} <strong>Mag Range:</strong> {magRange[0]} - {magRange[1]} <strong>Rate Range:</strong>{' '}
            {`1e${rateRange[0]} - 1e${rateRange[1]}`}
          </Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <ControlsBar>
            <Autocomplete
              multiple
              value={location}
              onChange={(event: any, newValue: string[] | null) => {
                setLocation(newValue as string[]);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={getLocationOptions()}
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
            <SelectControl name="Radius" options={radiiOptions} setOptions={setRadii} />
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
        <Button style={{ padding: 10, margin: 10 }} variant="contained" onClick={() => setShowTable((v) => !v)}>
          {showTable && rupturesData ? 'Hide Table' : 'Show Table'}
        </Button>
      </ControlsBar>
      {showTable && rupturesData && <SolutionAnalysisTable data={tableData} id={id} />}
    </>
  );
};

export default SolutionAnalysisTab;
