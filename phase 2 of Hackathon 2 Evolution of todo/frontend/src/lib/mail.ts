import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: '"TaskGenie" <noreply@taskgenie.com>',
    to: email,
    subject: "Reset your TaskGenie password",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - TaskGenie</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">
              TaskGenie
            </h1>
            <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 16px; font-weight: 400;">
              Your Personal Task Management Solution
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; font-weight: 600; text-align: center;">
              Reset Your Password
            </h2>

            <p style="color: #6b7280; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; text-align: center;">
              We received a request to reset your password for your TaskGenie account. Click the button below to create a new password.
            </p>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetLink}"
                 style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.3); transition: all 0.2s ease;">
                Reset Password
              </a>
            </div>

            <p style="color: #6b7280; margin: 24px 0 16px 0; font-size: 14px; line-height: 1.6; text-align: center;">
              This link will expire in <strong>1 hour</strong> for security reasons.
            </p>

            <p style="color: #6b7280; margin: 16px 0; font-size: 14px; line-height: 1.6; text-align: center;">
              If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
            </p>

            <!-- Security Note -->
            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 24px 0;">
              <p style="color: #92400e; margin: 0; font-size: 14px; font-weight: 500; text-align: center;">
                🔒 For your security, never share this email or your password with anyone.
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 24px 30px; border-top: 1px solid #e5e7eb;">
            <div style="text-align: center;">
              <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 14px;">
                Need help? Contact our support team
              </p>
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                © ${new Date().getFullYear()} TaskGenie. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        <!-- Additional Footer -->
        <div style="max-width: 600px; margin: 20px auto; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px; line-height: 1.5;">
            This email was sent to ${email}. If you no longer wish to receive these emails, you can
            <a href="#" style="color: #6366f1; text-decoration: underline;">unsubscribe</a> at any time.
          </p>
        </div>
      </body>
      </html>
    `,
  });
};
