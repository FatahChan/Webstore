import {ApolloClient, InMemoryCache} from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    AttributeSet: {
      // Singleton types that have no identifying field can use an empty
      // array for their keyFields.
      keyFields: ["id", "items"],
    },
  },
});
console.log(process.env.REACT_APP_BACKEND_URI)
export const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URI,
  cache: cache,
});