import type { Options } from "tsup";

export const tsup: Options = {
  splitting: false,
  sourcemap: true,
  clean: true,
  entryPoints: ["index.js"],
  target: "es5",
  format: ["cjs", "esm", "iife"],
  minify: true,
  legacyOutput: true,
};
