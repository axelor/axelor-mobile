/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {Text, Badge, useThemeColor} from '@axelor/aos-mobile-ui';
import {useSelector, useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';

const EventHeader = ({}) => {
  const Colors = useThemeColor();
  const {event} = useSelector(state => state.event);
  const {Event} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.halfContainer}>
        <Text style={styles.bold} numberOfLines={2}>
          {event.subject}
        </Text>
      </View>
      <View style={styles.halfContainer}>
        {event.statusSelect != null && (
          <Badge
            title={getItemTitle(Event?.statusSelect, event.statusSelect)}
          />
        )}
        {event.typeSelect != null && (
          <Badge
            title={getItemTitle(Event?.typeSelect, event.typeSelect)}
            color={Colors.plannedColor}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  halfContainer: {
    flexDirection: 'row',
    width: '50%',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default EventHeader;
