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
import {DateDisplay, useTranslator} from '@axelor/aos-mobile-core';
import {
  Badge,
  ProgressBar,
  Text,
  ToggleButton,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {ControlEntry} from '../../../types';

interface ControlEntryHeaderProps {
  name: string;
  statusSelect: number;
  sampleCount: number;
  controlPlanName: string;
  entryDateTime: string;
}

const ControlEntryHeader = ({
  name,
  statusSelect,
  sampleCount,
  controlPlanName,
  entryDateTime,
}: ControlEntryHeaderProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text writingType="title">{name}</Text>
        <Badge
          color={ControlEntry.getStatusColor(statusSelect, Colors)}
          title={ControlEntry.getStatus(statusSelect, I18n)}
          style={styles.badge}
        />
      </View>
      <View style={styles.row}>
        <Text>{`${I18n.t('Quality_Sample')} : ${sampleCount}`}</Text>
        <DateDisplay date={entryDateTime} />
      </View>
      <Text>{`${I18n.t('Quality_ControlPlan')} : ${controlPlanName}`}</Text>
      <View style={styles.row}>
        <ProgressBar
          value={sampleCount}
          style={styles.progressBar}
          height={37}
        />
        <ToggleButton
          activeColor={Colors.successColor}
          buttonConfig={{
            iconName: 'clipboard2-fill',
            width: '10%',
            style: styles.toggleButton,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    margin: 0,
  },
  progressBar: {
    width: '85%',
  },
  toggleButton: {
    height: 40,
  },
});

export default ControlEntryHeader;
