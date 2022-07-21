import {ApolloClient, InMemoryCache} from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    AttributeSet: {
      // Singleton types that have no identifying field can use an empty
      // array for their keyFields.
      keyFields: [],
    },
  },
});

export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: cache,
});