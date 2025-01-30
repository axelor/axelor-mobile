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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DateDisplay, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Badge, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {ControlEntry} from '../../../types';

const ControlEntryHeader = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {controlEntry} = useSelector((state: any) => state.controlEntry);

  return (
    <View>
      <View style={styles.row}>
        <Text writingType="title">{controlEntry.name}</Text>
        <Badge
          color={ControlEntry.getStatusColor(controlEntry.statusSelect, Colors)}
          title={ControlEntry.getStatus(controlEntry.statusSelect, I18n)}
        />
      </View>
      <View style={styles.row}>
        <Text>{`${I18n.t('Quality_SampleCount')} : ${
          controlEntry.sampleCount
        }`}</Text>
        <DateDisplay date={controlEntry.entryDateTime} />
      </View>
      <Text>{`${I18n.t('Quality_ControlPlan')} : ${
        controlEntry.controlPlan?.name
      }`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ControlEntryHeader;
