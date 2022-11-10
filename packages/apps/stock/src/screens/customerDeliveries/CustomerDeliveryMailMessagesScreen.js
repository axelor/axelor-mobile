import React from 'react';
import {MailMessageView} from '@aos-mobile/core';

const CustomerDeliveryMailMessagesScreen = ({route}) => {
  return (
    <MailMessageView
      model="com.axelor.apps.stock.db.StockMove"
      modelId={route.params.customerDeliveryId}
    />
  );
};

export default CustomerDeliveryMailMessagesScreen;
