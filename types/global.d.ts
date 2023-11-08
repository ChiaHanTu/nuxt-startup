// utils
declare global {
  type PickPartial<T, K extends keyof T> = Omit<T, K> & Pick<Partial<T>, K>;
  type PickRequired<T, K extends keyof T> = T & Pick<Required<T>, K>;
  type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T);
  type ComponentProps<C> = Omit<InstanceType<C>["$props"], keyof VNodeProps>;
  type AwaitedReturn<T extends (...args: any) => any> = Awaited<ReturnType<T>>;
  type Override<T, U> = Omit<T, keyof U> & U;
  type MaybeArray<T> = T | T[];
  type UnMaybeArray<T> = T extends Array<infer V> ? V : T;
  type MaybePromise<T> = T | Promise<T>;
  type MaybeNull<T> = T | null;

  /**
   * @see [Microsoft/TypeScript#29729](https://github.com/Microsoft/TypeScript/issues/29729)
   */
  type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);
}

declare global {
  interface ObjectConstructor {
    fromEntries<T = any, K = string>(entries: Iterable<readonly [K, T]>): Record<K, T>;
  }
}

export {};
