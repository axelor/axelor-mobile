import React from 'react';
import {MailMessageView} from '@aos-mobile/core';

const StockCorrectionMailMessagesScreen = ({route}) => {
  return (
    <MailMessageView
      model="com.axelor.apps.stock.db.StockCorrection"
      modelId={route.params.stockCorrectionId}
    />
  );
};

export default StockCorrectionMailMessagesScreen;
