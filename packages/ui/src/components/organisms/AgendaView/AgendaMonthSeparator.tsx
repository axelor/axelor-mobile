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

import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {getMonthTitleKey} from '../../../utils';
import {useThemeColor} from '../../../theme';
import {Text} from '../../atoms';

interface AgendaMonthSeparatorProps {
  monthKey: string;
  translator: (key: string) => string;
}

const AgendaMonthSeparator = ({
  monthKey,
  translator,
}: AgendaMonthSeparatorProps) => {
  const Colors = useThemeColor();
  const [year, month] = monthKey.split('-');

  return (
    <View style={styles.container}>
      <Text
        style={styles.text}
        textColor={Colors.secondaryColor.background}
        fontSize={20}>
        {`${translator(getMonthTitleKey(Number(month) - 1))} ${year}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  text: {
    alignSelf: 'center',
  },
});

export default memo(AgendaMonthSeparator);
