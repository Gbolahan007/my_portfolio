/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import nodemailer from "nodemailer";

export async function handleSubmit(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, message: "Please fill in all fields." };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.EMAIL_USER,
    subject: `New Portfolio Message from ${name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <div style="background: #f4f4f4; padding: 10px; margin-top: 10px;">
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Email error:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again.",
    };
  }
}
