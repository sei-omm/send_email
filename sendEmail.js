const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");

// Load environment variables
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const toEmail = process.env.TO_EMAIL;  // ✅ Get from API
const hostname = process.env.HOSTNAME;
const data = process.env.DATA;

// Read and compile EJS template
const emailTemplate = fs.readFileSync("birthdateWish.ejs", "utf-8");
const htmlContent = ejs.render(emailTemplate, { hostname, ...data} );

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort == 465, // Use TLS if port 465
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

const mailOptions = {
  from: `"Your Company" <${smtpUser}>`,
  to: toEmail,
  subject: "Personalized Email for ",
  html: htmlContent,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Email failed:", error);
  } else {
    console.log("✅ Email sent:", info.response);
  }
});
