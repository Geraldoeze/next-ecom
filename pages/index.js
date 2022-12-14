import { MongoClient } from 'mongodb';
import { useState } from 'react';



function Homepage({products}) {
  const [phrase, setPhrase] = useState("");
 

  //  new Set ensures that there are no duplicate in our map.
  // ? ensures no error is throw when the state is undefined.
  const categoryNamies = [...new Set(products?.map((p) => p.category))];

  if (phrase) {
      products = products.filter((p) => p.name.toLowerCase().includes(phrase));
    } 

  return (
    <h1>ERRORS</h1>
  );
}

export default Homepage;


export async function getStaticProps() {
  const MONGODB_URI = 'mongodb://127.0.0.1:27017/e-commerce';
    //  fetch data from an API
    const client = await MongoClient.connect(MONGODB_URI)
    const db = client.db();
    const productsCollection = db.collection('products');

    const products = await productsCollection.find().toArray();
    client.close();

  return {
            props: {
                products: JSON.parse(JSON.stringify(products))
            }
        }
}