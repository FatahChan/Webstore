import {client} from "./Client";
import {gql} from "@apollo/client";

export async function getCategory(categoryName) {
  let res = await client.query({
    query: gql`
      query {
        category${`(input: {title: "${categoryName}"})`} {
          name
          products {
            id
            brand
            name
            inStock
            gallery
            prices {
              currency {
                label
                symbol
              }
              amount
            }
          }
        }
      }`
  })
  return res.data.category.products
}