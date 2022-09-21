import axios from 'axios';

const FUNCTIONAL_ABNORMALITY = 1;
const CONFIGURATION_PROBLEM = 4;

export default class TraceBackApiAxelor {
  constructor(userId) {
    this.userId = userId;
  }

  async postError(message, cause) {
    axios.put('/ws/rest/com.axelor.exception.db.TraceBack', {
      data: {
        origin: 'mobile app',
        typeSelect: FUNCTIONAL_ABNORMALITY,
        categorySelect: CONFIGURATION_PROBLEM,
        date: new Date(),
        exception: message,
        message: message,
        cause: JSON.stringify(cause),
        internalUser: {id: this.userId},
      },
    });
  }
}
