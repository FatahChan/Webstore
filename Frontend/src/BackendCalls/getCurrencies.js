
import {client} from "./ApolloClient";
import {gql} from "@apollo/client";

export async function getCurrencies() {
  const response = await client.query({ query: gql`        
    {
      currencies{
        label
        symbol
      }
    }`
  });
  return response.data.currencies;
}

