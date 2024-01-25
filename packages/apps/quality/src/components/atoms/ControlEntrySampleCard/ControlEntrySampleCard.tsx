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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, ProgressBar, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {ControlEntry} from '../../../types';
import {searchControlEntrySampleLineApi} from '../../../api';

interface ControlEntrySampleCardProps {
  style?: any;
  controlPlanId?: number;
  resultSelect?: number;
  samplefullName?: string;
  onPress?: () => void;
}
const ControlEntrySampleCard = ({
  style,
  controlPlanId,
  resultSelect,
  samplefullName,
  onPress = () => {},
}: ControlEntrySampleCardProps) => {
  const Colors = useThemeColor();

  const [controlEntrySampleLineList, setControlEntrySampleLineList] = useState(
    [],
  );

  const numberSampledFilled = useMemo(() => {
    if (
      controlEntrySampleLineList != null &&
      controlEntrySampleLineList?.length > 0
    ) {
      let total = controlEntrySampleLineList?.length;
      let notControlled = 0;
      controlEntrySampleLineList?.forEach(sample => {
        if (sample?.resultSelect === ControlEntry?.sampleResult.NotControlled) {
          notControlled++;
        }
      });
      return 100 - (notControlled / total) * 100;
    }
    return 0;
  }, [controlEntrySampleLineList]);

  const borderStyle = useMemo(() => {
    return getStyles(
      ControlEntry.getSampleResultColor(resultSelect, Colors)?.background,
    )?.border;
  }, [Colors, resultSelect]);

  useEffect(() => {
    searchControlEntrySampleLineApi({controlEntrySampleId: controlPlanId}).then(
      response => {
        setControlEntrySampleLineList(response?.data?.data);
      },
    );
  }, [controlPlanId]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.childrenContainer}>
          <Text>{samplefullName}</Text>
          <ProgressBar
            style={styles.progressBar}
            value={numberSampledFilled}
            showPercent={false}
            height={15}
            styleTxt={styles.textProgressBar}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 4,
    paddingHorizontal: 15,
    paddingRight: 15,
    paddingVertical: 10,
  },
  childrenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  progressBar: {
    borderRadius: 20,
    width: '40%',
  },
  textProgressBar: {
    display: 'none',
  },
});
export default ControlEntrySampleCard;
