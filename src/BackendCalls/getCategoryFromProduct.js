  import {client} from "./Client";
import {gql} from "@apollo/client";

export async function getCategoryProduct(id) {
  let res = await client.query({
    "query": gql`
      query {
        product(id: "${id}"){
          category
        }
      }`
  });


  return res['product']['category'];
}