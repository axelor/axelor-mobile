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

import {ThemeColors} from '@axelor/aos-mobile-ui';

class MailMessageType {
  static status = {
    comment: 'comment',
    notification: 'notification',
  };

  static getSelectionItems = (
    I18n: {t: (key: string) => string},
    Colors: ThemeColors,
  ) => {
    return [
      {
        title: I18n.t('Base_Comments'),
        color: Colors.primaryColor,
        key: this.status.comment,
      },
      {
        title: I18n.t('Base_Notifications'),
        color: Colors.primaryColor,
        key: this.status.notification,
      },
    ];
  };
}

export default MailMessageType;
