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

class QualityImprovement {
  static Steps = {
    detection: 0,
    identification: 1,
    defaults: 2,
  };

  static getStepValues = () => {
    return [
      {titleKey: 'Quality_Detection', value: this.Steps.detection},
      {titleKey: 'Quality_Identification', value: this.Steps.identification},
      {titleKey: 'Quality_Defaults', value: this.Steps.defaults},
    ];
  };

  static mergeDefectLine = (lines: any[], line: any): any[] => {
    const _lines = lines ?? [];

    if (line == null) return _lines;

    if (_lines.some(_item => _item.id === line.id))
      return _lines.map(_item =>
        _item.id === line.id ? {..._item, ...line} : _item,
      );

    return [..._lines, line];
  };
}

export default QualityImprovement;
