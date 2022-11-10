import  { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv'
dotenv.config()

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cookbook.balehls.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const dbConnect = async () => {
  await client.connect();
  try {
      const db = client.db("cookbook");
      const collection = db.collection("recipes");
    if(!collection) {
        db.createCollection("recipes");
    }
      return collection;
  } catch (err) {
      console.log(err);
  }
}




export default dbConnect;

  