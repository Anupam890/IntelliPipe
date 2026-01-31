import snowflake from "snowflake-sdk";

const connectionPool = snowflake.createPool(
  {
    account: process.env.SNOWFLAKE_ACCOUNT || "",
    username: process.env.SNOWFLAKE_USER || "",
    password: process.env.SNOWFLAKE_PASSWORD || "",
    warehouse: process.env.SNOWFLAKE_WAREHOUSE || "",
    database: process.env.SNOWFLAKE_DATABASE || "",
    schema: process.env.SNOWFLAKE_SCHEMA || "PUBLIC",
  },
  {
    max: 10,
    min: 2,
  },
);

export async function executeQuery(sql: string, binds: any[] = []) {
  return new Promise((resolve, reject) => {
    connectionPool.use(async (connection) => {
      connection.execute({
        sqlText: sql,
        binds: binds,
        complete: (err, stmt, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        },
      });
    });
  });
}

export default connectionPool;
