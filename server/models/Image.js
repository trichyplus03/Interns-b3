import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    fileName: {
      type: String,
      required: true,
      unique: true,
    },
    mimeType: {
      type: String,
      required: true,
      enum: ["image/png", "image/jpeg", "image/webp", "image/heic", "image/heif"],
    },
    size: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    thumbnailPath: {
      type: String,
      default: null,
    },
    shareToken: {
      type: String,
      default: null,
      index: true,
    },
    shareExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

// Virtual for human-readable size
imageSchema.virtual("sizeFormatted").get(function () {
  const bytes = this.size;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
});

// Ensure virtuals are included in JSON output
imageSchema.set("toJSON", { virtuals: true });
imageSchema.set("toObject", { virtuals: true });

const Image = mongoose.model("Image", imageSchema);

export default Image;
