import { defineStore } from "pinia";
export default defineStore("APP", () => {
  const nuxtApp = useNuxtApp();
  const isMobile = nuxtApp.vueApp.config.globalProperties.$isMobile;

  const token = useCookie<string>("auth-token", {
    default: () => "",
  });

  return {
    isMobile,
    token,
  };
});
