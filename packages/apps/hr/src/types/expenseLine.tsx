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

class ExpenseLineType {
  static kilomectricTypeSelect = {
    OneWay: 1,
    RoundTrip: 2,
  };

  static getKilomectricTypeSelect = (
    select: number,
    I18n: {t: (key: string) => string},
  ) => {
    if (I18n) {
      switch (select) {
        case this.kilomectricTypeSelect.OneWay:
          return I18n.t('Hr_KilomectricTypeSelect_OneWay');
        case this.kilomectricTypeSelect.RoundTrip:
          return I18n.t('Hr_KilomectricTypeSelect_RoundTrip');
        default:
          console.warn(
            `KilomectricTypeSelect provided with value ${select} is not supported by ExpenseLine`,
          );
          return null;
      }
    }
  };
}

export default ExpenseLineType;
