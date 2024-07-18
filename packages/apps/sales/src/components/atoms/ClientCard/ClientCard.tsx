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
import {View, StyleSheet} from 'react-native';
import {ObjectCard} from '@axelor/aos-mobile-ui';
import {useMetafileUri} from '@axelor/aos-mobile-core';

interface ClientCardProps {
  style?: any;
  picture: any;
  name: string;
  partnerSeq: string;
  address: string;
  phone: string;
  emailAddress: any;
  onPress: () => void;
}

const ClientCard = ({
  style,
  picture,
  name,
  partnerSeq,
  address,
  phone,
  emailAddress,
  onPress,
}: ClientCardProps) => {
  const formatMetaFile = useMetafileUri();

  return (
    <View style={style}>
      <ObjectCard
        style={styles.container}
        onPress={onPress}
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
              displayText: partnerSeq,
              hideIfNull: true,
            },
          ],
        }}
        lowerTexts={{
          items: [
            {
              indicatorText: address,
              iconName: 'geo-alt-fill',
              hideIfNull: true,
            },
            {
              indicatorText: phone,
              iconName: 'telephone-fill',
              hideIfNull: true,
            },
            {
              indicatorText: emailAddress?.address,
              iconName: 'geo-alt-fill',
              hideIfNull: true,
            },
          ],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 1,
    marginVertical: 1,
  },
  imageSize: {
    height: 50,
    width: 50,
  },
});

export default ClientCard;
