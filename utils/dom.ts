interface TraversalFunction {
  (
    container: HTMLElement,
    currentFocus: HTMLElement | null
  ): HTMLElement | null;
}

export const hasWindow = typeof window !== "undefined";

export function getOffsetTop() {
  if (!hasWindow) return 0;
  return window.scrollY || document.documentElement.scrollTop;
}

export function getOffsetLeft() {
  if (!hasWindow) return 0;
  return window.scrollX || document.documentElement.scrollLeft;
}

export function moveFocus(
  container: HTMLElement,
  currentFocus: HTMLElement | null,
  traversalFn: TraversalFunction
) {
  let nextFocus = traversalFn(container, currentFocus);
  // NOTE: 確認為何在 Vue 2 不會取得 #text element，但 Vue 3 會，儘管不存在。
  while (nextFocus) {
    const nextFocusDisabled =
      nextFocus.getAttribute?.("aria-disabled") === "true";

    if (!nextFocus.hasAttribute?.("tabindex") || nextFocusDisabled) {
      // Move to the next element.
      nextFocus = traversalFn(container, nextFocus);
    } else {
      nextFocus.focus();
      return true;
    }
  }
  return false;
}

export function nextItem(
  container: HTMLElement,
  item: HTMLElement | null
): HTMLElement | null {
  if (item && item.nextElementSibling) {
    return item.nextElementSibling as HTMLElement;
  }

  return container.firstChild as HTMLElement | null;
}

export function previousItem(
  container: HTMLElement,
  item: HTMLElement | null
): HTMLElement | null {
  if (item && item.previousElementSibling) {
    return item.previousElementSibling as HTMLElement;
  }
  return container.lastChild as HTMLElement | null;
}
