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
import {Badge, LabelText, Text} from '@axelor/aos-mobile-ui';
import {useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';

interface ManufacturingOrderHeaderProps {
  reference: string;
  status: number;
  priority: number;
  parentMO?: any;
}

const ManufacturingOrderHeader = ({
  reference,
  status,
  priority,
  parentMO = null,
}: ManufacturingOrderHeaderProps) => {
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
    <View style={styles.container}>
      <View style={styles.refContainer}>
        {reference != null && <Text writingType="important">{reference}</Text>}
        {parentMO != null && (
          <LabelText
            style={styles.manufOrderSeq}
            iconName="diagram-3-fill"
            title={parentMO.manufOrderSeq}
          />
        )}
      </View>
      <View style={[styles.badgesContainer]}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  refContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgesContainer: {
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  manufOrderSeq: {
    marginLeft: 8,
  },
});

export default ManufacturingOrderHeader;
