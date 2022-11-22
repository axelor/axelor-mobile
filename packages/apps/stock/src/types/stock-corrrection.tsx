import {Color, ThemeColors} from '@aos-mobile/ui';
import {TranslatorProps} from '@aos-mobile/core';

class StockCorrection {
  static status = {
    Draft: 1,
    Validated: 2,
  };

  static getStatus = (select: number, I18n: TranslatorProps): string => {
    switch (select) {
      case this.status.Draft:
        return I18n.t('Stock_Status_Draft');
      case this.status.Validated:
        return I18n.t('Stock_Status_Validated');
      default:
        console.warn(
          `Status provided with value ${select} is not supported by stock correction`,
        );
        return null;
    }
  };

  static getStatusColor = (status: number, Colors: ThemeColors): Color => {
    switch (status) {
      case this.status.Draft:
        return Colors.secondaryColor;
      case this.status.Validated:
        return Colors.primaryColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by stock correction`,
        );
        return null;
    }
  };
}

export default StockCorrection;
