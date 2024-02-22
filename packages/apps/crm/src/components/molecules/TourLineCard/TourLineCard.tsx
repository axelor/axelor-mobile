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

import React, {useMemo} from 'react';
import {
  CardIconButton,
  ObjectCard,
  checkNullString,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  linkingProvider,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {StyleSheet, View} from 'react-native';
import {TourLineType} from '../../../types';
import {validateTourLine} from '../../../features/tourLineSlice';

interface TourLineCardProps {
  name: string;
  adress?: string;
  eventId?: number;
  isValidated?: boolean;
  id: number;
  tourId: number;
  status?: boolean | null;
}

const TourLineCard = ({
  adress,
  name,
  eventId,
  isValidated = false,
  id,
}: TourLineCardProps) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const borderStyle = useMemo(() => {
    return getStyles(
      TourLineType.getBorderColor(isValidated, Colors)?.background,
    )?.border;
  }, [Colors, isValidated]);

  return (
    <View style={styles.globalContainer}>
      <View style={styles.objectCardContainer}>
        <ObjectCard
          showArrow={false}
          style={[styles.objectCard, borderStyle]}
          upperTexts={{
            items: [
              {displayText: name, isTitle: true},
              {
                indicatorText: adress,
                hideIfNull: true,
                iconName: 'geo-alt-fill',
              },
            ],
          }}
        />
      </View>
      <View style={styles.cardIconButtonContainer}>
        {!checkNullString(adress) && (
          <CardIconButton
            style={styles.cardIconButton}
            iconName="geo-alt-fill"
            iconColor={Colors.primaryColor.foreground}
            onPress={() => linkingProvider.openMapApp(adress)}
          />
        )}
        {eventId != null && (
          <CardIconButton
            style={styles.cardIconButton}
            iconName="calendar-event"
            iconColor={Colors.primaryColor.foreground}
            onPress={() =>
              navigation.navigate('EventDetailsScreen', {
                eventId: eventId,
              })
            }
          />
        )}
      </View>
      {!isValidated && (
        <CardIconButton
          style={styles.cardIconButton}
          iconName="check-lg"
          iconColor={Colors.successColor.background}
          onPress={() => {
            dispatch(
              (validateTourLine as any)({
                tourLineId: id,
              }),
            );
          }}
        />
      )}
    </View>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  globalContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    height: 90,
    marginVertical: 5,
  },
  objectCardContainer: {
    flex: 5,
  },
  objectCard: {
    marginHorizontal: 0,
    marginVertical: 0,
    height: '100%',
  },
  cardIconButtonContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  cardIconButton: {
    flex: 1,
  },
});

export default TourLineCard;
