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

  static getStatusColor = (status, Colors) => {
    switch (status) {
      case 'Draft':
        return {
          backgroundColor: Colors.secondaryColor_light,
          borderColor: Colors.secondaryColor,
        };
      case 'Validated':
        return {
          backgroundColor: Colors.primaryColor_light,
          borderColor: Colors.primaryColor,
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
