import {gql} from "@apollo/client";
import {client} from "./Client";

export async function getCurrencies(){
  let res = await client.query({
    query: gql`
    query {
      currencies{
        label
        symbol
      }
    }`
  })

  return res.data.currencies.map((currency) => ({label: currency.label , symbol: currency.symbol}))
}