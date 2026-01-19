/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {MMKV} from 'react-native-mmkv';

interface InternalStorage {
  set(key: string, value: any): void;
  getString(key: string): string | undefined;
  contains(key: string): boolean;
  clearAll(): void;
  getAllKeys(): string[];
  delete(key: string): void;
}

export class Storage {
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
      console.warn('error while parsing storage item', e);
      return strItem;
    }
  }

  getAllKeys() {
    return this.storage.getAllKeys();
  }

  clearAll() {
    this.storage.clearAll();
  }

  deleteItem(key: string) {
    this.storage.delete(key);
  }
}

export const storage = new Storage(new MMKV());

export function useStorage() {
  return storage;
}
