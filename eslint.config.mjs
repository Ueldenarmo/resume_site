import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: ["coverage/**", "src/payload-types.ts"]
  },
  {
    files: ["*.config.mjs", "eslint.config.mjs"],
    rules: {
      "import/no-anonymous-default-export": "off"
    }
  }
];

export default eslintConfig;
