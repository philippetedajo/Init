import { Pans } from "../../_types";

export const _empty: Pans = {
  js: {
    code: {
      data: "",
      error: "",
      loading: false,
    },
    transformer: "js",
  },
  css: {
    code: {
      data: "",
      error: "",
      loading: false,
    },
    transformer: "css",
  },
  html: {
    code: {
      data: `<div id="root">
  <h2>Empty</h2>
</div>
`,
      error: "",
      loading: false,
    },
    transformer: "html",
  },
};