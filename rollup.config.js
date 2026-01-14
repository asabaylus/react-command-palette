// Rollup plugins
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));


const plugins = [
  replace({
    values: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    preventAssignment: true,
  }),
  copy({
    targets: [
      { src: 'LICENSE', dest: 'dist' },
      { src: 'src/themes/*', dest: 'dist/themes' }
    ]
  }),
  postcss(),
  resolve({
    browser: true,
  }),
  commonjs({
    include: ["node_modules/**"],
  }),
  babel({
    exclude: "node_modules/**",
    babelHelpers: "runtime",
  }),
];

export default {
  input: "src/index.js",
  external: ["react", "react-dom"],
  output: [
    {
      file: pkg.main,
      format: "umd",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
      sourcemap: "external",
      name: "CommandPalette",
      exports: "named",
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: "external",
    },
  ],
  plugins,
};
