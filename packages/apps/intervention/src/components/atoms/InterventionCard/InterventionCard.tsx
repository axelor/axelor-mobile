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
import {DateDisplay, useMetafileUri} from '@axelor/aos-mobile-core';
import {ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {Intervention} from '../../../types';

interface InterventionCardProps {
  style?: any;
  statusSelect: number;
  deliveredPartner: any;
  sequence: string;
  planifStartDateTime: string;
  interventionType: any;
  address?: any;
  onPress: () => void;
}

const InterventionCard = ({
  style,
  statusSelect,
  deliveredPartner,
  sequence,
  planifStartDateTime,
  interventionType,
  address,
  onPress,
}: InterventionCardProps) => {
  const Colors = useThemeColor();
  const formatMetaFile = useMetafileUri();

  const borderStyle = useMemo(
    () =>
      getStyles(Intervention.getStatusColor(statusSelect, Colors)?.background)
        ?.border,
    [Colors, statusSelect],
  );

  return (
    <View style={style}>
      <ObjectCard
        style={[styles.container, borderStyle]}
        onPress={onPress}
        image={{
          defaultIconSize: 50,
          imageSize: styles.imageSize,
          resizeMode: 'contain',
          source: formatMetaFile(deliveredPartner?.picture?.id),
        }}
        upperTexts={{
          items: [
            {displayText: sequence, isTitle: true},
            {displayText: deliveredPartner.fullName},
          ],
        }}
        lowerTexts={{
          items: [
            {
              customComponent: (
                <DateDisplay date={planifStartDateTime} size={14} />
              ),
            },
            {
              indicatorText: interventionType.name,
              iconName: 'tools',
            },
            {
              indicatorText: address.fullName,
              hideIfNull: true,
              iconName: 'geo-alt-fill',
            },
          ],
        }}
      />
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
  container: {
    marginHorizontal: 1,
    marginVertical: 1,
  },
  imageSize: {
    height: 50,
    width: 50,
  },
});

export default InterventionCard;
