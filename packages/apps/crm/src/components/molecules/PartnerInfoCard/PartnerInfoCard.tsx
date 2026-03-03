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

import React from 'react';
import {StyleSheet} from 'react-native';
import {ObjectCard} from '@axelor/aos-mobile-ui';
import {useMetafileUri} from '@axelor/aos-mobile-core';

interface PartnerInfoCardProps {
  fullName: string;
  partnerSeq: string;
  picture: any;
  style?: any;
  onPress?: () => void;
}

const PartnerInfoCard = ({
  fullName,
  partnerSeq,
  picture,
  style,
  onPress = () => {},
}: PartnerInfoCardProps) => {
  const formatMetaFile = useMetafileUri();

  if (fullName == null || partnerSeq == null) {
    return null;
  }

  return (
    <ObjectCard
      style={style}
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
          {displayText: fullName, isTitle: true},
          {indicatorText: partnerSeq, hideIfNull: true},
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
});

export default PartnerInfoCard;
