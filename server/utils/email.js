import nodemailer from "nodemailer";

/**
 * Create a reusable Nodemailer transporter.
 * Falls back to a "no-op" if SMTP creds are not configured.
 */
function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || SMTP_USER === "your-email@gmail.com") {
    console.warn("⚠️  SMTP not configured — email sharing will be simulated.");
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

let transporter = null;

/**
 * Send a share-link email.
 * @param {string} to        — recipient email
 * @param {string} shareLink — full shareable URL
 * @param {string} imageName — original filename
 * @returns {Promise<{success: boolean, messageId?: string}>}
 */
export async function sendShareEmail(to, shareLink, imageName) {
  if (!transporter) transporter = createTransporter();

  // If SMTP isn't configured, simulate success
  if (!transporter) {
    console.log(`📧 [Simulated] Share email to ${to} → ${shareLink}`);
    return { success: true, simulated: true };
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #e2e8f0; padding: 40px 20px; }
        .card { max-width: 480px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.08); }
        .title { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
        .subtitle { color: #94a3b8; font-size: 14px; margin-bottom: 24px; }
        .btn { display: inline-block; background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 12px; font-weight: 600; font-size: 14px; }
        .filename { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 8px 12px; font-size: 13px; color: #cbd5e1; margin-bottom: 24px; display: flex; align-items: center; gap: 8px; }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: #f43f5e; }
        .footer { margin-top: 24px; font-size: 11px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="title">📸 Someone shared a photo with you</div>
        <div class="subtitle">You've received a photo via PhotoMall.</div>
        <div class="filename">
          <span class="dot"></span>
          ${imageName}
        </div>
        <a href="${shareLink}" class="btn">View Image →</a>
        <div class="footer">
          This link expires in 7 days. If you didn't expect this email, you can safely ignore it.
        </div>
      </div>
    </body>
    </html>
  `;

  const info = await transporter.sendMail({
    from: `"PhotoMall" <${process.env.SMTP_USER}>`,
    to,
    subject: `📸 ${imageName} — Shared via PhotoMall`,
    html,
  });

  return { success: true, messageId: info.messageId };
}
