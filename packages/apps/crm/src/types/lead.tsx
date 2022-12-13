import {Color, ThemeColors} from '@aos-mobile/ui';

class Lead {
  static getStatusColor = (index: number, Colors: ThemeColors): Color => {
    if (index === 0) {
      return Colors.primaryColor;
    } else if (index === 1) {
      return Colors.progressColor;
    } else if (index === 2) {
      return Colors.priorityColor;
    } else if (index === 3) {
      return Colors.errorColor;
    } else if (index === 4) {
      return Colors.cautionColor;
    } else if (index === 5) {
      return Colors.plannedColor;
    } else if (index === 6) {
      return Colors.secondaryColor;
    } else {
      Colors.primaryColor;
    }
  };
}
export default Lead;
