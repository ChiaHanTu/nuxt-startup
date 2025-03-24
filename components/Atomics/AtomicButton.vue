<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';
import { computed, resolveComponent } from 'vue';

import isNullOrUndefined from '@/utils/isNullOrUndefined';

import type { RouteLocationRaw } from 'vue-router';
interface AtomicButtonProps {
  type?: ButtonHTMLAttributes['type'];

  // style
  variant?: 'contained' | 'outlined' | 'strong' | 'none' | 'icon';
  theme?: 'primary' | 'dim' | 'silver';
  size?: 'normal' | 'compact' | 'rectangle' | 'small';

  /**
   * - 當 `variant` 為 `outlined` 可使原本預設灰階的樣式直接亮起來
   */
  highlight?: boolean;

  /**
   * 如果有傳則會變成 `<AtomicLink :to="to" />`
   */
  to?: RouteLocationRaw;
}

const props = withDefaults(defineProps<AtomicButtonProps>(), {
  type: 'button',
  size: 'normal',
  theme: 'primary',
  variant: 'contained',
  to: undefined,
});

const NuxtLink = resolveComponent('NuxtLink');

const rootComponent = computed(() => {
  return isNullOrUndefined(props.to) ? 'button' : NuxtLink;
});

const rootClass = computed(() => {
  const BASIC_CLASS = 'atomic-button';
  const { size, theme, variant, highlight } = props;
  return [
    `${BASIC_CLASS}--${size}`,
    `${BASIC_CLASS}--${theme}`,
    `${BASIC_CLASS}--${variant}`,

    // 使否使顏色更突出
    highlight ? `${BASIC_CLASS}--highlight` : undefined,
  ];
});
</script>

<template>
  <Component
    :is="rootComponent"
    :type="rootComponent === 'button' ? type : undefined"
    :to="to"
    class="atomic-button"
    :class="rootClass"
  >
    <span v-if="$slots.prepend">
      <slot name="prepend" />
    </span>
    <span>
      <slot name="default" />
    </span>
    <span v-if="$slots.append">
      <slot name="append" />
    </span>
  </Component>
</template>

<style lang="scss">
$name: '.atomic-button';
$theme-list: (primary, dim, 'silver');

#{$name} {
  @apply inline-flex items-center justify-center;
  @apply text-center text-sm text-black;
  @apply rounded-[10px];
  @apply space-x-2.5;
  @apply border border-solid border-transparent;
  @apply transition-colors;

  // size
  &--normal {
    @apply h-11;
    @apply px-[34px];
  }

  &--compact {
    @apply h-11;
    @apply px-5;
  }

  &--rectangle {
    @apply h-8;
    @apply w-20 lg:w-[100px];
    @apply rounded-[5px];
  }

  &--small {
    @apply h-[34px];
    @apply px-5;
  }

  // variant
  &--contained {
    @apply font-medium text-black;

    &#{$name}--dim {
      @apply text-white;
    }

    @each $theme in $theme-list {
      &#{$name}--#{$theme} {
        @apply bg-#{$theme};
      }
    }

    &:disabled {
      @apply bg-primary-disabled cursor-not-allowed;
    }
  }

  &--outlined {
    @apply border-silver text-gray;
  }

  &--strong {
    @apply px-0;
    @apply text-primary font-bold;
  }

  &--none {
    @apply px-0;
    @apply text-black;
  }

  &--icon {
    @apply justify-center;
    @apply h-8 w-8;
    @apply p-0;
  }
}
</style>
