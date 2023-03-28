import {storage, Storage} from '../storage/Storage';

class SessionStorage {
  private key: string;

  constructor(private localStorage: Storage) {
    this.key = 'test';
    this.recrypt();
  }

  insert({data}: {data: any}) {
    this.localStorage.setItem(this.key, data);
  }
  getItem() {
    const item = this.localStorage.getItem(this.key);
    return item;
  }
  recrypt() {
    this.localStorage.recrypt(this.key);
  }
}

export const sessionStorage = new SessionStorage(storage);
