import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  /** 排除 */
  content: {
    pipeline: {
      exclude: ["node_modules"],
    },
  },
  /** 預設 */
  presets: [
    /** 屬性化模式 & 無值的屬性模式 */
    presetAttributify(),
    /** 默認預設 */
    presetUno(),
  ],
  /** 自定義規則 */
  rules: [["uno-padding-20", { padding: "20px" }]],
  /** 自定義快捷方式 */
  shortcuts: {
    "wh-full": "w-full h-full",
    "flex-center": "flex justify-center items-center",
    "flex-x-center": "flex justify-center",
    "flex-y-center": "flex items-center",
  },
  transformers: [transformerDirectives()],
});
