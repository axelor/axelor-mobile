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
import {PartnerCard} from '../../atoms';

interface PartnerIconCardProps {
  style?: any;
  partnerPicture: any;
  partnerName: string;
  partnerJob?: string;
}

const PartnerIconCard = ({
  style,
  partnerPicture,
  partnerName,
  partnerJob,
}: PartnerIconCardProps) => {
  const Colors = useThemeColor();

  return (
    <View style={[styles.container, style]}>
      <PartnerCard
        partnerName={partnerName}
        style={styles.cardContainer}
        partnerPicture={partnerPicture}
        partnerJob={partnerJob}
      />
      <View style={styles.iconContainer}>
        <CardIconButton
          iconName={'pencil-fill'}
          iconColor={Colors.secondaryColor_dark.background}
          onPress={() => {}}
          style={styles.cardIconButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '96%',
    flexDirection: 'row',
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

export default PartnerIconCard;
