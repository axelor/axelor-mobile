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

import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation, useTranslator} from '@axelor/aos-mobile-core';
import {Alert, RadioSelect} from '@axelor/aos-mobile-ui';
import {ControlEntry} from '../../../types';

interface FillingMethodAlertProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const FillingMethodAlert = ({visible, setVisible}: FillingMethodAlertProps) => {
  const navigation = useNavigation();
  const I18n = useTranslator();

  const [selectedMode, setSelectedMode] = useState<string>(null);

  return (
    <Alert
      visible={visible}
      title={I18n.t('Quality_FillingMethod')}
      style={styles.popup}
      cancelButtonConfig={{
        width: '15%',
        title: null,
        onPress: () => {
          setVisible(false);
        },
      }}
      confirmButtonConfig={{
        width: '15%',
        title: null,
        disabled: selectedMode == null,
        onPress: () => {
          setVisible(false);
          navigation.navigate('ControlEntryFormScreen', {
            selectedMode: selectedMode,
          });
        },
      }}>
      <RadioSelect
        direction="column"
        itemStyle={styles.radioSelect}
        items={ControlEntry.getFillingMethods(I18n)}
        onChange={setSelectedMode}
        radioButtonStyle={styles.radioButton}
      />
    </Alert>
  );
};

const styles = StyleSheet.create({
  radioSelect: {
    height: 150,
  },
  popup: {
    width: '80%',
  },
  radioButton: {
    width: 200,
  },
});

export default FillingMethodAlert;
