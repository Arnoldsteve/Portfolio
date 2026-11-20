import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "test-results/**", "playwright-report/**"] },
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // The TypeScript-aware rule below replaces the base rule (which misreads type-only names).
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: true, varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
      // Copy lives in content files; apostrophes in JSX text are fine.
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
