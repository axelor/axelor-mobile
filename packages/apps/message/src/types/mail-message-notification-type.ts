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

class MailMessageNotificationType {
  static style = {
    Default: 'default',
    Important: 'important',
    Success: 'success',
    Warning: 'warning',
    Inverse: 'inverse',
    Info: 'info',
  };

  static getTagColor = (style: string, Colors: ThemeColors) => {
    switch (style) {
      case this.style.Default:
        return Colors.defaultColor;
      case this.style.Important:
        return Colors.importantColor;
      case this.style.Success:
        return Colors.successColor;
      case this.style.Warning:
        return Colors.warningColor;
      case this.style.Inverse:
        return Colors.inverseColor;
      case this.style.Info:
        return Colors.infoColor;
      default:
        console.warn(
          `Style provided with value ${style} is not supported by Mail Message Tag`,
        );
        return null;
    }
  };
}

export default MailMessageNotificationType;
