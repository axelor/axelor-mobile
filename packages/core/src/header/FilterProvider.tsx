/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

export interface Filter {
  id: string;
  name: string;
}

class FilterProvider {
  private activeFilter: Filter = null;
  private listeners: Function[] = [];

  register(callback: Function) {
    this.listeners.push(callback);
  }

  unregister(callback: Function) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  private notify() {
    this.listeners.forEach(callback => callback(this.activeFilter));
  }

  setActiveFilter(filter?: Filter) {
    this.activeFilter = filter;
    this.notify();
  }

  getActiveFilter() {
    return this.activeFilter;
  }
}

export const filterProvider = new FilterProvider();
