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
  DateDisplay,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {Badge, Text} from '@axelor/aos-mobile-ui';

const ControlEntryHeader = ({}) => {
  const I18n = useTranslator();
  const {ControlEntry} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const {controlEntry} = useSelector((state: any) => state.controlEntry);

  return (
    <View style={styles.container}>
      <View style={[styles.columnWrapper, styles.mainPanel]}>
        <Text writingType="title">{controlEntry.name}</Text>
        <Text>
          {I18n.t('Quality_SampleCountValue', {
            sampleCount: controlEntry.sampleCount,
          })}
        </Text>
        <Text>{`${I18n.t('Quality_ControlPlan')} : ${
          controlEntry.controlPlan?.name
        }`}</Text>
      </View>
      <View style={[styles.columnWrapper, styles.sidePanel]}>
        <DateDisplay date={controlEntry.entryDateTime} size={15} />
        <Badge
          color={getItemColor(
            ControlEntry?.statusSelect,
            controlEntry.statusSelect,
          )}
          title={getItemTitle(
            ControlEntry?.statusSelect,
            controlEntry.statusSelect,
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  columnWrapper: {
    flexDirection: 'column',
    gap: 2,
  },
  mainPanel: {
    flex: 1,
  },
  sidePanel: {
    alignItems: 'flex-end',
  },
});

export default ControlEntryHeader;
