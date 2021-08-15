import { Typography, Box, Card, Select, MenuItem, FormControl } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import React from 'react';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { InversionSolutionHazardTabQuery } from './__generated__/InversionSolutionHazardTabQuery.graphql';

export const inversionSolutionHazardTabQuery = graphql`
  query InversionSolutionHazardTabQuery($id: ID!) {
    node(id: $id) {
      ... on Table {
        name
        column_headers
        column_types
        rows
        meta {
          k
          v
        }
        dimensions {
          k
          v
        }
      }
    }
  }
`;

interface InversionSolutionHazardTabProps {
  queryRef: PreloadedQuery<InversionSolutionHazardTabQuery, Record<string, unknown>>;
}

const InversionSolutionHazardTab: React.FC<InversionSolutionHazardTabProps> = ({
  queryRef,
}: InversionSolutionHazardTabProps) => {
  const data = usePreloadedQuery<InversionSolutionHazardTabQuery>(inversionSolutionHazardTabQuery, queryRef);
  const iml_period_dim = data?.node?.dimensions?.find((f) => f?.k === 'iml_periods');
  const [prob, setProb] = React.useState<string>('0.02');
  const [dim, setDim] = React.useState<string>(iml_period_dim?.v ? iml_period_dim?.v[1] ?? '' : '');
  const rows = data?.node?.rows ?? [];
  const lon_idx = data?.node?.column_headers?.findIndex((f) => f === 'lon');
  const lat_idx = data?.node?.column_headers?.findIndex((f) => f === 'lat');
  const int_idx = data?.node?.column_headers?.findIndex((f) => f?.includes(prob));
  const dim_idx = data?.node?.column_headers?.findIndex((f) => f === 'iml_period');
  const filteredRows = rows?.filter((row) => row && dim_idx && dim === row[dim_idx]);

  // Default coordinates set to Masterton station
  const nz_centre: LatLngExpression = [-40.946, 174.167];
  const zoom = 5;

  const provider_url = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';
  const provider_attibution =
    'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri';
  return (
    <Box>
      <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <FormControl>
          <Typography style={{ fontWeight: 600 }}>Probability</Typography>
          <Select value={prob} onChange={(e) => setProb(e.target.value as string)}>
            <MenuItem value={'0.02'}>2%</MenuItem>
            <MenuItem value={'0.1'}>10%</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Typography style={{ fontWeight: 600 }}>iml_periods</Typography>
          <Select value={dim} onChange={(e) => setDim(e.target.value as string)}>
            {iml_period_dim?.v?.map((d) => {
              if (d) {
                return (
                  <MenuItem key={`${iml_period_dim?.k}-${d}`} value={d}>
                    {d}
                  </MenuItem>
                );
              }
              return <></>;
            })}
          </Select>
        </FormControl>
        {data?.node?.dimensions
          ?.filter((f) => f !== iml_period_dim)
          ?.map((dim) => {
            return (
              <Box key={dim?.k}>
                <Typography style={{ fontWeight: 600 }}>{dim?.k}</Typography>
                <Typography>{dim?.v}</Typography>
              </Box>
            );
          })}
      </Box>
      <Card>
        <Typography variant="h5" gutterBottom>
          <strong>Hazard:</strong>
          {data?.node?.name}
        </Typography>
        {lat_idx && lon_idx && int_idx && (
          <Map center={nz_centre} zoom={zoom} scrollWheelZoom={false} style={{ height: '700px' }}>
            <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={filteredRows}
              longitudeExtractor={(m: string) => m[lon_idx]}
              latitudeExtractor={(m: string) => m[lat_idx]}
              intensityExtractor={(m: string) => parseFloat(m[int_idx])}
            />
            <TileLayer attribution={provider_attibution} url={provider_url} />
          </Map>
        )}
      </Card>
    </Box>
  );
};

export default InversionSolutionHazardTab;
