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
});
// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};
const solvisEndpoint = process.env.REACT_APP_SOLVIS_ENDPOINT as string;
const data = [{ sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781] }];

const DeckglPreview: React.FC = () => {
  const [locationOptions, setLocationOptions] = useState<LocationData[]>([]);
  const [locationSelection, setLocationSelection] = useState<string>('');

  const [radiiOptions, setRadiiOptions] = useState<string[]>([]);
  const [radiiSelection, setRadiiSelection] = useState<string>('');
  const layers = [new LineLayer({ id: 'line-layer', data })];
  interface LocationData {
    id: string;
    latitude: number;
    longitude: number;
    name: string;
    population: number;
  }

  interface RadiiData {
    id: string;
    radii: string[];
  }

  useEffect(() => {
    axios
      .get(`${solvisEndpoint}/locations/`, {
        headers: {
          'x-api-key': process.env.REACT_APP_SOLVIS_API_KEY as string,
        },
      })
      .then((response) => {
        return setLocationOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${solvisEndpoint}/radii/`, {
        headers: {
          'x-api-key': process.env.REACT_APP_SOLVIS_API_KEY as string,
        },
      })
      .then((response) => {
        const radiiOptions: string[] = [];
        response.data.map((radiiObject: RadiiData) => {
          const radiiString = radiiObject.radii.join(',');
          radiiOptions.push(radiiString);
        });
        setRadiiOptions(radiiOptions);
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
        <div>
          <SelectControl name="Location" options={getOptions()} setOptions={setLocationSelection} />
          <SelectControl name="Radii" options={radiiOptions} setOptions={setRadiiSelection} />
          <Button variant="outlined">Fetch</Button>
          <p>
            current Select: {locationSelection}, {radiiSelection}
          </p>
        </div>
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
