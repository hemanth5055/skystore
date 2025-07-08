import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});
const isProd = process.env.NODE_ENV === "production";
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: isProd
      ? {
          "@typescript-eslint/no-explicit-any": "off",
          "react-hooks/exhaustive-deps": "off",
        }
      : {},
  },
];

export default eslintConfig;
