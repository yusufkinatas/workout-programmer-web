import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["app/**/*.{ts,tsx}"],
  ignore: [
    "**/*.d.ts",
    "**/*.test.{ts,tsx}",
    "**/*.spec.{ts,tsx}",
    "**/node_modules/**",
    ".next/**",
    "public/**",
  ],
};

export default config;
