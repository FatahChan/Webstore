import {client} from "./Client";
import {gql} from "@apollo/client";

export async function getProducts(ids) {
  let results = []
  for (const id of ids) {
    let res = await client.query({
      "query": gql`
      query {
        product(id: "${id}"){
          id
          name
          inStock
          gallery
          description
          category
          attributes{
            id
            name
            type
            items{
              displayValue
              value
              id
            }
          }
          prices{
            currency{
              label
              symbol
            }
            amount
          }
          brand
        }
      }`
    });
    results.push(res.data.product)
  }
  return results
}