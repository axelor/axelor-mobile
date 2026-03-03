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
import {StyleSheet, View} from 'react-native';
import {Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {getMonthName} from './agenda.helpers';

const MonthDisplay = ({
  date,
  isFirst = false,
}: {
  date: string | Date;
  isFirst?: boolean;
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <View style={[styles.container, isFirst ? styles.margin : undefined]}>
      <Text
        style={styles.text}
        textColor={Colors.secondaryColor.background}
        fontSize={20}>
        {I18n.t(getMonthName(date))}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  margin: {
    height: 120,
  },
  text: {
    alignSelf: 'center',
  },
});

export default MonthDisplay;
