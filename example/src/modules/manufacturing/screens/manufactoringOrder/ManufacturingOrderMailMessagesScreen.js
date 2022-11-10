import React from 'react';
import {MailMessageView} from '@aos-mobile/core';

const ManufacturingOrderMailMessagesScreen = ({route}) => {
  return (
    <MailMessageView
      model="com.axelor.apps.production.db.ManufOrder"
      modelId={route.params.manufOrderId}
    />
  );
};

export default ManufacturingOrderMailMessagesScreen;
