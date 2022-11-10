import React from 'react';
import {MailMessageView} from '@aos-mobile/core';

const SupplierArrivalMailMessagesScreen = ({route}) => {
  return (
    <MailMessageView
      model="com.axelor.apps.stock.db.StockMove"
      modelId={route.params.supplierArrivalId}
    />
  );
};

export default SupplierArrivalMailMessagesScreen;
