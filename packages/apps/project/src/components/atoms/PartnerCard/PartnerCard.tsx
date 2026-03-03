/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {StyleSheet} from 'react-native';
import {ObjectCard} from '@axelor/aos-mobile-ui';
import {useMetafileUri, useNavigation} from '@axelor/aos-mobile-core';

interface PartnerCardProps {
  style?: any;
  picture: any;
  name: string;
  code: string;
  jobName?: string;
  id: number;
  isContact: boolean;
}

const PartnerCard = ({
  style,
  picture,
  name,
  code,
  jobName,
  id,
  isContact,
}: PartnerCardProps) => {
  const formatMetaFile = useMetafileUri();
  const navigation = useNavigation();

  const handleCardPress = useCallback(() => {
    if (isContact) {
      return navigation.navigate('ContactDetailsScreen', {
        idContact: id,
      });
    } else {
      navigation.navigate('ClientDetailsScreen', {
        idClient: id,
      });
    }
  }, [isContact, navigation, id]);

  return (
    <ObjectCard
      onPress={handleCardPress}
      style={[styles.card, style]}
      image={{
        generalStyle: styles.imageSize,
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: 50,
        source: formatMetaFile(picture?.id),
      }}
      upperTexts={{
        items: [
          {
            displayText: name,
            isTitle: true,
          },
          {
            displayText: code,
            hideIfNull: true,
          },
          {
            indicatorText: jobName,
            iconName: 'suitcase-lg-fill',
            hideIfNull: true,
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  imageSize: {
    height: 50,
    width: 50,
  },
  card: {
    marginVertical: 2,
    padding: 0,
    marginHorizontal: 2,
    marginRight: 5,
  },
});

export default PartnerCard;
