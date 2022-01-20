import React, { useState, useEffect } from 'react';
import { StaticMap } from 'react-map-gl';
import { DeckGL } from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import axios from 'axios';
import SelectControl from '../components/common/SelectControl';
import { Button, Card } from '@mui/material';
import { styled } from '@mui/styles';

const FloatingCard = styled(Card)({
  zIndex: 100,
  position: 'absolute',
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

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 174.783333,
  latitude: -41.3,
  zoom: 5,
  pitch: 0,
  bearing: 0,
};
interface LocationData {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
}
const solvisEndpoint = process.env.REACT_APP_SOLVIS_ENDPOINT as string;
const data = [{ sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781] }];

const DeckglPreview: React.FC = () => {
  const [locationOptions, setLocationOptions] = useState<LocationData[]>([]);
  const [locationSelection, setLocationSelection] = useState<string>('');

  const [radiiOptions, setRadiiOptions] = useState<string[]>([]);
  const [radiiSelection, setRadiiSelection] = useState<string>('');

  const [geojsonData, setGeoJsonData] = useState<string>('');
  const layers = [new LineLayer({ id: 'line-layer', data })];

  useEffect(() => {
    console.log(geojsonData);
  }, [geojsonData]);

  useEffect(() => {
    const locationListID = process.env.REACT_APP_ANALYSIS_LOC_LIST_ID as string;
    const radiiID = process.env.REACT_APP_RADII_ID;

    // axios
    //   .get(`${solvisEndpoint}/solution_analysis/3faedbd7-2d01-48ff-8042-a9eebd127a15`, {
    //     headers: {
    //       'x-api-key': process.env.REACT_APP_SOLVIS_API_KEY as string,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     setGeoJsonData(response.data.dataframe);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    axios
      .get(`${solvisEndpoint}/location_lists/${locationListID}/locations`, {
        headers: {
          'x-api-key': process.env.REACT_APP_SOLVIS_API_KEY as string,
        },
      })
      .then((response) => {
        setLocationOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${solvisEndpoint}/radii/${radiiID}`, {
        headers: {
          'x-api-key': process.env.REACT_APP_SOLVIS_API_KEY as string,
        },
      })
      .then((response) => {
        setRadiiOptions(response.data.radii);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getOptions = (): string[] => {
    const locations: string[] = [];
    locationOptions.map((locationOption) => {
      locations.push(locationOption.name);
    });
    return locations;
  };

  return (
    <>
      <FloatingCard>
        <ControlsBar>
          <SelectControl name="Location" options={getOptions()} setOptions={setLocationSelection} />
          <SelectControl name="Radii" options={radiiOptions} setOptions={setRadiiSelection} />
          <Button variant="outlined">Fetch</Button>
        </ControlsBar>
      </FloatingCard>
      <DeckGL layers={layers} initialViewState={INITIAL_VIEW_STATE} controller={true}>
        <StaticMap
          mapboxApiAccessToken={
            'pk.eyJ1IjoicWlhbnllbGluIiwiYSI6ImNreTI0d2NlMzBoZ2UydW8wODV2am11bnEifQ.0P_4i0jBNdI7mtEydiQEkg'
          }
        />
      </DeckGL>
    </>
  );
};

export default DeckglPreview;
