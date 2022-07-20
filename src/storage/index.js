import {mmkvStorage} from './mmkv';

class Storage {
  constructor() {
    this.storage = mmkvStorage;
  }

  contains(key) {
    return this.storage.contains(key);
  }

  setItem(key, value) {
    if (value instanceof Object || value instanceof Array) {
      this.storage.set(key, JSON.stringify(value));
    } else {
      this.storage.set(key, value);
    }
  }

  getItem(key) {
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
export const storage = new Storage();

export function useStorage() {
  return storage;
}
