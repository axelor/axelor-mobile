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
import {Action} from './ScrollList';
import DottedButton from './DottedButton';

export interface TopActionsProps {
  actionList?: Action[];
  verticalActions?: boolean;
}

const TopActions = ({actionList, verticalActions}: TopActionsProps) => {
  return (
    <View style={styles.container} testID="topActionsContainer">
      {actionList?.map((action, index) => {
        let horizontal = verticalActions;
        const isLast = index === actionList.length - 1;
        const isOddCount = actionList.length % 2 === 1;
        if (!verticalActions && isLast && isOddCount) {
          horizontal = true;
        }

        return (
          <DottedButton
            iconName={action.iconName}
            title={action.title}
            horizontal={horizontal}
            onPress={action.onPress}
            key={index}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
    marginHorizontal: 12,
    gap: 5,
  },
});

export default TopActions;
