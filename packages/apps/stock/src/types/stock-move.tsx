import {ThemeColors} from '@aos-mobile/ui';
import {TranslatorProps} from '@aos-mobile/core';

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

  static getStatusColor = (
    status: number,
    Colors: ThemeColors,
  ): {backgroundColor?: string; borderColor?: string} => {
    switch (status) {
      case this.status.Draft:
        return {
          backgroundColor: Colors.secondaryColor_light,
          borderColor: Colors.secondaryColor,
        };
      case this.status.Planned:
        return {
          backgroundColor: Colors.plannedColor_light,
          borderColor: Colors.plannedColor,
        };
      case this.status.Realized:
        return {
          backgroundColor: Colors.primaryColor_light,
          borderColor: Colors.primaryColor,
        };
      case this.status.Canceled:
        return {
          backgroundColor: Colors.errorColor_light,
          borderColor: Colors.errorColor,
        };
      default:
        console.warn(
          `Status provided with value ${status} is not supported by stock move`,
        );
        return {};
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
  ): {backgroundColor?: string; borderColor?: string} => {
    switch (availability) {
      case this.availability.Available:
        return {
          backgroundColor: Colors.primaryColor_light,
          borderColor: Colors.primaryColor,
        };
      case this.availability.Partially_available:
        return {
          backgroundColor: Colors.cautionColor_light,
          borderColor: Colors.cautionColor,
        };
      case this.availability.Unavailable:
        return {
          backgroundColor: Colors.errorColor_light,
          borderColor: Colors.errorColor,
        };
      default:
        console.warn(
          `Availability provided with value ${availability} is not supported by stock move`,
        );
        return {};
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
}

export default StockMove;
