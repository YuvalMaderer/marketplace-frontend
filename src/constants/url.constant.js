export const PRODUCT_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/product"
    : "//localhost:3000/api/product";
