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

export interface ConfirmationConfig {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
}

type ConfirmationListener = (config: ConfirmationConfig | null) => void;

/* Opens the confirmation popup from anywhere, also outside React components
   (registered actions, providers). The popup itself is ConfirmationHost. */
class ConfirmationProvider {
  private listeners: ConfirmationListener[] = [];

  registerListener(listener: ConfirmationListener) {
    this.listeners.push(listener);
  }

  unregisterListener(listener: ConfirmationListener) {
    this.listeners = this.listeners.filter(_l => _l !== listener);
  }

  open(config: ConfirmationConfig) {
    this.listeners.forEach(_l => _l(config));
  }

  close() {
    this.listeners.forEach(_l => _l(null));
  }
}

export const confirmationProvider = new ConfirmationProvider();
