import { MongoClient } from 'mongodb';
import { useState } from 'react';
import Layout from '../components/Layout';
import Product from '../components/Products';

function Homepage({products}) {
  const [phrase, setPhrase] = useState("");
 

  //  new Set ensures that there are no duplicate in our map.
  // ? ensures no error is throw when the state is undefined.
  const categoryNamies = [...new Set(products?.map((p) => p.category))];

  if (phrase) {
      products = products.filter((p) => p.name.toLowerCase().includes(phrase));
    } 

  return (
    <Layout>
      <input
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        type="text"
        placeholder="Search for products..."
        className="bg-gray-200 w-full py-2 px-4 rounded-xl"
      />
      <div>
        {categoryNamies.map((categoryName) => (
          <div key={categoryName}>
            {products.find((p) => p.category === categoryName) && (
              <div>
                <h2 className="text-2xl py-5 capitalize">{categoryName}</h2>
                <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                  {products
                    .filter((p) => p.category === categoryName)
                    .map((productInfo) => (
                      <div key={productInfo._id} className="px-5 snap-start">
                        <Product {...productInfo} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
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