import { betterAuth } from "better-auth";
import bcrypt from "bcrypt";

// Note: In a real app, you'd implement a full Snowflake adapter here.
// For now, we're setting up the structure.
export const auth = betterAuth({
  // adapter: snowflakeAdapter, // FIXME: Implement Snowflake adapter

  password: {
    hash: async (password: string) => {
      return await bcrypt.hash(password, 12);
    },
    verify: async ({ password, hash }: { password: string; hash: string }) => {
      return await bcrypt.compare(password, hash);
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  session: {
    cookieName: "intellipipe_session",
    expiresIn: 60 * 60 * 24 * 7, // 1 week
  },
});
