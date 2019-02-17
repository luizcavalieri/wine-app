import { AsyncStorage } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client/ApolloClient';
import { setContext } from 'apollo-link-context';
import { createHttpLink, HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { CachePersistor } from 'apollo-cache-persist';
import merge from 'lodash.merge';

// import { getLocalStorageToken } from '../helpers/auth';

// Apollo GraphQL Resolvers
// import { resolverAuth } from './resolvers/auth';

/**
 * Creates instance of Apollo client and Persistence and make it available across the application.
 * @return {{client: ApolloClient<NormalizedCacheObject> ,persistent: CachePersistor<NormalizedCacheObject>}}
 * */
const generateApolloClient = () => {
  const httpLink = new HttpLink({
    uri: 'http://localhost/graphql',
  });

  // Gets the authentication token from local storage if it exists
  const token = null;

  // Returns headers to the context so httpLink can read them
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  })).concat(httpLink);

  const cache = new InMemoryCache();
  const stateLink = withClientState({
    cache,
  });

  const persistent = new CachePersistor({
    cache,
    storage: AsyncStorage,
    maxSize: false, // set to unlimited (default is 1MB https://github.com/apollographql/apollo-cache-persist)
    debug: true, // enables console logging
    // key: process.env.REACT_APP_STORE_LOCAL_STORAGE,
  });

  // Instantiates Apollo Client object for GraphQL
  const client = new ApolloClient({
    link: ApolloLink.from([
      stateLink,
      authLink,
    ]),
    cache,
    connectToDevTools: process.env.NODE_ENV === 'development',
  });

  return { client, persistent };
};

const { client, persistent } = generateApolloClient();

export {
  persistent,
  client,
};
