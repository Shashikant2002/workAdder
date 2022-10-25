import { createTransport } from "nodemailer";

export const sendMail = async (email, subject, message) => {
  const transport = createTransport({
      // service: process.env.SMPT_SERVICE,
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  await transport.sendMail({
    from: process.env.SMPT_MAIL,
    to: email,
    subject,
    text: message,
  });
};
