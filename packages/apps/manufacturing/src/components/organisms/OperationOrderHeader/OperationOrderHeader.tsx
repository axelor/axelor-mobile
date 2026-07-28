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
import {
  Text,
  Badge,
  useThemeColor,
  checkNullString,
  HorizontalRule,
} from '@axelor/aos-mobile-ui';
import {useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';
import {OperationOrderDatesCard} from '../../molecules';

interface OperationOrderHeaderProps {
  manufOrderRef: string;
  name: string;
  status: number;
  priority: number;
  showDates?: boolean;
}

function OperationOrderHeader({
  manufOrderRef,
  name,
  status,
  priority,
  showDates = false,
}: OperationOrderHeaderProps) {
  const Colors = useThemeColor();
  const {OperationOrder} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  return (
    <View>
      <View style={styles.infoContainer}>
        <View style={styles.refContainer}>
          {!checkNullString(manufOrderRef) && (
            <Text writingType="important">{manufOrderRef}</Text>
          )}
          {!checkNullString(name) && <Text>{name}</Text>}
        </View>
        {status != null && (
          <Badge
            color={getItemColor(OperationOrder?.statusSelect, status)}
            title={getItemTitle(OperationOrder?.statusSelect, status)}
          />
        )}
        {priority != null && (
          <Badge color={Colors.priorityColor} title={priority.toString()} />
        )}
      </View>
      {showDates && (
        <>
          <HorizontalRule
            style={styles.line}
            color={Colors.secondaryColor.background_light}
          />
          <OperationOrderDatesCard />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  refContainer: {
    flex: 1,
  },
  line: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 4,
  },
});

export default OperationOrderHeader;
