/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {StyleSheet} from 'react-native';
import {ObjectCard} from '@axelor/aos-mobile-ui';
import {useMetafileUri} from '@axelor/aos-mobile-core';

interface CarrierCardProps {
  carrierPartner?: any;
  style?: any;
}

const CarrierCard = ({carrierPartner, style}: CarrierCardProps) => {
  const formatMetaFile = useMetafileUri();

  return (
    <ObjectCard
      style={[styles.card, style]}
      showArrow={false}
      touchable={false}
      image={{
        source: formatMetaFile(carrierPartner?.picture?.id),
        resizeMode: 'contain',
        defaultIconSize: 50,
        imageSize: styles.imageSize,
        generalStyle: styles.imageSize,
      }}
      upperTexts={{
        items: [
          {
            displayText: carrierPartner?.simpleFullName,
            isTitle: true,
            hideIfNull: true,
          },
          {
            displayText: carrierPartner?.partnerSeq,
            hideIfNull: true,
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 2,
    marginHorizontal: 2,
  },
  imageSize: {
    width: 50,
    height: 50,
  },
});

export default CarrierCard;
