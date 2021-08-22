import { client, Query} from "@tilework/opus";

const getProduct = (product) => {

    client.setEndpoint("http://localhost:4000/graphql");

    const query = new Query("product", true)
   .addArgument("id", "String!", product)   
   .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {id, items {value, id}}", "prices {amount}"])

    client.post(query).then(result => {
      return result
     });     
  }

  export {getProduct}