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
import {
  Button,
  ChipSelect,
  LabelText,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  DateDisplay,
  useTranslator,
  useSelector,
  linkingProvider,
} from '@axelor/aos-mobile-core';
import {TourLine} from '../../../types';

const TourDetailsHeader = ({setSelectedStatus, adressList}) => {
  const I18n = useTranslator();

  const Colors = useThemeColor();
  const {tour} = useSelector((state: any) => state.tour);
  const {totalTourLine} = useSelector((state: any) => state.tourLine);

  return (
    <View>
      <View style={styles.container}>
        <Text writingType="title">{tour?.name}</Text>
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
      <View style={styles.chipContainer}>
        <ChipSelect
          width={140}
          mode="switch"
          style={styles.chipSelect}
          onChangeValue={chiplist => setSelectedStatus(chiplist)}
          selectionItems={[
            {
              title: I18n.t('Crm_Status_Planned'),
              color: Colors.secondaryColor,
              key: TourLine.status.Planned,
            },
            {
              title: I18n.t('Crm_Status_Validated'),
              color: Colors.successColor,
              key: TourLine.status.Validated,
            },
          ]}
        />
        <Button
          isNeutralBackground={true}
          iconName="map"
          width="10%"
          iconSize={20}
          style={styles.button}
          onPress={() => {
            linkingProvider.openGoogleMapsDirections(adressList);
          }}
        />
      </View>
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
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  chipSelect: {
    marginHorizontal: 0,
  },
  button: {
    height: 40,
    borderWidth: 1,
  },
});

export default TourDetailsHeader;
