import React from 'react';
import {Alert, Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../../i18n';
import {StyleSheet} from 'react-native';

const ConfirmationPopup = ({
  visible,
  handleClose,
  handleConfirm,
}: {
  visible?: boolean;
  handleClose: () => void;
  handleConfirm?: () => void;
}) => {
  const I18n = useTranslator();

  return (
    <Alert
      visible={visible}
      title={I18n.t('Base_FormAction_Confirmation')}
      cancelButtonConfig={{
        title: null,
        width: null,
        onPress: handleClose,
      }}
      confirmButtonConfig={{
        title: null,
        width: null,
        onPress: handleConfirm,
      }}>
      <Text style={styles.content}>
        {I18n.t('Base_FormAction_DirtyStateConfirmation')}
      </Text>
    </Alert>
  );
};

const styles = StyleSheet.create({
  content: {
    textAlign: 'center',
    width: '110%',
  },
});
export default ConfirmationPopup;
