import {client} from "./Client";
import {gql} from "@apollo/client";

export async function getCategories() {
  let res = await client.query({
    query: gql`
      query {
        categories{
          name
        }
      }`
  })

  return res.data.categories.map((category) => (category.name))
}