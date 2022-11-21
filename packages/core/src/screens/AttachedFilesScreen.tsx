import React from 'react';
import {AttachedFilesView} from '../components';

const AttachedFilesScreen = ({route, navigation}) => {
  const {files, model, modelId, screenTitle} = route.params;
  const isStatic = files && files.length > 0;

  return (
    <AttachedFilesView
      files={files}
      model={model}
      modelId={modelId}
      screenTitle={screenTitle}
      navigation={navigation}
      isStaticList={isStatic}
      isMetaFile={isStatic}
    />
  );
};

export default AttachedFilesScreen;
