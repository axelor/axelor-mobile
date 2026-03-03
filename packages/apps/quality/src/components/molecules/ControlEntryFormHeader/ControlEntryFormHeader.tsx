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
import {Icon, ProgressBar} from '@axelor/aos-mobile-ui';
import {ControlEntry} from '../../../types';
import {ControlEntryHeader, ControlEntrySampleLineHeader} from '../../atoms';

interface ControlEntryHeaderProps {
  nbItemInCategory: number;
  nbCategories: number;
  mode: string;
  progressData: any;
}

const ControlEntryFormHeader = ({
  nbItemInCategory,
  nbCategories,
  mode,
  progressData,
}: ControlEntryHeaderProps) => {
  const {categoryIcon, subCategoryIcon} = useMemo(
    () => ControlEntry.getMethodIcons(mode),
    [mode],
  );

  return (
    <View style={styles.container}>
      <ControlEntryHeader />
      <View style={styles.progressContainer}>
        <Icon name={categoryIcon} />
        <ProgressBar
          total={nbCategories}
          value={progressData.topProgressBar}
          style={[styles.progressBar, styles.margin]}
          showPercent={false}
        />
      </View>
      <View style={styles.progressContainer}>
        <Icon name={subCategoryIcon} />
        <ProgressBar
          total={nbItemInCategory}
          value={progressData.bottomProgressBar}
          showPercent={false}
          style={styles.progressBar}
        />
      </View>
      <ControlEntrySampleLineHeader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
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
