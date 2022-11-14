import React from 'react';
import {MailMessageView} from '@aos-mobile/core';

const OperationOrderMailMessagesScreen = ({route}) => {
  return (
    <MailMessageView
      model="com.axelor.apps.production.db.OperationOrder"
      modelId={route.params.operationOrderId}
    />
  );
};

export default OperationOrderMailMessagesScreen;
