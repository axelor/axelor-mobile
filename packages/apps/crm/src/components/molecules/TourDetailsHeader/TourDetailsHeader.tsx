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
import {StyleSheet, View} from 'react-native';
import {LabelText, Text} from '@axelor/aos-mobile-ui';
import {DateDisplay, useTranslator, useSelector} from '@axelor/aos-mobile-core';

interface TourDetailsHeaderProps {
  totalTourLine: number;
}

const TourDetailsHeader = ({totalTourLine = 0}: TourDetailsHeaderProps) => {
  const I18n = useTranslator();

  const {tour} = useSelector((state: any) => state.tour);

  return (
    <View style={styles.container}>
      <View>
        <Text writingType="title">{'name'}</Text>
      </View>
      <View style={styles.row}>
        <LabelText
          iconName="person-fill"
          title={tour.salespersonUser?.fullName}
          textStyle={styles.fontSize}
          size={16}
        />
        <DateDisplay date={tour.date} />
      </View>
      <Text>
        {I18n.t('Crm_ScheduledVisits', {
          totalTourLine,
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    justifyContent: 'space-between',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSize: {
    fontSize: 16,
  },
});

export default TourDetailsHeader;
