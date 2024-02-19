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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, LabelText, Text, ProgressBar} from '@axelor/aos-mobile-ui';
import {useTranslator, DateDisplay} from '@axelor/aos-mobile-core';
import {searchTourLineApi} from '../../../api';

interface TourCardProps {
  style?: any;
  onPress?: () => void;
  salesperson?: string;
  tourId: number;
  date: string;
  name: string;
}
const TourCard = ({
  style,
  onPress,
  date,
  salesperson,
  tourId,
  name,
}: TourCardProps) => {
  const I18n = useTranslator();

  const [numberSampleFilled, setNumberSampleFilled] = useState<number>(0);
  const [totalTourLine, seTotalTourLine] = useState<number>(0);

  useEffect(() => {
    searchTourLineApi({tourId: tourId})
      .then(response => {
        if (Array.isArray(response?.data?.data)) {
          const tourLineList: any[] = response.data.data;
          const total = tourLineList.length;
          const notValidated = tourLineList.filter(
            line => line.isValidated === false,
          ).length;

          setNumberSampleFilled(100 - (notValidated / total) * 100);
          seTotalTourLine(total);
        } else {
          setNumberSampleFilled(0);
        }
      })
      .catch(() => setNumberSampleFilled(0));
  }, [tourId]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.childrenContainer}>
          <Text writingType="title">{name}</Text>
          <DateDisplay date={date} />
        </View>
        <View style={styles.childrenContainer}>
          <LabelText
            iconName="person-fill"
            title={salesperson}
            textStyle={styles.fontSize}
            size={16}
          />
          <ProgressBar
            style={styles.progressBar}
            value={numberSampleFilled}
            showPercent={false}
            height={15}
            styleTxt={styles.textProgressBar}
          />
        </View>
        <Text>{`${totalTourLine} ${I18n.t('Crm_SheduledVisits')}`}</Text>
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
  fontSize: {
    fontSize: 16,
  },
});

export default TourCard;
