
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
