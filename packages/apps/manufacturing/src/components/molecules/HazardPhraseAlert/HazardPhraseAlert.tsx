import React from 'react';
import {Alert} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {HazardPhraseList} from '../../atoms';

interface HazardPhraseAlertProps {
  isVisible?: boolean;
  data: any[];
  handleClose: () => void;
}

const HazardPhraseAlert = ({
  isVisible = false,
  data,
  handleClose,
}: HazardPhraseAlertProps) => {
  const I18n = useTranslator();

  return (
    <Alert
      visible={isVisible}
      title={I18n.t('Manufacturing_Caution')}
      confirmButtonConfig={{title: I18n.t('Base_OK'), onPress: handleClose}}
      translator={I18n.t}>
      <HazardPhraseList data={data} />
    </Alert>
  );
};

export default HazardPhraseAlert;
