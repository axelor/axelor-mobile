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

import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  isEmpty,
  useSelector,
  useTranslator,
  useDispatch,
  DateDisplay,
} from '@axelor/aos-mobile-core';
import {
  Badge,
  Icon,
  ProgressBar,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {ControlEntry} from '../../../types';
import {fetchControlEntryById} from '../../../features/controlEntrySlice';

const MODE = {
  bySample: '1',
  byCharacteristic: '2',
};

interface ControlEntryHeaderProps {
  controlEntryId: number;
  currentIndexSample: number;
  currentIndexCharacteristic: number;
  currentControlPLanIndex: number;
  currentSampleLineIndex: number;
  mode: string;
}

const ControlEntryFormHeader = ({
  controlEntryId,
  currentIndexSample,
  currentIndexCharacteristic,
  currentControlPLanIndex,
  currentSampleLineIndex,
  mode,
}: ControlEntryHeaderProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {controlEntry} = useSelector((state: any) => state.controlEntry);
  const {controlEntrySampleLineList, controlEntrySampleLineByCharacteristic} =
    useSelector((state: any) => state.controlEntrySampleLine);
  const {controlPlan} = useSelector((state: any) => state.controlPlan);

  useEffect(() => {
    dispatch((fetchControlEntryById as any)({controlEntryId: controlEntryId}));
  }, [controlEntryId, dispatch]);

  if (controlEntry == null || isEmpty(controlEntry)) {
    return null;
  }

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
        <Icon name={mode === MODE.bySample ? 'eyedropper' : 'palette2'} />
        <ProgressBar
          total={
            mode === MODE.bySample
              ? controlEntry?.controlEntrySamplesList?.length
              : controlPlan?.controlPlanLinesSet?.length
          }
          value={
            mode === MODE.bySample
              ? currentIndexSample
              : currentControlPLanIndex
          }
          style={[styles.progressBar, styles.margin]}
          showPercent={false}
        />
      </View>
      <View style={styles.progressContainer}>
        <Icon name={mode === MODE.bySample ? 'palette2' : 'eyedropper'} />
        <ProgressBar
          value={
            mode === MODE.bySample
              ? currentIndexCharacteristic
              : currentSampleLineIndex
          }
          total={
            mode === MODE.bySample
              ? controlEntrySampleLineList?.length
              : controlEntrySampleLineByCharacteristic?.length
          }
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
  toggleButton: {
    height: 40,
    top: '-20%',
  },
});

export default ControlEntryFormHeader;
