/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {StyleSheet} from 'react-native';
import {
  Button,
  PopUp,
  Text,
  UnorderedList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';

const ConstraintsValidatorPopup = ({
  onContinue,
  errors,
}: {
  onContinue: () => void;
  errors: string[];
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <PopUp
      visible={true}
      title={I18n.t('Base_Error')}
      data={I18n.t('Base_InvalidConstraints')}
      style={styles.popup}
      childrenStyle={styles.btnContainer}>
      <UnorderedList
        data={errors}
        renderItem={({item}) => <Text>{item}</Text>}
      />
      <Button
        title={I18n.t('Base_OK')}
        color={Colors.primaryColor}
        onPress={onContinue}
        style={styles.btn}
      />
    </PopUp>
  );
};

const styles = StyleSheet.create({
  popup: {
    width: '90%',
    paddingHorizontal: 15,
    paddingRight: 15,
    paddingVertical: 15,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 70,
    marginVertical: '1%',
  },
});

export default ConstraintsValidatorPopup;
