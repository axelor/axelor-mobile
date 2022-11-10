import React from 'react';
import {MailMessageView} from '@aos-mobile/core';

const InventoryMailMessagesScreen = ({route}) => {
  return (
    <MailMessageView
      model="com.axelor.apps.stock.db.Inventory"
      modelId={route.params.inventoryId}
    />
  );
};

export default InventoryMailMessagesScreen;
