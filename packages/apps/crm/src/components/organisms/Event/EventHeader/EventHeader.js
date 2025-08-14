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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Badge} from '@axelor/aos-mobile-ui';
import {useSelector, useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';

const EventHeader = ({}) => {
  const {Event} = useTypes();
  const {getItemTitle, getItemColor} = useTypeHelpers();

  const {event} = useSelector(state => state.event);

  const renderBadge = useCallback(
    fieldName => {
      if (event?.[fieldName] != null) {
        return (
          <Badge
            title={getItemTitle(Event?.[fieldName], event?.[fieldName])}
            color={getItemColor(Event?.[fieldName], event?.[fieldName])}
          />
        );
      }

      return null;
    },
    [Event, event, getItemColor, getItemTitle],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text} numberOfLines={5} writingType="title">
        {event.subject}
      </Text>
      <View>
        {renderBadge('statusSelect')}
        {renderBadge('typeSelect')}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    gap: 3,
  },
  text: {
    flex: 1,
  },
});

export default EventHeader;
