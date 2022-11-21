import React from 'react';
import {MailMessageView} from '../components';

const MailMessageScreen = ({route, navigation}) => {
  const {model, modelId} = route.params;
  return (
    <MailMessageView model={model} modelId={modelId} navigation={navigation} />
  );
};

export default MailMessageScreen;
