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

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, ProgressBar, Text} from '@axelor/aos-mobile-ui';
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

  const borderStyle = useMemo(() => {
    return getStyles(
      getItemColor(ControlEntry?.statusSelect, statusSelect)?.background,
    )?.border;
  }, [ControlEntry?.statusSelect, getItemColor, statusSelect]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
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

export default ControlEntryCard;
