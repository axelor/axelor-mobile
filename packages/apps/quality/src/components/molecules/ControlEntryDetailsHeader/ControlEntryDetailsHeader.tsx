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

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DateDisplay, useTranslator} from '@axelor/aos-mobile-core';
import {
  Badge,
  Button,
  ProgressBar,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {ControlEntry} from '../../../types';
import {searchControlEntrySampleApi} from '../../../api';

interface ControlEntryHeaderProps {
  controlEntryId: number;
  name: string;
  statusSelect: number;
  sampleCount: number;
  controlPlanName: string;
  entryDateTime: string;
}

const ControlEntryDetailsHeader = ({
  controlEntryId,
  name,
  statusSelect,
  sampleCount,
  controlPlanName,
  entryDateTime,
}: ControlEntryHeaderProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [numberSampleFilled, setNumberSampleFilled] = useState<number>(0);

  useEffect(() => {
    searchControlEntrySampleApi({controlEntryId: controlEntryId})
      .then(response => {
        if (Array.isArray(response?.data?.data)) {
          const controlEntrySampleList: any[] = response.data.data;
          const total = controlEntrySampleList.length;
          const notControlled = controlEntrySampleList.filter(
            sample =>
              sample.resultSelect === ControlEntry.sampleResult.NotControlled,
          ).length;

          setNumberSampleFilled(100 - (notControlled / total) * 100);
        } else {
          setNumberSampleFilled(0);
        }
      })
      .catch(() => setNumberSampleFilled(0));
  }, [controlEntryId]);

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
          value={numberSampleFilled}
          style={styles.progressBar}
          height={38}
        />
        <Button
          isNeutralBackground={true}
          iconName="clipboard2-fill"
          width="10%"
          style={styles.button}
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
    width: '88%',
  },
  button: {
    height: 40,
    borderWidth: 1,
  },
});

export default ControlEntryDetailsHeader;
