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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useThemeColor} from '../../../theme';
import {Icon, Text} from '../../atoms';
import {BottomSheet} from '../../molecules';
import {Action as ActionCardType} from '../ActionCard/ActionCard';

interface Action extends ActionCardType {
  closeAfter?: boolean;
}

interface ActionSheetProps {
  style?: any;
  visible: boolean;
  title?: string;
  headerChildren?: any;
  actionList: Action[];
  onClose?: () => void;
}

const ActionSheet = ({
  style,
  visible = false,
  title,
  headerChildren,
  actionList,
  onClose,
}: ActionSheetProps) => {
  const Colors = useThemeColor();

  const _actionList = useMemo(
    () =>
      Array.isArray(actionList)
        ? actionList.filter(action => !action.hidden)
        : [],
    [actionList],
  );

  const getColor = (action: Action) => {
    if (action.disabled) return Colors.secondaryColor.background;

    return action.iconColor ?? Colors.secondaryColor_dark.background;
  };

  const handlePress = (action: Action) => {
    action.onPress();
    if (action.closeAfter !== false) onClose?.();
  };

  return (
    <BottomSheet
      visible={visible}
      title={title}
      onClose={onClose}
      style={style}>
      {headerChildren != null && (
        <View
          style={[
            styles.header,
            {borderBottomColor: Colors.secondaryColor.background_light},
          ]}
          testID="actionSheetHeader">
          {headerChildren}
        </View>
      )}
      <View testID="actionSheetContainer">
        {_actionList.map((action, index) => {
          const color = getColor(action);

          return (
            <TouchableOpacity
              key={index}
              style={styles.row}
              disabled={action.disabled}
              onPress={() => handlePress(action)}
              activeOpacity={0.9}
              testID="actionSheetRow">
              <Icon name={action.iconName} color={color} />
              <Text style={styles.label}>{action.helper}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    marginBottom: 4,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    gap: 10,
  },
  label: {
    flex: 1,
  },
});

export default ActionSheet;
