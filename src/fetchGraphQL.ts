import { Variables } from 'relay-runtime';
import { GraphQLResponse } from 'relay-runtime';

const fetchGraphQL = async (text: string | null | undefined, variables: Variables): Promise<GraphQLResponse> => {
  const { REACT_APP_GRAPH_ENDPOINT, REACT_APP_GRAPH_API_KEY } = process.env;
  if (!REACT_APP_GRAPH_ENDPOINT || !REACT_APP_GRAPH_API_KEY) throw new Error('Missing environment variables');

  // Fetch data from GitHub's GraphQL API:
  const response = await fetch(REACT_APP_GRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'X-API-KEY': REACT_APP_GRAPH_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
};

export default fetchGraphQL;
