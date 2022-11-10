import React from 'react';
import {MailMessageView} from '@aos-mobile/core';

const InternalMoveMailMessagesScreen = ({route}) => {
  return (
    <MailMessageView
      model="com.axelor.apps.stock.db.StockMove"
      modelId={route.params.internalMoveId}
    />
  );
};

export default InternalMoveMailMessagesScreen;
