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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BorderBar, Card, ProgressBar, Text} from '@axelor/aos-mobile-ui';
import {
  DateDisplay,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {searchControlEntrySampleApi} from '../../../api';

interface ControlEntryCardProps {
  style?: any;
  onPress?: () => void;
  sampleCount?: number;
  entryDateTime?: string;
  statusSelect?: number;
  name?: string;
  controlEntryId?: number;
}
const ControlEntryCard = ({
  style,
  onPress,
  sampleCount,
  entryDateTime,
  statusSelect,
  name,
  controlEntryId,
}: ControlEntryCardProps) => {
  const I18n = useTranslator();
  const {ControlEntry, ControlEntrySample} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const isMounted = useRef(true);

  const [numberSampleFilled, setNumberSampleFilled] = useState<number>(0);

  useEffect(() => {
    isMounted.current = true;

    searchControlEntrySampleApi({controlEntryId: controlEntryId})
      .then(response => {
        if (isMounted.current) {
          if (Array.isArray(response?.data?.data)) {
            const controlEntrySampleList: any[] = response.data.data;
            const total = controlEntrySampleList.length;
            const notControlled = controlEntrySampleList.filter(
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
  }, [ControlEntrySample?.resultSelect, controlEntryId]);

  const borderColor = useMemo(
    () => getItemColor(ControlEntry?.statusSelect, statusSelect)?.background,
    [ControlEntry?.statusSelect, getItemColor, statusSelect],
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <BorderBar style={styles.border} color={borderColor} />
        <View style={styles.content}>
          <View style={styles.childrenContainer}>
            <Text writingType="title">{name}</Text>
            <DateDisplay date={entryDateTime} />
          </View>
          <View style={styles.childrenContainer}>
            <Text>{`${I18n.t('Quality_SampleCount')} : ${sampleCount}`}</Text>
            <ProgressBar
              style={styles.progressBar}
              value={numberSampleFilled}
              showPercent={false}
              height={15}
              styleTxt={styles.textProgressBar}
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginHorizontal: 12,
    marginVertical: 4,
    paddingHorizontal: 15,
    paddingRight: 15,
    paddingVertical: 10,
  },
  border: {
    marginVertical: 6,
    marginRight: 13,
  },
  content: {
    flex: 1,
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

export default ControlEntryCard;
