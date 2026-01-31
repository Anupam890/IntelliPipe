import { betterAuth } from "better-auth";
import bcrypt from "bcrypt";

export const auth = betterAuth({
  // adapter: snowflakeAdapter, // FIXME: In a real project, implement the snowflake adapter

  emailAndPassword: {
    enabled: true,
  },

  password: {
    hash: async (password: string) => {
      return await bcrypt.hash(password, 12);
    },
    verify: async ({ password, hash }: { password: string; hash: string }) => {
      return await bcrypt.compare(password, hash);
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      // Mock sending verification email
      console.log(
        `Sending verification email to ${user.email} with URL: ${url}`,
      );
    },
  },

  session: {
    cookieName: "intellipipe_session",
    expiresIn: 60 * 60 * 24 * 7, // 1 week
  },
});
