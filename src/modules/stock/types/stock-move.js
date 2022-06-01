import Colors from '@/types/colors';

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

  static getStatusColor = status => {
    switch (status) {
      case 'Draft':
        return {
          backgroundColor: Colors.background.grey,
          borderColor: Colors.border.grey,
        };
      case 'Planned':
        return {
          backgroundColor: Colors.background.purple,
          borderColor: Colors.border.purple,
        };
      case 'Realized':
        return {
          backgroundColor: Colors.background.green,
          borderColor: Colors.border.green,
        };
      case 'Canceled':
        return {
          backgroundColor: Colors.background.red,
          borderColor: Colors.border.red,
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

  static getAvailabilityColor = availability => {
    switch (availability) {
      case 'Available':
        return {
          backgroundColor: Colors.background.green,
          borderColor: Colors.border.green,
        };
      case 'Partially':
        return {
          backgroundColor: Colors.background.orange,
          borderColor: Colors.border.orange,
        };
      case 'Unavailable':
        return {
          backgroundColor: Colors.background.red,
          borderColor: Colors.border.red,
        };
      default:
        console.warn(
          `Availability provided with value ${availability} is not supported by stock move`,
        );
        return {};
    }
  };
}

export default StockMove;
