// export async function getCurrencies() {
//   const response = await fetch('http://localhost:4000', {
//     method: 'POST',
//     cache: 'default',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       query:
//           `{
//         currencies{
//           label
//           symbol
//         }
//       }`
//     })
//   }).then(
//       response => response.json()
//   )
//   return response.data.currencies;
// }


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

