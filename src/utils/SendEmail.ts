import nodemailer from "nodemailer";

export async function sendMail(to: string, subject: string, text: string) {
  // let testAccount = await nodemailer.createTestAccount(); // testing

  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    auth: {
      user: "ivanusecfilip@zohomail.eu",
      pass: "cgCNJCbJJuKC",
    },
  });

  transporter.verify((err) => {
    if (err) {
      console.log(err);
    }
  });

  let info = await transporter.sendMail({
    from: "Filip at P!<ivanusecfilip@zohomail.eu>",
    to: to,
    subject: subject,
    text,
    html: text,
  });

  console.log("Message sent: %s", info.messageId);
}
