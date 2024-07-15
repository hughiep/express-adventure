import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: true,
  subscribers: [],
  migrations: ["migrations/*.ts"],
  migrationsTableName: "migrations",
});
