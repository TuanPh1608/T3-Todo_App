const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");

const compat = new FlatCompat({
  baseDirectory: __dirname, // Chỉ rõ thư mục gốc cho ESLint
});

module.exports = {
  ...compat.extends("next/core-web-vitals", "next/typescript"),
};
