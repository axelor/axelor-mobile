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

import {getTypes, TranslatorProps} from '@axelor/aos-mobile-core';

class ControlEntry {
  static fillingMethod = {
    Sample: 'sample',
    Characteristic: 'characteristic',
  };

  static getSampleResultType = (sampleResult: number): string => {
    const ControlEntrySample = getTypes().ControlEntrySample;

    switch (sampleResult) {
      case ControlEntrySample?.resultSelect.Compliant:
        return 'success';
      case ControlEntrySample?.resultSelect.NotCompliant:
        return 'error';
      case ControlEntrySample?.resultSelect.NotControlled:
        return 'neutral';
      default:
        console.warn(
          `Sample result provided with value ${sampleResult} is not supported by control entry`,
        );
        return 'error';
    }
  };

  static getFillingMethods = (I18n: TranslatorProps) => {
    return Object.entries(this.fillingMethod).map(([key, value]) => ({
      title: I18n.t(`Quality_FillingMethod_${key}`),
      id: value,
    }));
  };

  static getMethodAssociatedAttribut = (fillingMethod: string): string => {
    switch (fillingMethod) {
      case this.fillingMethod.Sample:
        return 'controlEntrySample';
      case this.fillingMethod.Characteristic:
        return 'controlPlanLine';
      default:
        console.warn(
          `Filling method provided with value ${fillingMethod} is not supported by control entry`,
        );
        return null;
    }
  };

  static getMethodTotals = (
    fillingMethod: string,
    nbCharacteristic: number,
    nbSample: number,
  ): {nbItemInCategory: number; nbCategories: number} => {
    switch (fillingMethod) {
      case this.fillingMethod.Sample:
        return {nbItemInCategory: nbCharacteristic, nbCategories: nbSample};
      case this.fillingMethod.Characteristic:
        return {nbItemInCategory: nbSample, nbCategories: nbCharacteristic};
      default:
        console.warn(
          `Filling method provided with value ${fillingMethod} is not supported by control entry`,
        );
        return {nbItemInCategory: 0, nbCategories: 0};
    }
  };

  static getMethodIcons = (
    fillingMethod: string,
  ): {categoryIcon: string; subCategoryIcon: string} => {
    switch (fillingMethod) {
      case this.fillingMethod.Sample:
        return {categoryIcon: 'eyedropper', subCategoryIcon: 'palette2'};
      case this.fillingMethod.Characteristic:
        return {categoryIcon: 'palette2', subCategoryIcon: 'eyedropper'};
      default:
        console.warn(
          `Filling method provided with value ${fillingMethod} is not supported by control entry`,
        );
        return {categoryIcon: null, subCategoryIcon: null};
    }
  };
}

export default ControlEntry;
