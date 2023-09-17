import knex from "knex";

export const dbMySQLConfig = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "db_stokbarang",
  },
});


export const userQ = dbMySQLConfig("user");
export const barangQ = dbMySQLConfig("barang");
export const supplierQ = dbMySQLConfig("supplier");

