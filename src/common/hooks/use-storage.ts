import { createUseStorageState, Options } from 'ahooks/lib/createUseStorageState';

type StorageType = 'localStorage' | 'sessionStorage';

type TOptions<T> = { type: StorageType } & Options<T>;

export function useStorage<T>(key: string, props: TOptions<T>) {
  const { type, ...rest } = props;

  const getStorage = type === 'localStorage' ? () => window.localStorage : () => window.sessionStorage;

  return createUseStorageState(getStorage)(key, rest);
}
