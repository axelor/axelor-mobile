class Inventory {
  static status = {
    Draft: 1,
    Planned: 2,
    InProgress: 3,
    Completed: 4,
    Validated: 5,
    Canceled: 6,
  };

  static getStatus = select => {
    switch (select) {
      case this.status.Draft:
        return 'Draft';
      case this.status.Planned:
        return 'Planned';
      case this.status.InProgress:
        return 'In Progress';
      case this.status.Completed:
        return 'Completed';
      case this.status.Validated:
        return 'Validated';
      case this.status.Canceled:
        return 'Canceled';
      default:
        console.warn(
          `Status provided with value ${select} is not supported by inventory`,
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
      case 'Planned':
        return {
          backgroundColor: Colors.plannedColor_light,
          borderColor: Colors.plannedColor,
        };
      case 'In Progress':
        return {
          backgroundColor: Colors.progressColor_light,
          borderColor: Colors.progressColor,
        };
      case 'Completed':
        return {
          backgroundColor: Colors.priorityColor_light,
          borderColor: Colors.priorityColor,
        };
      case 'Validated':
        return {
          backgroundColor: Colors.primaryColor_light,
          borderColor: Colors.primaryColor,
        };
      case 'Canceled':
        return {
          backgroundColor: Colors.errorColor_light,
          borderColor: Colors.errorColor,
        };
      default:
        console.warn(
          `Status provided with value ${status} is not supported by inventory`,
        );
        return {};
    }
  };

  static getDate = item => {
    switch (item.statusSelect) {
      case this.status.Draft:
        return item.createdOn;
      case this.status.Planned:
        return item.plannedStartDateT;
      case this.status.InProgress:
        return item.plannedStartDateT;
      case this.status.Completed:
        return item.updatedOn;
      case this.status.Validated:
        return item.validatedOn;
      case this.status.Canceled:
        return item.updatedOn;
      default:
        console.warn(
          `Status provided with value ${item.statusSelect} is not supported by inventory`,
        );
        return null;
    }
  };
}
export default Inventory;
