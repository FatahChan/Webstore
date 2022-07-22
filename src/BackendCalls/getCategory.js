// export async function getCategory(category) {
//   let categoryProducts;
//   if(sessionStorage.getItem("categoryProducts")) {
//     categoryProducts = JSON.parse(sessionStorage.getItem("categoryProducts"));
//     if (categoryProducts[category]) {
//       return categoryProducts[category];
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
//         category(input:{title: "${category}"}){
//           products{
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
//             }
//           }
//         }`
//     })
//   }).then(
//       response => response.json()
//   )
//   let products = response.data.category.products;
//   let productsWithAttributes = [];
//   let cacheProducts = {};
//   if(sessionStorage.getItem("products")) {
//     cacheProducts = JSON.parse(sessionStorage.getItem("products"));
//   }
//   for (const product of products) {
//     let attributesDefault = {};
//     let attributes = product.attributes;
//     for (const attribute of attributes) {
//       attributesDefault[attribute.name] = attribute.items[0].value
//     }
//     productsWithAttributes.push({
//       "product": product,
//       "attributes": attributesDefault
//     })
//     cacheProducts[product.id] = {
//       "product": product,
//       "attributes": attributesDefault
//     }
//   }
//   sessionStorage.setItem("products", JSON.stringify(cacheProducts));
//   if(categoryProducts){
//     categoryProducts[category] = productsWithAttributes;
//     sessionStorage.setItem("categoryProducts", JSON.stringify(categoryProducts));
//   }else{
//     categoryProducts = {};
//     categoryProducts[category] = productsWithAttributes;
//     sessionStorage.setItem("categoryProducts", JSON.stringify(categoryProducts));
//   }
//   return productsWithAttributes;
// }


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