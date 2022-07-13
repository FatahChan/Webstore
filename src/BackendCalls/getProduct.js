  import {client} from "./Client";
import {gql} from "@apollo/client";

export async function getProduct(id) {
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
  const attributesDefault = {};
  const attributes = res.data.product.attributes

  for (const attribute of attributes) {
    attributesDefault[attribute.name] = attribute.items[0].value
  }
  res = {
    "product": res.data.product,
    "attributes": attributesDefault
  }
  return res;
}