import { createConnection } from "snowflake-sdk";

const snowflakeConnection = createConnection({
  account: "your_account",
  username: "your_username",
  password: "your_password",
});

snowflakeConnection.connect((err, conn) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Connected to Snowflake");
});
