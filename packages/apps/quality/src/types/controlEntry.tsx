/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {TranslatorProps} from '@axelor/aos-mobile-core';

class ControlEntry {
  static status = {
    Draft: 1,
    InProgress: 2,
    Completed: 3,
    Canceled: 4,
  };

  static sampleResult = {
    NotControlled: 1,
    Compliant: 2,
    NotCompliant: 3,
  };

  static fillingMethod = {
    Sample: 'sample',
    Characteristic: 'characteristic',
  };

  static getStatus = (select: number, I18n: TranslatorProps): string => {
    if (I18n) {
      switch (select) {
        case this.status.Draft:
          return I18n.t('Quality_Status_Draft');
        case this.status.InProgress:
          return I18n.t('Quality_Status_InProgress');
        case this.status.Completed:
          return I18n.t('Quality_Status_Completed');
        case this.status.Canceled:
          return I18n.t('Quality_Status_Canceled');
        default:
          console.warn(
            `Status provided with value ${select} is not supported by control entry`,
          );
          return null;
      }
    }
  };

  static getStatusColor = (status: number, Colors: ThemeColors): Color => {
    switch (status) {
      case this.status.Draft:
        return Colors.secondaryColor;
      case this.status.InProgress:
        return Colors.progressColor;
      case this.status.Completed:
        return Colors.successColor;
      case this.status.Canceled:
        return Colors.errorColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by control entry`,
        );
        return null;
    }
  };

  static getStatusList = (
    Colors: ThemeColors,
    I18n: {t: (key: string) => string},
  ) => {
    return Object.entries(this.status).map(([key, value]) => ({
      title: I18n.t(`Quality_Status_${key}`),
      color: this.getStatusColor(value, Colors),
      key: value,
    }));
  };

  static getSampleResultColor = (
    sampleResult: number,
    Colors: ThemeColors,
  ): Color => {
    switch (sampleResult) {
      case this.sampleResult.Compliant:
        return Colors.successColor;
      case this.sampleResult.NotCompliant:
        return Colors.errorColor;
      case this.sampleResult.NotControlled:
        return Colors.secondaryColor;
      default:
        console.warn(
          `Sample result provided with value ${sampleResult} is not supported by control entry`,
        );
        return null;
    }
  };

  static getSampleResultTitle = (
    sampleResult: number,
    I18n: TranslatorProps,
  ): string => {
    if (I18n) {
      switch (sampleResult) {
        case this.sampleResult.Compliant:
          return I18n.t('Quality_ControlResult_Compliant');
        case this.sampleResult.NotCompliant:
          return I18n.t('Quality_ControlResult_NotCompliant');
        case this.sampleResult.NotControlled:
          return I18n.t('Quality_ControlResult_NotControlled');
        default:
          console.warn(
            `Sample result provided with value ${sampleResult} is not supported by control entry`,
          );
          return null;
      }
    }
  };

  static getSampleResultType = (sampleResult: number): string => {
    switch (sampleResult) {
      case this.sampleResult.Compliant:
        return 'success';
      case this.sampleResult.NotCompliant:
        return 'error';
      case this.sampleResult.NotControlled:
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
