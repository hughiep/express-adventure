import { defineConfig } from "drizzle-kit";
import { connectionUri } from "./src/db/data-source";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "mysql",
  dbCredentials: { url: connectionUri },
});
