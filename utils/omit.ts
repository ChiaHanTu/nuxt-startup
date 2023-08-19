function omit<Key extends string, T extends Record<Key, any>>(
  source: T,
  keys: Key | Key[]
): Omit<T, Key>;

function omit<Key extends string, T extends Record<string, any>>(
  source: T,
  keys: Key | Key[]
): Omit<T, Key>;

function omit<Key extends string, T extends Record<string, any>>(
  source: T,
  keys: Key | Key[]
): Omit<T, Key> {
  const copy = { ...source };

  keys = Array.isArray(keys) ? keys : [keys];

  for (const key of keys) {
    delete copy[key];
  }

  return copy;
}

export default omit;
