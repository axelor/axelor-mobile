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
import {StyleSheet, View} from 'react-native';
import {Action} from './ScrollList';
import DottedButton from './DottedButton';

export interface TopActionsProps {
  actionList?: Action[];
  verticalAction?: boolean;
}

const TopActions = ({actionList, verticalAction}: TopActionsProps) => {
  return (
    <View style={styles.container}>
      {actionList.map((action, index) => {
        let _verticalAction = verticalAction;
        if (_verticalAction && index === actionList.length - 1) {
          _verticalAction = false;
        }

        return (
          <DottedButton
            iconName={action.iconName}
            title={action.title}
            vertical={_verticalAction}
            onPress={action.onPress}
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
    justifyContent: 'space-between',
    marginTop: 5,
    marginHorizontal: 12,
  },
});

export default TopActions;
