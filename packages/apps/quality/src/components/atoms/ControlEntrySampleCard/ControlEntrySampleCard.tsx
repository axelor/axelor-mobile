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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useTypes, useTypeHelpers, useNavigation} from '@axelor/aos-mobile-core';
import {ObjectCard, ProgressBar} from '@axelor/aos-mobile-ui';
import {ControlEntry as ControlEntryType} from '../../../types';
import {searchControlEntrySampleLineApi} from '../../../api';

interface ControlEntrySampleCardProps {
  style?: any;
  controlEntrySampleId: number;
  resultSelect: number;
  samplefullName: string;
}

const ControlEntrySampleCard = ({
  style,
  controlEntrySampleId,
  resultSelect,
  samplefullName,
}: ControlEntrySampleCardProps) => {
  const navigation = useNavigation();
  const {ControlEntrySample} = useTypes();
  const {getItemColor} = useTypeHelpers();
  const isMounted = useRef(true);

  const [numberSampleFilled, setNumberSampleFilled] = useState<number>(0);

  const borderColor = useMemo(
    () =>
      getItemColor(ControlEntrySample?.resultSelect, resultSelect)?.background,
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

  const handleSamplePress = useCallback(() => {
    navigation.navigate('ControlEntryFormScreen', {
      selectedMode: ControlEntryType.fillingMethod.Sample,
      sampleId: controlEntrySampleId,
    });
  }, [controlEntrySampleId, navigation]);

  return (
    <ObjectCard
      style={style}
      onPress={handleSamplePress}
      showArrow={false}
      borderLeftColor={borderColor}
      leftContainerFlex={4}
      upperTexts={{items: [{displayText: samplefullName, isTitle: true}]}}
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
