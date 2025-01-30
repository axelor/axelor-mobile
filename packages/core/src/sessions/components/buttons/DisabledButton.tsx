/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';

const DisabledButton = ({
  title,
  onPress,
  onDisabledPress = () => {},
  disabled,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title={I18n.t(title)}
        onPress={disabled ? onDisabledPress : onPress}
        color={disabled ? Colors.secondaryColor : Colors.primaryColor}
      />
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    button: {
      marginTop: 15,
      width: 150,
      height: 30,
      elevation: 5,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
    },
  });

export default DisabledButton;
