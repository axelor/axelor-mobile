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
import {useSelector, useTranslator, DateDisplay} from '@axelor/aos-mobile-core';
import {
  Badge,
  Icon,
  ProgressBar,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {ControlEntry} from '../../../types';

const MODE = {
  bySample: '1',
  byCharacteristic: '2',
};

interface ControlEntryHeaderProps {
  currentIndex: number;
  categoryIndex: number;
  nbItemInCategory: number;
  nbCategories: number;
  mode: string;
}

const ControlEntryFormHeader = ({
  currentIndex,
  categoryIndex,
  nbItemInCategory,
  nbCategories,
  mode,
}: ControlEntryHeaderProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {controlEntry} = useSelector((state: any) => state.controlEntry);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text writingType="title">{controlEntry.name}</Text>
        <Badge
          color={ControlEntry.getStatusColor(controlEntry.statusSelect, Colors)}
          title={ControlEntry.getStatus(controlEntry.statusSelect, I18n)}
        />
      </View>
      <View style={styles.row}>
        <Text>{`${I18n.t('Quality_Sample')} : ${
          controlEntry.sampleCount
        }`}</Text>
        <DateDisplay date={controlEntry.entryDateTime} />
      </View>
      <View style={styles.progressContainer}>
        {/**Should be done in type file */}
        <Icon name={mode === MODE.bySample ? 'eyedropper' : 'palette2'} />
        <ProgressBar
          total={nbCategories}
          value={categoryIndex + 1}
          style={[styles.progressBar, styles.margin]}
          showPercent={false}
        />
      </View>
      <View style={styles.progressContainer}>
        {/**Should be done in type file */}
        <Icon name={mode === MODE.bySample ? 'palette2' : 'eyedropper'} />
        <ProgressBar
          total={nbItemInCategory}
          value={currentIndex + 1}
          showPercent={false}
          style={styles.progressBar}
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
    marginVertical: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBar: {
    width: '90%',
  },
  margin: {
    marginVertical: '2%',
  },
});

export default ControlEntryFormHeader;
