import {MMKV} from 'react-native-mmkv';

interface InternalStorage {
  set(key: string, value: any): void;
  getString(key: string): string | undefined;
  contains(key: string): boolean;
  clearAll(): void;
}

class Storage {
  constructor(private storage: InternalStorage) {}

  contains(key: string): boolean {
    return this.storage.contains(key);
  }

  setItem(key: string, value: any) {
    if (value instanceof Object || value instanceof Array) {
      this.storage.set(key, JSON.stringify(value));
    } else {
      this.storage.set(key, value);
    }
  }

  getItem(key: string) {
    const strItem = this.storage.getString(key);
    try {
      const item = JSON.parse(strItem);
      return item;
    } catch (e) {
      return strItem;
    }
  }

  clearAll() {
    this.storage.clearAll();
  }
}

export const storage = new Storage(new MMKV());

export function useStorage() {
  return storage;
}
