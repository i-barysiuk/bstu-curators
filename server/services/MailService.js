const Mail = require("nodemailer");

var transporter = Mail.createTransport({
  service: "gmail",
  auth: {
    user: "noreply.bstu.care@gmail.com",
    pass: "uotmuavoxkjkfhfy"
  }
});

class MailService {
  send(receivers, subject, body) {
    return new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          from: "noreply.bstu.care@gmail.com",
          to: receivers,
          subject: subject,
          html: body
        },
        (err, info) => {
          if (err) reject(err);
          else resolve(info);
        }
      );
    });
  }
}

module.exports = new MailService();