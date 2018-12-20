// Rollup plugins
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

import pkg from "./package.json";

const isProduction = process.env.NODE_ENV === "production";

const plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify("development")
  }),
  postcss(),
  commonjs({
    include: ["node_modules/**"],
    exclude: ["node_modules/process-es6/**"],
    namedExports: {
      "node_modules/react/index.js": [
        "Children",
        "Component",
        "PropTypes",
        "createElement",
        "isValidElement",
        "cloneElement",
        "createRef"
      ],
      "node_modules/react-dom/index.js": ["render"],
      "node_modules/fuse.js/dist/fuse.js": ["Fuse"],
      "node_modules/autosuggest-highlight/match/index.js": ["match"],
      "node_modules/autosuggest-highlight/parse/index.js": ["parse"]
    }
  }),
  babel(),
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
];

if (process.env.NODE_ENV === 'development') {
  plugins.push(serve({
    contentBase: ".",
    open: true,
    verbose: true
  }))
  plugins.push (livereload("dist"))
}


export default {
  input: isProduction ? "src/command-palette.js" : "src/main.js",
  external: isProduction ? ["react", "react-dom"] : "",
  output: [
    {
      file: pkg.main,
      format: "umd",
      globals: {
        'react': "React",
        'react-dom': "ReactDOM"
      },
      sourcemap: "external",
      name: "CommandPalette",
      exports: 'named'
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: "external"
    }
  ],
  plugins
};










