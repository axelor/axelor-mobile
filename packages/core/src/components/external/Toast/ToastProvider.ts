/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

class ToastProvider {
  private title: string;
  private message: string;
  private type: string;

  constructor() {
    this.title = '';
    this.message = '';
    this.type = '';
  }

  public getTitle() {
    return this.title;
  }

  public getMessage() {
    return this.message;
  }

  public getType() {
    return this.type;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public setMessage(message: string) {
    this.message = message;
  }

  public setType(type: string) {
    this.type = type;
  }
}

const toastProvider = new ToastProvider();

export default toastProvider;
