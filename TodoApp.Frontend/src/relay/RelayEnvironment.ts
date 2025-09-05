import {
  Environment,
  Network,
  RecordSource,
  Store,
  RequestParameters,
  Variables,
  GraphQLResponse,
} from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';

// HTTP endpoint for queries and mutations
const HTTP_ENDPOINT = 'http://localhost:5000/graphql';

// WebSocket endpoint for subscriptions
const WS_ENDPOINT = 'ws://localhost:5000/graphql';

// Create subscription client
const subscriptionClient = new SubscriptionClient(WS_ENDPOINT, {
  reconnect: true,
});

// Network layer for HTTP requests
function fetchQuery(operation: RequestParameters, variables: Variables): Promise<GraphQLResponse> {
  return fetch(HTTP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => response.json());
}

// Create Relay environment
const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
