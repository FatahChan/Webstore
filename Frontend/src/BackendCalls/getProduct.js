

import {client} from "./ApolloClient";
import {gql} from "@apollo/client";

export async function getProduct(id) {
  const response = await client.query({
    query: gql
      `{
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
  })

  let product = response.data.product;
  let attributesDefault = {};
  let attributes = product.attributes;
  for (const attribute of attributes) {
    attributesDefault[attribute.name] = attribute.items[0].value
  }
  return {
    "product": product,
    "attributes": attributesDefault
  };

}
