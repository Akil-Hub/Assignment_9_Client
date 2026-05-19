import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_DB_URI);

await client.connect();

const db = client.db();

export const auth = betterAuth({
  session:{
    cookieCache:{
      enabled:true,
      strategy:'jwt',
      maxAge:7*24*60*60
    }
  },
     plugins: [
        jwt(), 
    ],
  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    client,
  }),
});