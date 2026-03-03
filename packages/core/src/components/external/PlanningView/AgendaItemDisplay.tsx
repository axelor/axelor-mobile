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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {HorizontalRule, Text} from '@axelor/aos-mobile-ui';
import {AgendaItem, isStartOfMonth} from './agenda.helpers';

const AgendaItemDisplay = ({
  isFirst = false,
  agendaItem,
  renderComponent,
}: {
  isFirst?: boolean;
  agendaItem: AgendaItem;
  renderComponent?: (item: AgendaItem) => any;
}) => {
  const {id, date, startHour, endHour, isFullDayEvent} = useMemo(
    () => agendaItem,
    [agendaItem],
  );

  const isNewMonth = useMemo(() => isStartOfMonth(date), [date]);

  if (renderComponent == null) {
    return (
      <View style={styles.dayItem}>
        <Text>{id}</Text>
      </View>
    );
  }

  return (
    <View>
      {isFirst && !isNewMonth ? (
        <HorizontalRule style={styles.horizontalRule} />
      ) : null}
      <View style={[styles.itemContainer, isNewMonth && styles.newMonthMargin]}>
        <View style={styles.containerTime}>
          {!isFullDayEvent && (
            <>
              <Text fontSize={14} style={styles.centerText}>
                {startHour}
              </Text>
              <Text fontSize={14} style={styles.centerText}>
                {endHour}
              </Text>
            </>
          )}
        </View>
        <View style={styles.renderContainer}>
          {renderComponent(agendaItem)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayItem: {
    flex: 1,
    padding: 10,
    marginRight: 10,
  },
  horizontalRule: {
    marginVertical: 10,
    width: '60%',
    alignSelf: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  newMonthMargin: {
    marginTop: 15,
  },
  containerTime: {
    flexDirection: 'column',
    width: '15%',
  },
  centerText: {
    textAlign: 'center',
  },
  renderContainer: {
    alignSelf: 'flex-end',
    marginLeft: 5,
    width: '80%',
  },
});

export default AgendaItemDisplay;
