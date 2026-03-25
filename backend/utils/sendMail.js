import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendAnnouncementMail = async (toEmails, title, description) => {
  await transporter.sendMail({
    from: `"JEC Hostel" <${process.env.GMAIL_USER}>`,
    to: toEmails.join(","),
    subject: `📢 Hostel Announcement: ${title}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background: #1e1b4b; padding: 24px;">
          <h2 style="color: #e0e7ff; margin: 0;">JEC Hostel Announcement</h2>
        </div>
        <div style="padding: 24px;">
          <h3 style="color: #1e1b4b;">${title}</h3>
          <p style="color: #444; line-height: 1.7;">${description}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #999; font-size: 12px;">This is an automated message from ChhatralayaConnect — JEC Jabalpur</p>
        </div>
      </div>
    `,
  });
};