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
import {useMetafileUri, useTranslator} from '@axelor/aos-mobile-core';
import {ObjectCard} from '@axelor/aos-mobile-ui';

interface EquipementMaintenanceCardProps {
  style?: any;
  image?: {id: number};
  code: string;
  name: string;
  machine: {name: string};
}

const EquipementMaintenanceCard = ({
  style,
  image,
  code,
  name,
  machine,
}: EquipementMaintenanceCardProps) => {
  const I18n = useTranslator();
  const formatMetaFile = useMetafileUri();

  return (
    <ObjectCard
      style={[styles.card, style]}
      showArrow={false}
      touchable={false}
      leftContainerFlex={2}
      image={
        image?.id != null
          ? {
              generalStyle: styles.imageSize,
              imageSize: styles.imageSize,
              resizeMode: 'contain',
              defaultIconSize: 50,
              source: formatMetaFile(image.id),
            }
          : undefined
      }
      upperTexts={{
        items: [
          {isTitle: true, displayText: code},
          {displayText: name},
          {
            iconName: 'wrench',
            indicatorText: `${I18n.t('Maintenance_Machine')} :`,
            displayText: machine.name,
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 0,
    marginVertical: 4,
    paddingRight: 5,
  },
  imageSize: {
    height: 50,
    width: 50,
  },
});

export default EquipementMaintenanceCard;
