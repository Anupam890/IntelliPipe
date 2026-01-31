import crypto from "crypto";
import { snowflakeConnection } from "@/services/snowflake";

export async function createEmailVerificationCode(userId: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const id = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  return new Promise<string>((resolve, reject) => {
    snowflakeConnection.execute({
      sqlText: `
        INSERT INTO EMAIL_VERIFICATION_CODES
        (ID, USER_ID, CODE, EXPIRES_AT)
        VALUES (?, ?, ?, ?)
      `,
      binds: [id, userId, code, expiresAt] as any[],
      complete: (err) => {
        if (err) reject(err);
        else resolve(code);
      },
    });
  });
}
