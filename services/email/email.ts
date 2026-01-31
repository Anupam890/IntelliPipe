import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendVerificationCode(email: string, code: string) {
  await resend.emails.send({
    from: "InteliPipe info@digitalhubspot.com",
    to: email,
    subject: "Your InteliPipe verification code",
    html: `
      <div style="font-family:Inter,Arial">
        <h2>Verify your email</h2>
        <p>Use this code to verify your InteliPipe account:</p>
        <div style="
          font-size:28px;
          font-weight:bold;
          letter-spacing:6px;
          margin:16px 0;
        ">
          ${code}
        </div>
        <p style="color:#64748B;font-size:12px">
          This code expires in 10 minutes.
        </p>
      </div>
    `,
  });
}
