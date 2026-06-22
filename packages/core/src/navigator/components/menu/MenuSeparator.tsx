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
import {View, StyleSheet} from 'react-native';
import {HorizontalRule, Text, useThemeColor} from '@axelor/aos-mobile-ui';

interface MenuSeparatorProps {
  title: string;
}

const MenuSeparator = ({title}: MenuSeparatorProps) => {
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        textColor={Colors.secondaryColor_dark.background_light}>
        {title?.toUpperCase()}
      </Text>
      <HorizontalRule style={styles.borderSeparator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginRight: 8,
  },
  borderSeparator: {
    flex: 1,
  },
});

export default MenuSeparator;
