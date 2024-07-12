/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

type Callback = (scrollEnabled: boolean) => void;

class ScrollProvider {
  private scrollEnabled: boolean;
  private subscribers: Callback[];

  constructor() {
    this.scrollEnabled = true;
    this.subscribers = [];
  }

  getScrollEnabled() {
    return this.scrollEnabled;
  }

  setScrollEnabled(scrollEnabled: boolean) {
    this.scrollEnabled = scrollEnabled;
    this.subscribers.forEach(callback => callback(scrollEnabled));
  }

  subscribe(callback: Callback) {
    if (!this.subscribers.includes(callback)) {
      this.subscribers.push(callback);
    }
  }

  unsubscribe(callback: Callback) {
    this.subscribers = this.subscribers.filter(
      _callback => _callback !== callback,
    );
  }
}

export const scrollProvider = new ScrollProvider();
