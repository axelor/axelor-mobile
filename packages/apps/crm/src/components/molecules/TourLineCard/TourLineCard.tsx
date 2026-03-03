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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Icon, ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {clipboardProvider} from '@axelor/aos-mobile-core';
import {TourLine} from '../../../types';

interface TourLineCardProps {
  style?: any;
  name: string;
  address: string;
  isValidated: boolean;
}

const TourLineCard = ({
  style,
  address,
  name,
  isValidated = false,
}: TourLineCardProps) => {
  const Colors = useThemeColor();

  const borderStyle = useMemo(() => {
    return getStyles(TourLine.getBorderColor(isValidated, Colors)?.background)
      ?.border;
  }, [Colors, isValidated]);

  return (
    <ObjectCard
      showArrow={false}
      touchable={true}
      onPress={() => clipboardProvider.copyToClipboard(`${name} ${address}`)}
      style={[styles.objectCard, borderStyle, style]}
      upperTexts={{
        items: [
          {displayText: name, isTitle: true, numberOfLines: 1},
          {
            indicatorText: address,
            hideIfNull: true,
            iconName: 'geo-alt-fill',
          },
        ],
      }}
      lowerBadges={{
        style: styles.badgesContainer,
        items: [
          {
            customComponent: (
              <Icon
                name="copy"
                size={16}
                color={Colors.secondaryColor.background}
              />
            ),
          },
        ],
        fixedOnRightSide: true,
      }}
    />
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
  objectCard: {
    marginHorizontal: 0,
    marginRight: 2,
    marginVertical: 2,
    paddingBottom: 5,
    paddingRight: 10,
  },
  badgesContainer: {
    marginTop: 10,
  },
});

export default TourLineCard;
