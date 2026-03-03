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

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';
import {Card, ProgressBar, Text} from '@axelor/aos-mobile-ui';
import {searchControlEntrySampleLineApi} from '../../../api';

interface ControlEntrySampleCardProps {
  style?: any;
  controlEntrySampleId: number;
  resultSelect: number;
  samplefullName: string;
  onPress: () => void;
}
const ControlEntrySampleCard = ({
  style,
  controlEntrySampleId,
  resultSelect,
  samplefullName,
  onPress,
}: ControlEntrySampleCardProps) => {
  const {ControlEntrySample} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const isMounted = useRef(true);

  const [numberSampleFilled, setNumberSampleFilled] = useState<number>(0);

  const borderStyle = useMemo(
    () =>
      getStyles(
        getItemColor(ControlEntrySample?.resultSelect, resultSelect)
          ?.background,
      )?.border,
    [ControlEntrySample?.resultSelect, getItemColor, resultSelect],
  );

  useEffect(() => {
    isMounted.current = true;

    searchControlEntrySampleLineApi({controlEntrySampleId})
      .then(response => {
        if (isMounted.current) {
          if (Array.isArray(response?.data?.data)) {
            const controlEntrySampleLineList: any[] = response.data.data;
            const total = controlEntrySampleLineList.length;
            const notControlled = controlEntrySampleLineList.filter(
              sample =>
                sample.resultSelect ===
                ControlEntrySample?.resultSelect.NotControlled,
            ).length;
            setNumberSampleFilled(100 - (notControlled / total) * 100);
          } else {
            setNumberSampleFilled(0);
          }
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setNumberSampleFilled(0);
        }
      });

    return () => {
      isMounted.current = false;
    };
  }, [ControlEntrySample?.resultSelect, controlEntrySampleId]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <Text>{samplefullName}</Text>
        <ProgressBar
          style={styles.progressBar}
          value={numberSampleFilled}
          showPercent={false}
          height={15}
          styleTxt={styles.textProgressBar}
        />
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    paddingHorizontal: 15,
    paddingRight: 15,
    paddingVertical: 10,
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
