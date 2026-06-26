import { Router } from "express";
import Image from "../models/Image.js";

const router = Router();

/**
 * GET /api/storage
 * Returns real-time storage statistics calculated from the database.
 */
router.get("/", async (_req, res, next) => {
  try {
    const totalGB = parseFloat(process.env.STORAGE_LIMIT_GB) || 10;

    // Aggregate total size of all stored images
    const [agg] = await Image.aggregate([
      {
        $group: {
          _id: null,
          totalBytes: { $sum: "$size" },
          fileCount: { $sum: 1 },
        },
      },
    ]);

    const usedBytes = agg?.totalBytes || 0;
    const fileCount = agg?.fileCount || 0;
    const usedGB = parseFloat((usedBytes / (1024 * 1024 * 1024)).toFixed(2));
    const availableGB = parseFloat(Math.max(0, totalGB - usedGB).toFixed(2));
    const usedPercent = parseFloat(((usedGB / totalGB) * 100).toFixed(1));

    res.json({
      success: true,
      data: {
        totalGB,
        usedBytes,
        usedGB,
        availableGB,
        usedPercent,
        fileCount,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
