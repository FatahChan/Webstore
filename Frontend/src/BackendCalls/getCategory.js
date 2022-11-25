


import {client} from "./ApolloClient";
import {gql} from "@apollo/client";

export async function getCategory(category) {
  const response = await client.query({
    query: gql
      `{
        category(input:{title: "${category}"}){
          products{
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
          }
        }`
  })

  console.log(response);
  let products = response.data.category.products;
  let productsWithAttributes = [];
  for (const product of products) {
    let attributesDefault = {};
    let attributes = product.attributes;
    for (const attribute of attributes) {
      attributesDefault[attribute.name] = attribute.items[0].value
    }
    productsWithAttributes.push({
      "product": product,
      "attributes": attributesDefault
    })
  }
  return productsWithAttributes;

}