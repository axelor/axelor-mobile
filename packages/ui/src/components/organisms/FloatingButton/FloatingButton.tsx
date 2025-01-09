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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {animationUtil} from '../../../tools/AnimationUtil';
import {Text} from '../../atoms';
import {
  OUTSIDE_INDICATOR,
  useClickOutside,
} from '../../../hooks/use-click-outside';
import {useThemeColor} from '../../../theme/ThemeContext';
import {ThemeColors} from '../../../theme/themes';
import {CircleButton} from '../../molecules';

interface FloatingButtonProps {
  actions: ActionProps[];
  iconName?: string;
  size?: number;
  style?: any;
  translator: (translationKey: string) => string;
}

interface ActionProps {
  key: number;
  title: string;
  iconName: string;
  disabled: boolean;
  onPress: () => void;
}

const FLOATING_BUTTON_SIZE = 60;
const ACTION_BUTTON_SIZE_PERCENTAGE = 0.8;
const MIN_ACTION_BUTTON_WIDTH = 200;

const FloatingActionButton = ({
  actionKey,
  title,
  iconName,
  size,
  disabled = false,
  onPress,
  translator,
}: {
  actionKey: number;
  title: string;
  iconName: string;
  size: number;
  disabled?: boolean;
  onPress: (actionKey: number) => void;
  translator: (translationKey: string) => string;
}) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const handleActionPress = useCallback(
    () => onPress(actionKey),
    [actionKey, onPress],
  );

  return (
    <View style={styles.actionButtonContainer}>
      <CircleButton
        iconName={iconName}
        size={size}
        onPress={handleActionPress}
        disabled={disabled}
      />
      <View style={styles.actionTitleContainer}>
        <Text fontSize={16} style={styles.actionTitle}>
          {translator(title)}
        </Text>
      </View>
    </View>
  );
};

const FloatingButton = ({
  actions,
  iconName = 'plus',
  size = FLOATING_BUTTON_SIZE,
  style,
  translator,
}: FloatingButtonProps) => {
  const Colors = useThemeColor();
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside({
    wrapperRef,
  });

  useEffect(() => {
    if (clickOutside === OUTSIDE_INDICATOR && isOpen) {
      animationUtil.animateNext();
      setIsOpen(false);
    }
  }, [clickOutside, isOpen]);

  const actionSize = useMemo(
    () => Math.floor(size * ACTION_BUTTON_SIZE_PERCENTAGE),
    [size],
  );

  const onActionPress = useCallback(actionPress => {
    actionPress();
    setIsOpen(false);
  }, []);

  const actionComponents = useMemo(
    () =>
      actions
        ?.reverse()
        ?.map(action => (
          <FloatingActionButton
            key={action.key}
            actionKey={action.key}
            title={action.title}
            iconName={action.iconName}
            size={actionSize}
            disabled={action.disabled}
            onPress={() => onActionPress(action.onPress)}
            translator={translator}
          />
        )),
    [actions, actionSize, onActionPress, translator],
  );

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const handleFLoatingButtonPress = useCallback(() => {
    animationUtil.animateNext();
    setIsOpen(current => !current);
  }, []);

  if (actions == null || actions?.length === 0) {
    return <View />;
  }

  return (
    <View ref={wrapperRef} style={[styles.container, style]}>
      {isOpen && (
        <View style={styles.actionsContainer}>{actionComponents}</View>
      )}
      <CircleButton
        iconName={isOpen ? 'times' : iconName}
        onPress={handleFLoatingButtonPress}
        size={size}
      />
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    actionButtonContainer: {
      flexDirection: 'row-reverse',
      marginTop: 7,
    },
    actionsContainer: {
      marginVertical: 10,
      paddingHorizontal: 7,
    },
    actionTitleContainer: {
      backgroundColor: Colors.screenBackgroundColor,
      marginHorizontal: 15,
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: MIN_ACTION_BUTTON_WIDTH,
      borderRadius: 7,
      elevation: 3,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
    },
    actionTitle: {
      textAlign: 'center',
    },
    container: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginVertical: 10,
      marginHorizontal: 20,
    },
  });

export default FloatingButton;
