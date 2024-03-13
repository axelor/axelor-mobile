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
import {StyleSheet, View} from 'react-native';
import {linkingProvider} from '@axelor/aos-mobile-core';
import {CardIconButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {InterventionCard} from '../../atoms';

interface InterventionContent {
  statusSelect: number;
  sequence: string;
  deliveredPartner: any;
  planifStartDateTime: string;
  interventionType: any;
  address?: any;
}

interface InterventionDetailCardProps {
  style?: any;
  intervention: InterventionContent;
  onPress: () => void;
}

const InterventionDetailCard = ({
  style,
  intervention,
  onPress,
}: InterventionDetailCardProps) => {
  const Colors = useThemeColor();

  const address = useMemo(
    () => intervention?.address?.fullName,
    [intervention?.address?.fullName],
  );

  const phone = useMemo(
    () =>
      intervention?.deliveredPartner?.mobilephone ||
      intervention?.deliveredPartner?.fixedPhone,
    [
      intervention?.deliveredPartner?.fixedPhone,
      intervention?.deliveredPartner?.mobilephone,
    ],
  );

  return (
    <View style={[styles.container, style]}>
      <InterventionCard
        style={styles.cardContainer}
        {...intervention}
        onPress={onPress}
      />
      {address && phone && (
        <View style={styles.iconContainer}>
          {address && (
            <CardIconButton
              iconName={'geo-alt-fill'}
              iconColor={Colors.secondaryColor_dark.background}
              onPress={() => linkingProvider.openMapApp(address)}
              style={styles.cardIconButton}
            />
          )}
          {phone && (
            <CardIconButton
              iconName={'telephone-fill'}
              iconColor={Colors.secondaryColor_dark.background}
              onPress={() => linkingProvider.openCallApp(phone)}
              style={styles.cardIconButton}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '96%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 2,
  },
  cardContainer: {
    flex: 6,
    margin: 2,
  },
  iconContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  cardIconButton: {
    flex: 1,
  },
});

export default InterventionDetailCard;
