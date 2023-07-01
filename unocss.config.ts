import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  content: {
    pipeline: {
      exclude: ["node_modules"],
    },
  },
  presets: [presetAttributify(), presetUno()],
  rules: [["uno-padding-20", { padding: "20px" }]],
  shortcuts: {
    "wh-full": "w-full h-full",
    "flex-center": "flex justify-center items-center",
    "flex-x-center": "flex justify-center",
    "flex-y-center": "flex items-center",
  },
  transformers: [transformerDirectives()],
});
