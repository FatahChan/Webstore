// export async function getCategories() {
//   const response = await fetch('http://localhost:4000', {
//     method: 'POST',
//     cache: 'default',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       query:
//       `{
//         categories{
//             name
//         }
//       }`
//     })
//   }).then(
//       response => response.json()
//   )
//   return response.data.categories.map(category => category.name);
// }

import {client} from "./ApolloClient";
import {gql} from "@apollo/client";

export async function getCategories() {
  const response = await client
      .query({
        query: gql
      `{
        categories{
            name
        }
      }`,
      });
  return response.data.categories.map(category => category.name);
}
