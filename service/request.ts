export async function request<DataT = unknown>(
  url: string,
  options: Parameters<typeof $fetch>[1] = {}
) {
  interface Response {
    code: string;
    data: DataT;
    message: string;
  }

  const router = useRouter();
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();
  const { open: openModal } = useModal();

  const baseURL = runtimeConfig.public.apiUrl;

  const _options: Parameters<typeof $fetch>[1] = {
    ...options,
    baseURL: baseURL,
    onRequest({ options }) {
      options.headers = options.headers || {};

      const headers = {
        Authorization: "",
      };

      Object.assign(headers, options.headers);
      Object.assign(options.headers, headers);
    },
    onRequestError() {
      //
    },
    onResponse({ response, request }) {
      if (response._data.code !== "0000") {
        // eslint-disable-next-line no-console
        console.error(`[API '/${url}' ERROR] ${response._data.message}`);

        // 社群登入失敗， return
        if (
          request === `${baseURL}login/facebook` ||
          request === `${baseURL}login/google`
        ) {
          throw response._data;
        }

        openModal({
          content: response._data.message,
          onConfirm() {
            // 因應已註冊會員從訪客模式登入，導轉回登入頁
            response._data.code === "5003"
              ? router.push({
                  name: "login",
                  query: {
                    eventId: route.query.eventId,
                    couponId: route.query.couponId,
                  },
                })
              : undefined;
          },
        });
        throw response._data;
      }
    },
    onResponseError() {
      //
    },
  };

  return await $fetch<Response>(url, _options).then((result) => {
    return result;
  });
}
