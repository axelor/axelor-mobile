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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
import {ObjectCard, ProgressBar} from '@axelor/aos-mobile-ui';
import {
  ControlEntry as ControlEntryType,
  ControlEntrySample as ControlEntrySampleType,
} from '../../../types';
import {searchControlEntrySampleLineApi} from '../../../api';

interface ControlEntrySampleCardProps {
  style?: any;
  sample: ControlEntrySampleType;
}

const ControlEntrySampleCard = ({
  style,
  sample,
}: ControlEntrySampleCardProps) => {
  const navigation = useNavigation();
  const {ControlEntrySample} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const [numberSampleFilled, setNumberSampleFilled] = useState<number>(0);

  const borderColor = useMemo(
    () =>
      getItemColor(ControlEntrySample?.resultSelect, sample.resultSelect)
        ?.background,
    [ControlEntrySample?.resultSelect, getItemColor, sample.resultSelect],
  );

  useEffect(() => {
    let cancelled = false;

    searchControlEntrySampleLineApi({controlEntrySampleId: sample.id})
      .then(response => {
        if (cancelled) return;
        const sampleSet: any[] = response?.data?.data ?? [];

        if (!Array.isArray(sampleSet) || sampleSet.length === 0) {
          setNumberSampleFilled(0);
        } else {
          const total = sampleSet.length;
          const notControlled = sampleSet.filter(
            ({resultSelect}) =>
              resultSelect === ControlEntrySample?.resultSelect.NotControlled,
          ).length;
          setNumberSampleFilled(100 - (notControlled / total) * 100);
        }
      })
      .catch(() => {
        if (!cancelled) setNumberSampleFilled(0);
      });

    return () => {
      cancelled = true;
    };
  }, [ControlEntrySample?.resultSelect, sample]);

  const handleSamplePress = useCallback(() => {
    navigation.navigate('ControlEntryFormScreen', {
      selectedMode: ControlEntryType.fillingMethod.Sample,
      sampleId: sample.id,
    });
  }, [navigation, sample.id]);

  return (
    <ObjectCard
      style={style}
      borderLeftColor={borderColor}
      onPress={handleSamplePress}
      showArrow={false}
      leftContainerFlex={4}
      upperTexts={{
        items: [{displayText: sample.fullName, numberOfLines: null as any}],
      }}
      sideBadges={{
        items: [
          {
            customComponent: (
              <ProgressBar
                styleTxt={styles.textProgressBar}
                value={numberSampleFilled}
                showPercent={false}
                height={15}
              />
            ),
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  textProgressBar: {
    display: 'none',
  },
});

export default ControlEntrySampleCard;
