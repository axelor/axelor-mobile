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
import {CardIconButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  linkingProvider,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {validateTourLine} from '../../../features/tourLineSlice';
import {TourLineCard} from '../../molecules';

interface TourLineActionCardProps {
  partner: any;
  address: string;
  isValidated: boolean;
  eventId?: number;
  id: number;
  tourId: number;
}

const TourLineActionCard = ({
  partner,
  address,
  isValidated = false,
  eventId,
  tourId,
  id,
}: TourLineActionCardProps) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.globalContainer}>
      <TourLineCard
        style={styles.objectCardContainer}
        name={partner?.fullName}
        address={address}
        isValidated={isValidated}
      />
      <View style={styles.flexOne}>
        <CardIconButton
          style={styles.flexOne}
          iconName="geo-alt-fill"
          iconColor={Colors.primaryColor.foreground}
          onPress={() => linkingProvider.openMapApp(address)}
        />
        {eventId != null ? (
          <CardIconButton
            style={styles.flexOne}
            iconName="calendar-event"
            iconColor={Colors.primaryColor.foreground}
            onPress={() =>
              navigation.navigate('EventDetailsScreen', {
                eventId: eventId,
              })
            }
          />
        ) : (
          <CardIconButton
            style={styles.flexOne}
            iconName="calendar2-plus"
            iconColor={Colors.primaryColor.foreground}
            onPress={() =>
              navigation.navigate('EventFormScreen', {
                client: partner,
              })
            }
          />
        )}
      </View>
      {!isValidated && (
        <View style={styles.flexOne}>
          <CardIconButton
            style={styles.flexOne}
            iconName="check-lg"
            iconColor={Colors.successColor.background}
            onPress={() => {
              dispatch(
                (validateTourLine as any)({
                  tourLineId: id,
                  tourId: tourId,
                }),
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  globalContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 2,
    flex: 1,
  },
  objectCardContainer: {
    flex: 7,
    marginVertical: 2,
  },
  flexOne: {
    flex: 1,
  },
});

export default TourLineActionCard;
