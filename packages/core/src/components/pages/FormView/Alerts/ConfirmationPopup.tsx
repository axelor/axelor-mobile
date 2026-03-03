/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
