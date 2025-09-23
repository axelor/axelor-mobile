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

interface CheckListItemCardProps {
  style?: any;
  title: string;
  updatedBy: {fullName: string};
  createdBy: {fullName: string};
}

const CheckListItemCard = ({
  style,
  title,
  updatedBy,
  createdBy,
}: CheckListItemCardProps) => {
  return (
    <ObjectCard
      style={[styles.container, style]}
      touchable={false}
      showArrow={false}
      upperTexts={{
        items: [
          {
            isTitle: true,
            displayText: title,
          },
          {
            iconName: 'person-fill',
            indicatorText: updatedBy?.fullName ?? createdBy?.fullName,
            hideIfNull: true,
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    marginHorizontal: 0,
    marginRight: 2,
    justifyContent: 'center',
  },
});

export default CheckListItemCard;
