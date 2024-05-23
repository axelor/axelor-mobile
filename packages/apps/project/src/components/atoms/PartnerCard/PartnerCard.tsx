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

import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {ObjectCard} from '@axelor/aos-mobile-ui';
import {useMetafileUri, useNavigation} from '@axelor/aos-mobile-core';

interface PartnerCardProps {
  style?: any;
  partnerPicture: any;
  partnerName: string;
  partnerCode: string;
  partnerJob?: string;
  isContact: boolean;
  partnerId: number;
}

const PartnerCard = ({
  style,
  partnerPicture,
  partnerName,
  partnerCode,
  partnerJob,
  isContact,
  partnerId,
}: PartnerCardProps) => {
  const formatMetaFile = useMetafileUri();
  const navigation = useNavigation();

  const handleCardPress = useCallback(() => {
    if (isContact) {
      return navigation.navigate('ContactDetailsScreen', {
        idContact: partnerId,
      });
    } else {
      navigation.navigate('ClientDetailsScreen', {
        idClient: partnerId,
      });
    }
  }, [isContact, navigation, partnerId]);

  return (
    <View style={style}>
      <ObjectCard
        onPress={handleCardPress}
        image={{
          generalStyle: styles.imageSize,
          imageSize: styles.imageSize,
          resizeMode: 'contain',
          defaultIconSize: 50,
          source: formatMetaFile(partnerPicture?.id),
        }}
        upperTexts={{
          items: [
            {
              displayText: partnerName,
              isTitle: true,
            },
            {
              displayText: partnerCode,
              hideIfNull: true,
            },
            {
              indicatorText: partnerJob,
              iconName: 'suitcase-lg-fill',
              hideIfNull: true,
            },
          ],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageSize: {
    height: 50,
    width: 50,
  },
});

export default PartnerCard;
