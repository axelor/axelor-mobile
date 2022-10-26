import React from 'react';
import {AttachedFilesView} from '@aos-mobile/core';

const OperationOrderAttachedFilesScreen = ({route}) => {
  return (
    <AttachedFilesView
      model="com.axelor.apps.production.db.OperationOrder"
      modelId={route.params.operationOrderId}
    />
  );
};

export default OperationOrderAttachedFilesScreen;
