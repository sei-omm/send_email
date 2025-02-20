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
const emailType = process.env.EMAIL_TYPE; //RESET_PASSWORD, SEND_OTP, BIRTHDATE_WISH, PAYMENT_LINK, SEND_JOB_INFO_VENDOR, 

const mailOptions = {
  from: `"Your Company" <${smtpUser}>`,
  to: toEmail.split(","),
  subject: "Personalized Email for ",
  html: "",
};

const parseData = JSON.parse(process.env.DATA || '{}');

if(emailType === "RESET_PASSWORD") {
  const emailTemplate = fs.readFileSync("resetPassword.ejs", "utf-8");
  const htmlContent = ejs.render(emailTemplate, { hostname, ...parseData} );
  
  mailOptions.from = `"Password Reset Email Form SEI" <${smtpUser}>`;
  mailOptions.subject = "Password Reset Email SEI";
  mailOptions.html = htmlContent;
} else if (emailType === "SEND_OTP") {
  const emailTemplate = fs.readFileSync("otp.ejs", "utf-8");
  const htmlContent = ejs.render(emailTemplate, { hostname, ...parseData} );
  
  mailOptions.from = `"OTP Verification Form SEI" <${smtpUser}>`;
  mailOptions.subject = "Otp Verification Email SEI";
  mailOptions.html = htmlContent;
} else if (emailType === "BIRTHDATE_WISH") {
  const emailTemplate = fs.readFileSync("birthdateWish.ejs", "utf-8");
  const htmlContent = ejs.render(emailTemplate, { hostname, ...parseData} );
  
  mailOptions.from = `"${parseData?.student_name} Happy Birthday To You" <${smtpUser}>`;
  mailOptions.subject = "Birthday Wish To You From SEI";
  mailOptions.html = htmlContent;
} else if (emailType === "PAYMENT_LINK") {
  const emailTemplate = fs.readFileSync("paymentLink.ejs", "utf-8");
  const htmlContent = ejs.render(emailTemplate, { hostname, ...parseData} );
  
  mailOptions.from = `"Payment Link For ${templateData?.course_name}" <${smtpUser}>`;
  mailOptions.subject = "Payment Link From SEI";
  mailOptions.html = htmlContent;
} else if (emailType === "SEND_JOB_INFO_VENDOR") {
  const emailTemplate = fs.readFileSync("jobPosting.ejs", "utf-8");
  const htmlContent = ejs.render(emailTemplate, { hostname, ...parseData} );
  
  mailOptions.from = `"Job Details From SEI" <${smtpUser}>`;
  mailOptions.subject = "Job Details From SEI";
  mailOptions.html = htmlContent;
}


const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort == 465, // Use TLS if port 465
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Email failed:", error);
  } else {
    // console.log("✅ Email sent:", info.response);
    console.log("✅ Email sent:");
  }
});
