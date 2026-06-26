import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import Image from "../models/Image.js";
import { sendShareEmail } from "../utils/email.js";

const router = Router();
const SHARE_EXPIRY_DAYS = 7;

/**
 * Helper: generate or reuse a share token for an image.
 */
async function ensureShareToken(imageId) {
  const image = await Image.findById(imageId);
  if (!image) return null;

  // If token exists and hasn't expired, reuse it
  if (image.shareToken && image.shareExpiry && image.shareExpiry > new Date()) {
    return image;
  }

  // Generate fresh token
  image.shareToken = uuidv4();
  image.shareExpiry = new Date(Date.now() + SHARE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  await image.save();

  return image;
}

/**
 * Build a full share URL.
 */
function buildShareUrl(token) {
  const base = process.env.BASE_URL || "http://localhost:5000";
  return `${base}/api/share/${token}`;
}

/**
 * POST /api/share/link/:imageId
 * Generate (or return existing) shareable link for an image.
 */
router.post("/link/:imageId", async (req, res, next) => {
  try {
    const image = await ensureShareToken(req.params.imageId);
    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    const shareUrl = buildShareUrl(image.shareToken);

    res.json({
      success: true,
      data: {
        shareUrl,
        token: image.shareToken,
        expiresAt: image.shareExpiry,
        imageName: image.originalName,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/share/:token
 * Public: view a shared image. Returns the image file directly if valid.
 */
router.get("/:token", async (req, res, next) => {
  try {
    const image = await Image.findOne({ shareToken: req.params.token });

    if (!image) {
      return res.status(404).json({ success: false, message: "Share link not found" });
    }

    if (image.shareExpiry && image.shareExpiry < new Date()) {
      return res.status(410).json({ success: false, message: "Share link has expired" });
    }

    // Redirect to the static file
    const fileUrl = `${process.env.BASE_URL || "http://localhost:5000"}/uploads/${image.path}`;
    res.redirect(fileUrl);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/share/email
 * Share an image via email.
 * Body: { imageId: string, recipientEmail: string }
 */
router.post("/email", async (req, res, next) => {
  try {
    const { imageId, recipientEmail } = req.body;

    if (!imageId || !recipientEmail) {
      return res.status(400).json({
        success: false,
        message: "imageId and recipientEmail are required",
      });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    const image = await ensureShareToken(imageId);
    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    const shareUrl = buildShareUrl(image.shareToken);
    const result = await sendShareEmail(recipientEmail, shareUrl, image.originalName);

    res.json({
      success: true,
      message: result.simulated
        ? "Email simulated (SMTP not configured)"
        : "Email sent successfully",
      data: {
        shareUrl,
        recipientEmail,
        simulated: !!result.simulated,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/share/whatsapp/:imageId
 * Generate a WhatsApp deep link for sharing.
 */
router.post("/whatsapp/:imageId", async (req, res, next) => {
  try {
    const image = await ensureShareToken(req.params.imageId);
    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    const shareUrl = buildShareUrl(image.shareToken);
    const text = encodeURIComponent(
      `📸 Check out this photo: ${image.originalName}\n\n${shareUrl}`
    );
    const whatsappUrl = `https://wa.me/?text=${text}`;

    res.json({
      success: true,
      data: {
        whatsappUrl,
        shareUrl,
        imageName: image.originalName,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/share/copy/:imageId
 * Generate/return the share link (frontend copies to clipboard).
 */
router.post("/copy/:imageId", async (req, res, next) => {
  try {
    const image = await ensureShareToken(req.params.imageId);
    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    const shareUrl = buildShareUrl(image.shareToken);

    res.json({
      success: true,
      data: {
        shareUrl,
        imageName: image.originalName,
        expiresAt: image.shareExpiry,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
