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

interface Anomaly {
  version: number;
  message: string;
  checkType: string;
  modelName: string;
}

class Anomaly {
  static type = {
    Error: 'error',
    Alert: 'alert',
  };

  static getTypeColor = (type: string, Colors: ThemeColors) => {
    switch (type) {
      case this.type.Error:
        return Colors.errorColor;
      case this.type.Alert:
        return Colors.warningColor;
      default:
        console.warn(
          `Type provided with value ${type} is not supported by anomaly`,
        );
        return null;
    }
  };

  static sortType = (anomalyList: Anomaly[]) => {
    const BEFORE = -1;
    const EQUAL = 0;
    const AFTER = 1;

    if (!Array.isArray(anomalyList) || anomalyList.length === 0) {
      return [];
    }

    return anomalyList.sort((a: Anomaly, b: Anomaly) => {
      if (a.checkType === b.checkType) {
        return EQUAL;
      } else if (
        a.checkType === this.type.Error &&
        b.checkType === this.type.Alert
      ) {
        return BEFORE;
      } else {
        return AFTER;
      }
    });
  };
}

export default Anomaly;
