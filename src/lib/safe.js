// src/lib/safe.js
export const sIndexOf = (target, search) =>
  (typeof target === "string" ? target : (target ?? "").toString()).indexOf(search);
export const aIndexOf = (arr, item) => (Array.isArray(arr) ? arr : []).indexOf(item);
