// Rollup plugins
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import replace from "rollup-plugin-replace";
import pkg from "./package.json";


const plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
  copy({
    targets: [
      { src: 'LICENSE', dest: 'dist' },
      { src: 'src/themes/*', dest: 'dist/themes' }
    ]
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
        "createRef",
      ],
      "node_modules/react-dom/index.js": ["render"],
    },
  }),
  babel({
    exclude: "node_modules/**",
    runtimeHelpers: true,
  }),
  resolve({
    jsnext: true,
    main: true,
    browser: true,
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
