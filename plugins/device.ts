export default defineNuxtPlugin((nuxtApp) => {
  const userAgent = process.server
    ? nuxtApp.ssrContext?.event.node.req.headers["user-agent"] || ""
    : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  nuxtApp.vueApp.config.globalProperties.$isMobile = isMobile;
});
