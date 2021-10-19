import nodemailer from "nodemailer";

export async function sendMail(to: string, subject: string, text: string) {
  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  transporter.verify((err) => {
    if (err) {
      console.log(err);
    }
  });

  // @ts-ignore
  let info = await transporter.sendMail({
    from: "Filip at Kindie!<ivanusecfilip@zohomail.eu>",
    to: to,
    subject: subject,
    text,
    html: text,
  });
}
