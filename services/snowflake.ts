import snowflake from "snowflake-sdk";

export const snowflakeConnection = snowflake.createConnection({
  account: process.env.SNOWFLAKE_ACCOUNT!,
  username: process.env.SNOWFLAKE_USERNAME!,
  privateKey: process.env.SNOWFLAKE_PRIVATE_KEY!,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE!,
  database: process.env.SNOWFLAKE_DATABASE!,
  schema: process.env.SNOWFLAKE_SCHEMA!,
});

export function connectSnowflake() {
  return new Promise<void>((resolve, reject) => {
    snowflakeConnection.connect((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
