import {Color, ThemeColors} from '@aos-mobile/ui';

class Opportunity {
  static getStatusColor = (index: number, Colors: ThemeColors): Color => {
    switch (index) {
      case 0:
        return Colors.primaryColor;
      case 1:
        return Colors.progressColor;
      case 2:
        return Colors.priorityColor;
      case 3:
        return Colors.errorColor;
      case 4:
        return Colors.cautionColor;
      case 5:
        return Colors.plannedColor;
      default:
        return Colors.secondaryColor;
    }
  };

  static responseParser = (response: any): any => {
    const _currencySymbol = response['currency.symbol'];
    delete response['currency.symbol'];
    Object.assign(response, {currencySymbol: _currencySymbol});
    return response;
  };
}
export default Opportunity;
