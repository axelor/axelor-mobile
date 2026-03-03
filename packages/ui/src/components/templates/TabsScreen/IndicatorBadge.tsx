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
import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme';
import {Badge} from '../../molecules';
import {BADGE_SIZE} from './tabs.helper';

const IndicatorBadge = ({count}) => {
  const Colors = useThemeColor();

  return (
    <View style={countBadgeStyles.badgeContainer}>
      <Badge
        title={count}
        style={countBadgeStyles.badge}
        txtStyle={countBadgeStyles.badgeTxt}
        color={Colors.primaryColor}
      />
    </View>
  );
};

const countBadgeStyles = StyleSheet.create({
  badgeContainer: {
    height: BADGE_SIZE,
    width: BADGE_SIZE + 10,
    alignItems: 'flex-end',
  },
  badge: {
    borderRadius: Math.ceil(BADGE_SIZE / 2),
    minWidth: BADGE_SIZE,
    height: BADGE_SIZE,
    position: 'absolute',
    width: null,
  },
  badgeTxt: {
    fontWeight: 'bold',
  },
});

export default IndicatorBadge;
