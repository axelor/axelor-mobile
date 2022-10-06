class ManufacturingOrder {
  static status = {
    Draft: 1,
    Canceled: 2,
    Planned: 3,
    InProgress: 4,
    StandBy: 5,
    Finished: 6,
    Merged: 7,
  };

  static type = {
    production: 1,
    permanent: 2,
    maintenance: 3,
  };

  static priority = {
    Low: 1,
    Normal: 2,
    High: 3,
    Urgent: 4,
  };

  static getStatus = (select, I18n = {t: () => {}}) => {
    if (I18n) {
      switch (select) {
        case this.status.Draft:
          return I18n.t('Manufacturing_Status_Draft');
        case this.status.Planned:
          return I18n.t('Manufacturing_Status_Planned');
        case this.status.InProgress:
          return I18n.t('Manufacturing_Status_InProgress');
        case this.status.StandBy:
          return I18n.t('Manufacturing_Status_StandBy');
        case this.status.Finished:
          return I18n.t('Manufacturing_Status_Finished');
        case this.status.Merged:
          return I18n.t('Manufacturing_Status_Merged');
        case this.status.Canceled:
          return I18n.t('Manufacturing_Status_Canceled');
        default:
          console.warn(
            `Status provided with value ${select} is not supported by manufacturing order`,
          );
          return null;
      }
    }
  };

  static getStatusColor = (status, Colors) => {
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
      case this.status.InProgress:
        return {
          backgroundColor: Colors.progressColor_light,
          borderColor: Colors.progressColor,
        };
      case this.status.StandBy:
        return {
          backgroundColor: Colors.cautionColor_light,
          borderColor: Colors.cautionColor,
        };
      case this.status.Finished:
        return {
          backgroundColor: Colors.primaryColor_light,
          borderColor: Colors.primaryColor,
        };
      case this.status.Merged:
        return {
          backgroundColor: Colors.priorityColor_light,
          borderColor: Colors.priorityColor,
        };
      case this.status.Canceled:
        return {
          backgroundColor: Colors.errorColor_light,
          borderColor: Colors.errorColor,
        };
      default:
        console.warn(
          `Status provided with value ${status} is not supported by manufacturing order`,
        );
        return {};
    }
  };

  static getPriority = (select, I18n = {t: () => {}}) => {
    if (I18n) {
      switch (select) {
        case this.priority.Low:
          return I18n.t('Manufacturing_Priority_Low');
        case this.priority.Normal:
          return I18n.t('Manufacturing_Priority_Normal');
        case this.priority.High:
          return I18n.t('Manufacturing_Priority_High');
        case this.priority.Urgent:
          return I18n.t('Manufacturing_Priority_Urgent');
        default:
          console.warn(
            `Priority provided with value ${select} is not supported by manufacturing order`,
          );
          return null;
      }
    }
  };

  static getPriorityColor = (status, Colors) => {
    switch (status) {
      case this.priority.Low:
        return {
          backgroundColor: Colors.plannedColor_light,
          borderColor: Colors.plannedColor,
        };
      case this.priority.Normal:
        return {
          backgroundColor: Colors.priorityColor_light,
          borderColor: Colors.priorityColor,
        };
      case this.priority.High:
        return {
          backgroundColor: Colors.cautionColor_light,
          borderColor: Colors.cautionColor,
        };
      case this.priority.Urgent:
        return {
          backgroundColor: Colors.errorColor_light,
          borderColor: Colors.errorColor,
        };
      default:
        console.warn(
          `Priority provided with value ${status} is not supported by manufacturing order`,
        );
        return {};
    }
  };
}

export default ManufacturingOrder;
