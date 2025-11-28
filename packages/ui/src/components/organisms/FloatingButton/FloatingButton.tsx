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

import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useOutsideClickHandler} from '../../../hooks';
import {ThemeColors, useThemeColor} from '../../../theme';
import {CircleButton} from '../../molecules';
import {Icon} from '../../atoms';
import {
  ACTION_BUTTON_SIZE_PERCENTAGE,
  ActionProps,
  FLOATING_BUTTON_SIZE,
  FloatingButtonProps,
} from './types';
import FloatingActionButton from './FloatingActionButton';
import Indicator from './Indicator';

const FloatingButton = ({
  style,
  actions: _actions,
  iconName = 'plus-lg',
  closeIconName = 'x-lg',
  buttonStyle,
  buttonColor,
  size = FLOATING_BUTTON_SIZE,
  closeOnOutsideClick = true,
  onGlobalPress,
  translator,
  useCircleStyle = false,
  expandable = true,
  defaultOpenValue = false,
}: FloatingButtonProps) => {
  const Colors = useThemeColor();

  const [isOpen, setIsOpen] = useState(defaultOpenValue);
  const [expanded, setExpanded] = useState(defaultOpenValue);

  const wrapperRef = useRef(null);
  useOutsideClickHandler({
    wrapperRef,
    handleOutsideClick: () => setIsOpen(false),
    activationCondition: isOpen && closeOnOutsideClick,
  });

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const handleFLoatingButtonPress = useCallback(() => {
    if (onGlobalPress) {
      onGlobalPress();
    }
    setIsOpen(current => !current);
    setExpanded(true);
  }, [onGlobalPress]);

  const actionButtonParams = useMemo(() => {
    const actionButtonSize = Math.floor(size * ACTION_BUTTON_SIZE_PERCENTAGE);
    const actionButtonMarginRight =
      Math.floor((size - actionButtonSize) / 2) - 1;

    return {
      size: actionButtonSize,
      marginRight: actionButtonMarginRight,
    };
  }, [size]);

  const renderAction = useCallback(
    (action: ActionProps) => (
      <FloatingActionButton
        key={action.key}
        title={action.title}
        iconName={action.iconName}
        color={action.color}
        size={actionButtonParams.size}
        margin={actionButtonParams.marginRight}
        disabled={action.disabled}
        indicator={action.indicator}
        onPress={() => {
          action.onPress();
          if (action.closeOnPress) {
            handleFLoatingButtonPress();
          }
        }}
        translator={translator}
        useCircleStyle={useCircleStyle}
      />
    ),
    [actionButtonParams, handleFLoatingButtonPress, translator, useCircleStyle],
  );

  const actions = useMemo(() => {
    if (_actions == null || _actions?.length === 0) {
      return [];
    }

    return _actions.filter(action => action.hideIf !== true);
  }, [_actions]);

  const showIndicator = useMemo(
    () => actions.some(_action => _action.indicator),
    [actions],
  );

  const _buttonColor = useMemo(
    () => buttonColor ?? Colors.primaryColor,
    [Colors.primaryColor, buttonColor],
  );

  if (actions == null || actions?.length === 0) {
    return <View />;
  }

  return (
    <View
      ref={wrapperRef}
      testID="floatingButtonContainer"
      style={[styles.container, style]}>
      {isOpen && (
        <View
          style={[
            {padding: actionButtonParams.marginRight},
            useCircleStyle ? styles.actionsContainer : null,
          ]}>
          {useCircleStyle && expandable ? (
            <Icon
              name={expanded ? 'chevron-down' : 'chevron-up'}
              touchable={true}
              onPress={() => setExpanded(current => !current)}
            />
          ) : null}
          {!expanded && useCircleStyle && (
            <Indicator
              show={showIndicator}
              color={Colors.errorColor}
              style={styles.indicator}
            />
          )}
          {expanded && actions.map(renderAction)}
        </View>
      )}
      <CircleButton
        testID="floatingButtonMainButton"
        iconName={isOpen ? closeIconName : iconName}
        onPress={handleFLoatingButtonPress}
        size={size}
        color={_buttonColor}
        style={[styles.floatingButton, buttonStyle]}
        square={!useCircleStyle}
      />
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
    actionsContainer: {
      backgroundColor: Colors.backgroundColor,
      borderRadius: 60,
      borderTopWidth: 0.5,
      borderRightWidth: 0.5,
      borderLeftWidth: 0.5,
      borderTopColor: 'rgba(0,0,0,0.1)',
      borderRightColor: 'rgba(0,0,0,0.2)',
      borderLeftColor: 'rgba(0,0,0,0.1)',
      elevation: 3,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
    },
    floatingButton: {
      alignSelf: 'flex-end',
    },
    indicator: {
      right: 5,
      left: null,
      top: -2,
    },
  });

export default FloatingButton;
