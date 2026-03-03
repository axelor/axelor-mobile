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
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {Badge, Text} from '@axelor/aos-mobile-ui';

const ControlEntrySampleLineHeader = ({}) => {
  const I18n = useTranslator();
  const {ControlEntrySample} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const {sampleLine} = useSelector(
    (state: any) => state.controlEntrySampleLine,
  );

  if (sampleLine?.id == null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.sampleText}>{`${I18n.t('Quality_Sample')} : ${
          sampleLine.controlEntrySample?.fullName
        }`}</Text>
        <Badge
          style={styles.badge}
          color={getItemColor(
            ControlEntrySample?.resultSelect,
            sampleLine.resultSelect,
          )}
          title={getItemTitle(
            ControlEntrySample?.resultSelect,
            sampleLine.resultSelect,
          )}
        />
      </View>
      <Text>{`${I18n.t('Quality_Characteristic')} : ${
        sampleLine.controlPlanLine?.name != null
          ? sampleLine.controlPlanLine?.name
          : sampleLine.controlPlanLine?.characteristic?.name
      }`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sampleText: {
    flex: 1,
  },
  badge: {
    width: null,
    margin: 0,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
});

export default ControlEntrySampleLineHeader;
