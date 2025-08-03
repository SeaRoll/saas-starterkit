import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { JSX } from "react";

type Payload = {
  to: string;
  subject: string;
  html: string;
};

const smtpSettings = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT as string),
  secure: parseInt(process.env.SMTP_PORT as string) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

const handleEmailFire = async (data: Payload) => {
  const transporter = nodemailer.createTransport(smtpSettings);
  return await transporter.sendMail({
    from: process.env.SMTP_FROM,
    ...data,
  });
};

export async function sendEmail(
  to: string,
  subject: string,
  html: JSX.Element
) {
  await handleEmailFire({
    to,
    subject,
    html: await render(html),
  });
}

// Example usage of sendEmail function
// export async function sendHello() {
//   await handleEmailFire({
//     to: "hello@neorepo.com",
//     subject: "Hello",
//     html: await render(HelloEmail()),
//   });
// }
