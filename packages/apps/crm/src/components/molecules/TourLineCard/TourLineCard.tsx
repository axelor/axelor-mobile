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
import {CardIconButton, ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {StyleSheet, View} from 'react-native';

interface TourLineCardProps {
  name: string;
  adress?: string;
}

const TourLineCard = ({adress, name}: TourLineCardProps) => {
  const Colors = useThemeColor();

  return (
    <View style={styles.globalContainer}>
      <View style={styles.objectCardContainer}>
        <ObjectCard
          showArrow={false}
          style={styles.objectCard}
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
        <CardIconButton
          style={styles.cardIconButton}
          iconName="geo-alt-fill"
          iconColor={Colors.secondaryColor.background}
          onPress={() => {}}
        />
        <CardIconButton
          style={styles.cardIconButton}
          iconName="calendar-event"
          iconColor={Colors.secondaryColor.background}
          onPress={() => {}}
        />
      </View>
      <CardIconButton
        style={styles.cardIconButton}
        iconName="check-lg"
        iconColor={Colors.successColor.background}
        onPress={() => {}}
      />
    </View>
  );
};

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
