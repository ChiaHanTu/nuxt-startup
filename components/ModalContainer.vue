
<script setup lang="ts">
import { computed } from "vue";
import { VueFinalModal } from "vue-final-modal";

import AtomicButton from "../Atomics/AtomicButton.vue";

import CrossSvg from "@/assets/svg/cross.svg?component";
import isNumber from "@/utils/isNumber";

interface ModalContainerProps {
  /**
   * Modal 寬度
   * @default '375px'
   */
  width?: string | number;
  title?: string;
  content?: string;
  contentClass?: any;
  hasCancel?: boolean;
  cancelText?: string;
  confirmText?: string;
  hasShadow?: boolean;
  hasClose?: boolean;
}

interface ModalContainerEmits {
  (event: "cancel"): void;
  (event: "confirm"): void;
  (event: "close"): void;
}

const props = withDefaults(defineProps<ModalContainerProps>(), {
  width: "375px",
  title: undefined,
  content: "",
  contentClass: undefined,
  cancelText: "關閉",
  confirmText: "確認",
});

const emit = defineEmits<ModalContainerEmits>();

const rootStyle = computed(() => {
  const modelWidth =
    isNumber(props.width) || /^\d+$/.test(props.width)
      ? `${props.width}px`
      : props.width;

  return {
    "--modal-width": modelWidth,
  };
});

const onCancel = () => {
  emit("cancel");
};

const onConfirm = () => {
  emit("confirm");
};

const onClose = () => {
  emit("close");
};
</script>

<template>
  <VueFinalModal
    :style="rootStyle"
    content-class="fixed place-middle w-full max-w-[var(--modal-width)] bg-white rounded-[10px]"
    overlay-class="!bg-[#363636]"
    :click-to-close="false"
    esc-to-close
  >
    <header
      class="flex-center flex-col bg-white py-5 rounded-t-[10px]"
      :class="{'shadow-[0_0_10px_0_#0000001A] mb-7.5': hasShadow}"
    >
      <div class="relative flex-x-center w-full">
        <strong class="text-dim lg:text-2xl text-lg">
          <slot name="title">
            {{ title }}
          </slot>
        </strong>
        <template v-if="hasClose">
          <AtomicButton
            variant="icon"
            class="absolute top-0 right-4"
            @click="onClose"
          >
            <CrossSvg
              width="28"
              height="28"
            />
          </AtomicButton>
        </template>
      </div>
      <slot name="search" />
    </header>

    <main
      class="text-center text-sm px-5"
      :class="contentClass"
    >
      <slot name="default">
        {{ content }}
      </slot>
    </main>


    <div
      class="pt-2.5 pb-3.5 lg:pt-7.5 px-5"
      :class="{'shadow-[0_0_10px_0_#0000001A]': hasShadow, '!lg:pt-4': $slots.footer}"
    >
      <slot name="footer" />
      <div
        class="flex-x-center gap-x-2.5"
        :class="{'lg:pt-4': $slots.footer}"
      >
        <template v-if="hasCancel">
          <AtomicButton
            theme="dim"
            class=" w-full"
            @click="onCancel"
          >
            {{ cancelText }}
          </AtomicButton>
        </template>
        <AtomicButton
          class="w-full"
          @click="onConfirm"
        >
          {{ confirmText }}
        </AtomicButton>
      </div>
    </div>
  </VueFinalModal>
</template>

