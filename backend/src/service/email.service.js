import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.SENDER_ADDRESS,
    pass: process.env.SENDER_PASSWORD,
  },
});

const sendVerificationEmail = async (receiverEmail, verificationCode, fullName) => { 
  const mailOptions = {
    from: process.env.SENDER_ADDRESS,
    to: receiverEmail,
    subject: "Verify your email address",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h1 style="color: #4CAF50; text-align: center;">Verify your email address</h1>
      <p style="font-size: 16px;">Hello ${fullName},</p>
      <p style="font-size: 16px;">Thank you for signing up for Instructify. Please use the following code to verify your email address:</p>
      <p style="font-size: 18px; font-weight: bold; text-align: center; padding: 10px; background-color: #f1f1f1; border-radius: 8px; margin: 20px 0;">${verificationCode}</p>
      <p style="font-size: 16px;">If you have any questions or need assistance, please feel free to reach out to us.</p>
      <p style="font-size: 16px;">Best regards,</p>
      <p style="font-size: 16px; font-weight: bold;">The Instructify Team</p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
      <p style="font-size: 14px; color: #888;">This is an automated email. Please do not reply to this message.</p>
    </div>
  `
  };

  try {
    await transporter.sendMail(mailOptions);
    // console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}

const welcomeEmail = async (receiverEmail, fullName) => { 
  const mailOptions = {
    from: process.env.SENDER_ADDRESS,
    to: receiverEmail,
    subject: 'Welcome to Instructify',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h1 style="color: #4CAF50; text-align: center;">Welcome to Instructify!</h1>
        <p style="font-size: 16px;">Hello ${fullName},</p>
        <p style="font-size: 16px;">Thank you for signing up for Instructify. We are excited to have you onboard.</p>
        <p style="font-size: 16px;">If you have any questions or need assistance, please feel free to reach out to us.</p>
        <p style="font-size: 16px;">Best regards,</p>
        <p style="font-size: 16px; font-weight: bold;">The Instructify Team</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 14px; color: #888;">This is an automated email. Please do not reply to this message.</p>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions);
    // console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}

export { sendVerificationEmail, welcomeEmail };