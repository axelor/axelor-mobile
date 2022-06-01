import Colors from '@/types/colors';

class StockCorrection {
  static status = {
    Draft: 1,
    Validated: 2,
  };

  static getStatus = select => {
    switch (select) {
      case this.status.Draft:
        return 'Draft';
      case this.status.Validated:
        return 'Validated';
      default:
        console.warn(
          `Status provided with value ${select} is not supported by stock correction`,
        );
        return null;
    }
  };

  static getStatusColor = status => {
    switch (status) {
      case 'Draft':
        return {
          backgroundColor: Colors.background.grey,
          borderColor: Colors.border.grey,
        };
      case 'Validated':
        return {
          backgroundColor: Colors.background.green,
          borderColor: Colors.border.green,
        };
      default:
        console.warn(
          `Status provided with value ${status} is not supported by stock correction`,
        );
        return {};
    }
  };
}

export default StockCorrection;
