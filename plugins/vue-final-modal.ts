import { createVfm } from "vue-final-modal";
import "vue-final-modal/style.css";

import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const vfm = createVfm() as any;

  nuxtApp.vueApp.use(vfm);
});
