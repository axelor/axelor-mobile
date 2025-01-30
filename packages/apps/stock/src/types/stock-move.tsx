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

class StockMove {
  static type = {
    internal: 1,
    outgoing: 2,
    incoming: 3,
  };

  static status = {
    Draft: 1,
    Planned: 2,
    Realized: 3,
    Canceled: 4,
  };

  static getStatus = (select: number, I18n: TranslatorProps): string => {
    if (I18n) {
      switch (select) {
        case this.status.Draft:
          return I18n.t('Stock_Status_Draft');
        case this.status.Planned:
          return I18n.t('Stock_Status_Planned');
        case this.status.Realized:
          return I18n.t('Stock_Status_Realized');
        case this.status.Canceled:
          return I18n.t('Stock_Status_Canceled');
        default:
          console.warn(
            `Status provided with value ${select} is not supported by stock move`,
          );
          return null;
      }
    }
  };

  static getStatusColor = (status: number, Colors: ThemeColors): Color => {
    switch (status) {
      case this.status.Draft:
        return Colors.secondaryColor;
      case this.status.Planned:
        return Colors.plannedColor;
      case this.status.Realized:
        return Colors.successColor;
      case this.status.Canceled:
        return Colors.errorColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by stock move`,
        );
        return null;
    }
  };

  static availability = {
    Available: 1,
    Partially_available: 2,
    Unavailable: 3,
  };

  static getAvailability = (select: number, I18n: TranslatorProps): string => {
    if (I18n) {
      switch (select) {
        case this.availability.Available:
          return I18n.t('Stock_Available');
        case this.availability.Partially_available:
          return I18n.t('Stock_Partially');
        case this.availability.Unavailable:
          return I18n.t('Stock_Unavailable');
        default:
          console.warn(
            `Availability provided with value ${select} is not supported by stock move`,
          );
          return null;
      }
    }
  };

  static getAvailabilityColor = (
    availability: number,
    Colors: ThemeColors,
  ): Color => {
    switch (availability) {
      case this.availability.Available:
        return Colors.successColor;
      case this.availability.Partially_available:
        return Colors.cautionColor;
      case this.availability.Unavailable:
        return Colors.errorColor;
      default:
        console.warn(
          `Availability provided with value ${availability} is not supported by stock move`,
        );
        return null;
    }
  };

  static conformity = {
    Unknown: 0,
    None: 1,
    Compliant: 2,
    Non_Compliant: 3,
  };

  static getConformitySelection = (
    I18n: TranslatorProps,
  ): {name: string; id: number}[] => {
    return [
      {name: I18n.t('Stock_Compliant'), id: this.conformity.Compliant},
      {name: I18n.t('Stock_NonCompliant'), id: this.conformity.Non_Compliant},
    ];
  };

  static getConformity = (select: number, I18n: TranslatorProps): string => {
    switch (select) {
      case this.conformity.Unknown:
        return '';
      case this.conformity.None:
        return ' ';
      case this.conformity.Compliant:
        return I18n.t('Stock_Compliant');
      case this.conformity.Non_Compliant:
        return I18n.t('Stock_NonCompliant');
      default:
        console.warn(
          `Conformity provided with value ${select} is not supported by stock move`,
        );
        return null;
    }
  };

  static getStockMoveDate = (status: number, stockMove: any) => {
    switch (status) {
      case this.status.Draft:
        return stockMove?.createdOn;
      case this.status.Planned:
        return stockMove?.estimatedDate;
      case this.status.Realized:
        return stockMove?.realDate;
      case this.status.Canceled:
        return stockMove?.realDate;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by stock move`,
        );
        return null;
    }
  };

  static isTrackingNumberSelectVisible = (
    status: number,
    product: any,
    trackingNumber: any,
  ) => {
    return (
      product?.trackingNumberConfiguration != null &&
      trackingNumber == null &&
      status === this.status.Planned
    );
  };
}

export default StockMove;
