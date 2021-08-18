import { Typography, Box, Card } from '@material-ui/core';
import { graphql } from 'babel-plugin-relay/macro';
import React from 'react';
// eslint-disable-next-line
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer } from 'react-leaflet';
// import { formatBytes } from './FileDetail';
import { InversionSolutionHazardTabQuery } from './__generated__/InversionSolutionHazardTabQuery.graphql';
// import KeyValueTable from './KeyValueTable';

export const inversionSolutionHazardTabQuery = graphql`
  query InversionSolutionHazardTabQuery($id: ID!) {
    node(id: $id) {
      ... on InversionSolution {
        id
        meta {
          k
          v
        }
        hazard_table {
          id
          name
          column_types
          column_headers
          rows
        }
      }
    }
  }
`;

interface InversionSolutionHazardTabProps {
  queryRef: PreloadedQuery<InversionSolutionHazardTabQuery, Record<string, unknown>>;
}

const InversionSolutionHazardTab: React.FC<InversionSolutionHazardTabProps> = ({
  // eslint-disable-next-line
  queryRef,
}: InversionSolutionHazardTabProps) => {
  // const data = usePreloadedQuery<InversionSolutionHazardTabQuery>(inversionSolutionHazardTabQuery, queryRef);

  // Default coordinates set to Masterton station
  const nz_centre: LatLngExpression = [-40.946, 174.167];
  const zoom = 5;

  const provider_url = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';
  const provider_attibution =
    'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri';

  return (
    <>
      <Box>
        <Card>
          <Typography variant="h5" gutterBottom>
            <strong>Hazard:</strong>
            {/*{data?.node?.hazard_table?.name}*/}
          </Typography>
          <Map center={nz_centre} zoom={zoom} scrollWheelZoom={false} style={{ height: '700px' }}>
            <TileLayer attribution={provider_attibution} url={provider_url} />
            {/*<Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>*/}
          </Map>
        </Card>
      </Box>
    </>
  );
};

export default InversionSolutionHazardTab;
