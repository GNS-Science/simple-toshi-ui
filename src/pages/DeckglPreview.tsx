import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StaticMap } from 'react-map-gl';
import { DeckGL } from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import axios, { AxiosResponse } from 'axios';

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
  const layers = [new LineLayer({ id: 'line-layer', data })];

  useEffect(() => {
    axios
      .get(`${solvisEndpoint}/locations/`, {
        headers: {
          'x-api-key': process.env.REACT_APP_SOLVIS_API_KEY as string,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        console.log(response);
      });

    axios
      .get(`${solvisEndpoint}/radii/`, {
        headers: {
          'x-api-key': process.env.REACT_APP_SOLVIS_API_KEY as string,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        console.log('radii', response);
      });
  });

  return (
    <DeckGL layers={layers} initialViewState={INITIAL_VIEW_STATE} controller={true}>
      <StaticMap
        mapboxApiAccessToken={
          'pk.eyJ1IjoicWlhbnllbGluIiwiYSI6ImNreTI0d2NlMzBoZ2UydW8wODV2am11bnEifQ.0P_4i0jBNdI7mtEydiQEkg'
        }
      />
    </DeckGL>
  );
};

export default DeckglPreview;
