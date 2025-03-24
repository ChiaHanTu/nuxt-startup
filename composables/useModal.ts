import { noop } from "@vueuse/core";
import { defineAsyncComponent, ref } from "vue";
import { useModal } from "vue-final-modal";

type ModalContainerProps = ComponentProps<
  typeof import("@/components/ModalContainer.vue")["default"]
>;

type ModalContainerOptions = Omit<
  ModalContainerProps,
  "onConfirm" | "onCancel"
> & {
  onConfirm?(close: () => void): void;
  onCancel?(close: () => void): void;
};

const LazyModalContainer = defineAsyncComponent(
  () => import("@/components/ModalContainer.vue")
);

export default () => {
  const attrs = ref<ModalContainerOptions>();

  const modal = useModal({
    component: LazyModalContainer,
    attrs,
  });

  const close = async () => {
    await modal.close();
    attrs.value = undefined;
  };

  const open = async (options: ModalContainerOptions) => {
    attrs.value = {
      ...options,
      onConfirm() {
        const { onConfirm: confirm } = options;
        if (confirm?.length === 1) return confirm(close);

        confirm?.(noop);
        close();
      },
      onCancel() {
        const { onCancel: cancel } = options;
        if (cancel?.length === 1) return cancel(close);

        cancel?.(noop);
        close();
      },
    };

    await modal.open();
  };

  return {
    open,
    close,
  };
};
