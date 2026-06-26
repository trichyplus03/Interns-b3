import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import Image from "../models/Image.js";
import upload, { uploadsDir, thumbsDir } from "../middleware/upload.js";

const router = Router();

/**
 * POST /api/images/upload
 * Upload one or more images (field name: "images").
 */
router.post("/upload", upload.array("images", 10), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const saved = [];

    for (const file of req.files) {
      // Generate thumbnail
      let thumbnailPath = null;
      try {
        const thumbName = `thumb_${file.filename}`;
        const thumbFullPath = path.join(thumbsDir, thumbName);
        await sharp(file.path)
          .resize(200, 200, { fit: "cover" })
          .jpeg({ quality: 75 })
          .toFile(thumbFullPath);
        thumbnailPath = `thumbnails/${thumbName}`;
      } catch (thumbErr) {
        console.warn(`⚠️  Thumbnail generation failed for ${file.originalname}:`, thumbErr.message);
      }

      const image = await Image.create({
        originalName: file.originalname,
        fileName: file.filename,
        mimeType: file.mimetype,
        size: file.size,
        path: file.filename,
        thumbnailPath,
      });

      saved.push(image);
    }

    res.status(201).json({
      success: true,
      message: `${saved.length} image(s) uploaded successfully`,
      data: saved,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/images
 * List all images, newest first. Supports pagination via ?page=1&limit=20
 */
router.get("/", async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [images, total] = await Promise.all([
      Image.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Image.countDocuments(),
    ]);

    res.json({
      success: true,
      data: images,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/images/:id
 * Get a single image's details.
 */
router.get("/:id", async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }
    res.json({ success: true, data: image });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/images/:id
 * Delete an image + its files from disk.
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    // Delete main file
    const filePath = path.join(uploadsDir, image.path);
    try { await fs.unlink(filePath); } catch {}

    // Delete thumbnail
    if (image.thumbnailPath) {
      const thumbPath = path.join(uploadsDir, image.thumbnailPath);
      try { await fs.unlink(thumbPath); } catch {}
    }

    await Image.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Image deleted" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/images/:id/download
 * Stream-download an image with proper Content-Disposition headers.
 */
router.get("/:id/download", async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    const filePath = path.join(uploadsDir, image.path);
    res.download(filePath, image.originalName);
  } catch (err) {
    next(err);
  }
});

export default router;
