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

import React, {ReactElement, useCallback, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useThemeColor} from '../../../theme';
import {getCommonStyles} from '../../../utils';
import {Text} from '../../atoms';

interface ToggleSwitchProps {
  styleContainer?: any;
  styleToogle?: any;
  leftTitle: string;
  leftElement?: ReactElement | React.JSX.Element;
  rightTitle: string;
  rigthElement?: ReactElement | React.JSX.Element;
  onSwitch: () => void;
}

const ToggleSwitch = ({
  styleContainer,
  styleToogle,
  leftTitle,
  leftElement,
  rightTitle,
  rigthElement,
  onSwitch,
}: ToggleSwitchProps) => {
  const Colors = useThemeColor();

  const [active, setActive] = useState(true);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const onLeftPress = useCallback(() => {
    setActive(true);
    onSwitch?.();
  }, [onSwitch]);

  const onRightPress = useCallback(() => {
    setActive(false);
    onSwitch?.();
  }, [onSwitch]);

  const renderSide = useCallback(
    (
      isActive: boolean,
      onPress: () => void,
      testId: string,
      title: string,
      component?: ReactElement | React.JSX.Element,
    ) => {
      return (
        <TouchableOpacity
          style={[
            styles.toggle,
            isActive && {
              backgroundColor: Colors.primaryColor.background_light,
            },
            styleToogle,
          ]}
          disabled={isActive}
          onPress={onPress}
          testID={testId}>
          <Text
            style={isActive ? styles.boldText : undefined}
            textColor={isActive ? Colors.primaryColor.background : undefined}>
            {title}
          </Text>
          {component != null && React.cloneElement(component)}
        </TouchableOpacity>
      );
    },
    [Colors, styleToogle],
  );

  return (
    <View
      style={[
        commonStyles.filter,
        commonStyles.filterAlign,
        styles.container,
        styleContainer,
      ]}
      testID="toggleSwitchContainer">
      {renderSide(
        active,
        onLeftPress,
        'toggleSwitchLeftButton',
        leftTitle,
        leftElement,
      )}
      {renderSide(
        !active,
        onRightPress,
        'toggleSwitchRightButton',
        rightTitle,
        rigthElement,
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  toggle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default ToggleSwitch;
