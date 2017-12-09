// Rollup plugins
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify("development")
  }),
  postcss({
    extensions: [".css"]
  }),
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
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
        "cloneElement"
      ],
      "node_modules/react-dom/index.js": ["render"],
      "node_modules/fuse.js/dist/fuse.js": ["Fuse"],
      "node_modules/autosuggest-highlight/match/index.js": ["match"],
      "node_modules/autosuggest-highlight/parse/index.js": ["parse"]
    }
  }),
  babel({
    exclude: "node_modules/**"
  })
];

if (process.env.BUILD !== "production") {
  plugins.push(
    serve({
      contentBase: ".",
      open: true,
      verbose: true
    })
  );

  plugins.push(livereload("dist"));
}

export default {
  input: "src/main.js",
  output: {
    file: "dist/index.js",
    format: "umd"
  },
  sourcemap: "inline",
  plugins
};
