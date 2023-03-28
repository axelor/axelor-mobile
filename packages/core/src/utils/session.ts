import {storage, Storage} from '../storage/Storage';

interface Session {
  id: number;
  url: string;
  username: string;
  name: string;
}

class SessionStorage {
  private key: string;

  constructor(private localStorage: Storage) {
    this.key = 'test';
  }

  addSession({data}: {data: Session}) {
    this.localStorage.setItem(this.key, data);
  }

  getSession() {
    const item = this.localStorage.getItem(this.key);
    return item;
  }
}

export const sessionStorage = new SessionStorage(storage);
