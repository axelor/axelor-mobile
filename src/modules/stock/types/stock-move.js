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

  static getStatus = select => {
    switch (select) {
      case this.status.Draft:
        return 'Draft';
      case this.status.Planned:
        return 'Planned';
      case this.status.Realized:
        return 'Realized';
      case this.status.Canceled:
        return 'Canceled';
      default:
        console.warn(
          `Status provided with value ${select} is not supported by stock move`,
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
      case 'Realized':
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

  static getAvailability = select => {
    switch (select) {
      case this.availability.Available:
        return 'Available';
      case this.availability.Partially_available:
        return 'Partially';
      case this.availability.Unavailable:
        return 'Unavailable';
      default:
        console.warn(
          `Availability provided with value ${select} is not supported by stock move`,
        );
        return null;
    }
  };

  static getAvailabilityColor = (availability, Colors) => {
    switch (availability) {
      case 'Available':
        return {
          backgroundColor: Colors.primaryColor_light,
          borderColor: Colors.primaryColor,
        };
      case 'Partially':
        return {
          backgroundColor: Colors.cautionColor_light,
          borderColor: Colors.cautionColor,
        };
      case 'Unavailable':
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

  static conformitySelection = [
    {name: 'Compliant', id: this.conformity.Compliant},
    {name: 'Non Compliant', id: this.conformity.Non_Compliant},
  ];

  static getConformity = select => {
    switch (select) {
      case this.conformity.Unknown:
        return '';
      case this.conformity.None:
        return ' ';
      case this.conformity.Compliant:
        return 'Compliant';
      case this.conformity.Non_Compliant:
        return 'Non Compliant';
      default:
        console.warn(
          `Conformity provided with value ${select} is not supported by stock move`,
        );
        return null;
    }
  };
}

export default StockMove;
