import React from 'react';
import {MailMessageView} from '@aos-mobile/core';

const ProductMailMessagesScreen = ({route}) => {
  return (
    <MailMessageView
      model="com.axelor.apps.base.db.Product"
      modelId={route.params.productId}
    />
  );
};

export default ProductMailMessagesScreen;
