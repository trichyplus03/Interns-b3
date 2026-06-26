/**
 * Centralized error-handling middleware for Express.
 * Catches Multer errors, Mongoose validation errors, and generic errors.
 */
export default function errorHandler(err, _req, res, _next) {
  console.error("❌ Error:", err.message);

  // Multer-specific errors
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      success: false,
      message: "File too large. Maximum size is 10 MB.",
    });
  }

  if (err.code === "LIMIT_FILE_COUNT") {
    return res.status(400).json({
      success: false,
      message: "Too many files. Maximum is 10 files per upload.",
    });
  }

  if (err.message?.includes("Invalid file type")) {
    return res.status(415).json({
      success: false,
      message: err.message,
    });
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: messages,
    });
  }

  // Mongoose cast errors (bad ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Default server error
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
}
