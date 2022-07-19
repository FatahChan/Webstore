
export async function getCategory(categoryName) {
  let res = await fetch('http://localhost:4000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: `  {
        category(input: {title: "${categoryName}"}) {
          name
          products {
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
  })
  res = await res.json();
  let products = res.data.category.products;
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