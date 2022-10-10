class StopwatchType {
  static status = {
    Ready: 1,
    InProgress: 2,
    Paused: 3,
    Finished: 4,
    Canceled: 5,
  };

  static getStatus = (select, I18n: {t: (key: string) => string}) => {
    if (I18n) {
      switch (select) {
        case this.status.Ready:
          return I18n.t('Stopwatch_Status_Ready');
        case this.status.InProgress:
          return I18n.t('Stopwatch_Status_InProgress');
        case this.status.Paused:
          return I18n.t('Stopwatch_Status_Paused');
        case this.status.Finished:
          return I18n.t('Stopwatch_Status_Finished');
        case this.status.Canceled:
          return I18n.t('Stopwatch_Status_Canceled');
        default:
          console.warn(
            `Status provided with value ${select} is not supported by stopwatch`,
          );
          return null;
      }
    }
  };

  static getStatusBorderColor = (status, Colors) => {
    switch (status) {
      case this.status.Ready:
        return Colors.secondaryColor;
      case this.status.InProgress:
        return Colors.progressColor;
      case this.status.Paused:
        return Colors.cautionColor;
      case this.status.Finished:
        return Colors.primaryColor;
      case this.status.Canceled:
        return Colors.errorColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by stopwatch`,
        );
        return {};
    }
  };
}

export default StopwatchType;
