import { MongoClient, ServerApiVersion, Db } from "mongodb";
import "dotenv/config";

export function getVersion(): string {
  return ServerApiVersion.v1
}

export let db: Db;

export async function connect(): Promise<void> {
  const DB_URI = process.env["DB_URI"]

  if (typeof DB_URI === 'string') {
    const client = new MongoClient(DB_URI)

    try {
      await client.connect();

      await client.db("admin").command(({ ping: 1 }));
      db = client.db('articles')

      console.log("Conneced to db!")
    } catch (err) {
      throw new Error(err as string)
    }
  } else {
    throw new Error("You must provide all the fields to .env")
  }
}

export const getDb = (): Db | undefined => db;
