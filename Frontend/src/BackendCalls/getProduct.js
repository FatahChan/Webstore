// export async function getProduct(id) {
//   let cacheProducts;
//   if(sessionStorage.getItem("products")) {
//     cacheProducts = JSON.parse(sessionStorage.getItem("products"));
//     if (cacheProducts[id]) {
//       return cacheProducts[id];
//     }
//   }
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
//         product(id: "${id}"){
//             id
//             name
//             inStock
//             gallery
//             description
//             category
//             attributes{
//               id
//               name
//               type
//               items{
//                 displayValue
//                 value
//                 id
//               }
//             }
//             prices{
//               currency{
//                 label
//                 symbol
//               }
//               amount
//             }
//             brand
//           }
//         }`
//     })
//   }).then(
//       response => response.json()
//   )
//   let product = response.data.product;
//   let attributesDefault = {};
//   let attributes = product.attributes;
//   for (const attribute of attributes) {
//     attributesDefault[attribute.name] = attribute.items[0].value
//   }
//
//   let productWithAttributes = {
//     "product": product,
//     "attributes": attributesDefault
//   }
//   if(cacheProducts) {
//     cacheProducts[id] = productWithAttributes;
//   }else {
//     cacheProducts = {};
//     cacheProducts[id] = productWithAttributes;
//   }
//   sessionStorage.setItem("products", JSON.stringify(cacheProducts));
//   return productWithAttributes;
// }


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
