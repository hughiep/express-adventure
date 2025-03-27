import { drizzle } from "drizzle-orm/mysql2";
import { type Config } from "drizzle-kit";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const dbCredentials = {
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// connection url
export const connectionUri = `mysql://${dbCredentials.user}:${dbCredentials.password}@${dbCredentials.host}/${dbCredentials.database}`;

const dbConnection = mysql.createPool(connectionUri);

const db = drizzle(dbConnection, { schema, mode: "default" });

export { db, dbConnection, dbCredentials };
