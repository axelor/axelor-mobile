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
import {StyleSheet, View} from 'react-native';
import {TourLineType} from '../../../types';

interface TourLineCardProps {
  name: string;
  adress?: string;
  eventId?: number;
  isValidated?: boolean;
}

const TourLineCard = ({
  adress,
  name,
  eventId,
  isValidated = false,
}: TourLineCardProps) => {
  const Colors = useThemeColor();

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
            onPress={() => {}}
          />
        )}
        {eventId != null && (
          <CardIconButton
            style={styles.cardIconButton}
            iconName="calendar-event"
            iconColor={Colors.primaryColor.foreground}
            onPress={() => {}}
          />
        )}
      </View>
      {!isValidated && (
        <CardIconButton
          style={styles.cardIconButton}
          iconName="check-lg"
          iconColor={Colors.successColor.background}
          onPress={() => {}}
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
