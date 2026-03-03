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

import {ThemeColors} from '@axelor/aos-mobile-ui';
import {TranslatorProps} from '@axelor/aos-mobile-core';

class MailMessageType {
  static status = {
    all: 'all',
    comment: 'comment',
    notification: 'notification',
  };

  static isTypeSelected = (
    selectedStatus: any[],
    typeValue: string,
  ): boolean => {
    if (Array.isArray(selectedStatus) && selectedStatus.length > 0) {
      return selectedStatus.find(_i => _i.key === typeValue);
    }

    return false;
  };

  static getSelectionItems = (
    I18n: TranslatorProps,
    Colors: ThemeColors,
    selectedStatus: any[],
  ) => {
    return [
      {
        title: I18n.t('Base_All'),
        color: Colors.primaryColor,
        isActive:
          selectedStatus.length === 0 ||
          this.isTypeSelected(selectedStatus, this.status.all),
        key: this.status.all,
      },
      {
        title: I18n.t('Base_Comments'),
        color: Colors.primaryColor,
        isActive: this.isTypeSelected(selectedStatus, this.status.comment),
        key: this.status.comment,
      },
      {
        title: I18n.t('Message_Notifications'),
        color: Colors.primaryColor,
        isActive: this.isTypeSelected(selectedStatus, this.status.notification),
        key: this.status.notification,
      },
    ];
  };
}

export default MailMessageType;
