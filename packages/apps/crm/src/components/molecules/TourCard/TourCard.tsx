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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, LabelText, Text} from '@axelor/aos-mobile-ui';
import {useTranslator, DateDisplay} from '@axelor/aos-mobile-core';

interface TourCardProps {
  style?: any;
  onPress?: () => void;
  sampleCount?: number;
  salesperson?: string;
  entryDateTime?: string;
  name?: string;
}
const TourCard = ({
  style,
  onPress,
  sampleCount,
  entryDateTime,
  salesperson,
  name,
}: TourCardProps) => {
  const I18n = useTranslator();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.childrenContainer}>
          <Text writingType="title">{name}</Text>
          <DateDisplay date={entryDateTime} />
        </View>
        <View style={styles.childrenContainer}>
          <Text>{`${I18n.t('Quality_SampleCount')} : ${sampleCount}`}</Text>
          {/*<ProgressBar
            style={styles.progressBar}
            value={numberSampleFilled}
            showPercent={false}
            height={15}
            styleTxt={styles.textProgressBar}
          />*/}
        </View>
        <LabelText iconName="person-fill" title={salesperson} />
      </Card>
    </TouchableOpacity>
  );
};

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

export default TourCard;
