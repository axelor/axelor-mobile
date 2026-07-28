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
import {
  Badge,
  HorizontalRule,
  LabelText,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
import {ManufacturingOrderDatesCard} from '../../molecules';

interface ManufacturingOrderHeaderProps {
  reference: string;
  status: number;
  priority: number;
  parentMO?: any;
  children?: any;
  showDates?: boolean;
}

const ManufacturingOrderHeader = ({
  reference,
  status,
  priority,
  parentMO,
  children,
  showDates = false,
}: ManufacturingOrderHeaderProps) => {
  const Colors = useThemeColor();
  const {ManufOrder} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const isPriorityValid = useMemo(
    () =>
      priority != null &&
      ManufOrder?.prioritySelect.list.find(({value}) => value === priority) !=
        null,
    [ManufOrder?.prioritySelect, priority],
  );

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.columnWrapper}>
          {reference != null && (
            <Text writingType="important">{reference}</Text>
          )}
          {parentMO != null && (
            <LabelText
              iconName="diagram-3-fill"
              title={parentMO.manufOrderSeq}
            />
          )}
        </View>
        <View style={styles.badgesContainer}>
          {isPriorityValid && (
            <Badge
              color={getItemColor(ManufOrder?.prioritySelect, priority)}
              title={getItemTitle(ManufOrder?.prioritySelect, priority)}
            />
          )}
          {status != null && (
            <Badge
              color={getItemColor(ManufOrder?.statusSelect, status)}
              title={getItemTitle(ManufOrder?.statusSelect, status)}
            />
          )}
        </View>
      </View>
      {children}
      {showDates ? (
        <>
          <HorizontalRule
            style={styles.line}
            color={Colors.secondaryColor.background_light}
          />
          <ManufacturingOrderDatesCard />
        </>
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginBottom: 5,
  },
  columnWrapper: {
    flex: 1,
  },
  badgesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  line: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 4,
  },
});

export default ManufacturingOrderHeader;
