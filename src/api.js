import axios from "axios";

/**
 * Axios instance pre-configured for the PhotoMall API.
 * In dev, requests to /api are proxied to the backend via Vite config.
 */
const api = axios.create({
  baseURL: "/api",
  timeout: 30000,
});

// ─── Image APIs ──────────────────────────────────

/**
 * Upload one or more image files.
 * @param {File[]} files       — array of File objects
 * @param {Function} onProgress — optional callback(percentComplete)
 * @returns {Promise<{success, message, data}>}
 */
export async function uploadImages(files, onProgress) {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const { data } = await api.post("/images/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    },
  });
  return data;
}

/**
 * Fetch paginated image list.
 * @param {number} page
 * @param {number} limit
 */
export async function getImages(page = 1, limit = 20) {
  const { data } = await api.get("/images", { params: { page, limit } });
  return data;
}

/**
 * Get a single image's details.
 * @param {string} id
 */
export async function getImage(id) {
  const { data } = await api.get(`/images/${id}`);
  return data;
}

/**
 * Delete an image.
 * @param {string} id
 */
export async function deleteImage(id) {
  const { data } = await api.delete(`/images/${id}`);
  return data;
}

/**
 * Get download URL for an image.
 * @param {string} id
 */
export function getDownloadUrl(id) {
  return `/api/images/${id}/download`;
}

// ─── Storage APIs ────────────────────────────────

/**
 * Fetch current storage statistics.
 * @returns {Promise<{totalGB, usedBytes, usedGB, availableGB, usedPercent, fileCount}>}
 */
export async function getStorageStats() {
  const { data } = await api.get("/storage");
  return data.data;
}

// ─── Share APIs ──────────────────────────────────

/**
 * Generate a shareable link for an image.
 * @param {string} imageId
 */
export async function generateShareLink(imageId) {
  const { data } = await api.post(`/share/link/${imageId}`);
  return data.data;
}

/**
 * Share an image via email.
 * @param {string} imageId
 * @param {string} recipientEmail
 */
export async function shareViaEmail(imageId, recipientEmail) {
  const { data } = await api.post("/share/email", { imageId, recipientEmail });
  return data;
}

/**
 * Get a WhatsApp deep link for sharing.
 * @param {string} imageId
 */
export async function shareViaWhatsApp(imageId) {
  const { data } = await api.post(`/share/whatsapp/${imageId}`);
  return data.data;
}

/**
 * Get a copy-able share link.
 * @param {string} imageId
 */
export async function getShareLinkForCopy(imageId) {
  const { data } = await api.post(`/share/copy/${imageId}`);
  return data.data;
}

export default api;
