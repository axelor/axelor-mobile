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

import {confirmationProvider} from '../confirmation/ConfirmationProvider';

/* Asks before a deletion that cannot be undone; onConfirm runs only on "Delete".
 * title and confirmLabel replace "Delete" for other destructive actions (unlink, archive).
 * Shown in the app popup (ConfirmationHost), so it can be called outside components. */
export const askDeleteConfirmation = ({
  translator,
  onConfirm,
  message,
  title,
  confirmLabel,
}: {
  translator: (key: string) => string;
  onConfirm: () => void;
  message?: string;
  title?: string;
  confirmLabel?: string;
}) => {
  confirmationProvider.open({
    title: title ?? translator('Base_Delete'),
    message: message ?? translator('Base_DeleteConfirmation'),
    confirmLabel: confirmLabel ?? title ?? translator('Base_Delete'),
    cancelLabel: translator('Base_Cancel'),
    onConfirm,
  });
};
