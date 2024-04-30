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

import {Color, ThemeColors} from '@axelor/aos-mobile-ui';

class ProjectType {
  static status = {
    New: 1,
    InProgress: 2,
    Done: 3,
    Canceled: 4,
  };

  static getStatus = (
    status: number,
    I18n: {t: (key: string) => string},
  ): string => {
    if (I18n) {
      switch (status) {
        case this.status.New:
          return I18n.t('Project_Status_New');
        case this.status.InProgress:
          return I18n.t('Project_Status_InProgress');
        case this.status.Done:
          return I18n.t('Project_Status_Done');
        case this.status.Canceled:
          return I18n.t('Project_Status_Canceled');
        default:
          console.warn(
            `Status provided with value ${status} is not supported by Project.`,
          );
          return null;
      }
    }
  };

  static getStatusColor = (status: number, Colors: ThemeColors): Color => {
    switch (status) {
      case this.status.New:
        return Colors.secondaryColor;
      case this.status.InProgress:
        return Colors.progressColor;
      case this.status.Done:
        return Colors.successColor;
      case this.status.Canceled:
        return Colors.errorColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by Project.`,
        );
        return null;
    }
  };
}

export default ProjectType;
