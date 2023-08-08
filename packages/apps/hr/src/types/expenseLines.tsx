class ExpenseLineType {
  static kilomectricTypeSelect = {
    OneWay: 1,
    RoundTrip: 2,
  };

  static getStatus = (select: number, I18n: {t: (key: string) => string}) => {
    if (I18n) {
      switch (select) {
        case this.kilomectricTypeSelect.OneWay:
          return I18n.t('Hr_kilomectricTypeSelect_OneWay');
        case this.kilomectricTypeSelect.RoundTrip:
          return I18n.t('Hr_kilomectricTypeSelect_RoundTrip');
        default:
          console.warn(
            `Status provided with value ${select} is not supported by Ticket`,
          );
          return null;
      }
    }
  };
}

export default ExpenseLineType;
