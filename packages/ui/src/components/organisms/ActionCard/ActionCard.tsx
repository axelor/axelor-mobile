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

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import InfoButton from '../InfoButton/InfoButton';
import {useThemeColor} from '../../../theme';
import {
  OUTSIDE_INDICATOR,
  useClickOutside,
} from '../../../hooks/use-click-outside';

const ACTION_WIDTH = 40;
const TWO_ACTIONS_HEIGHT = 84;

export interface Action {
  iconName: string;
  iconColor?: string;
  helper?: string;
  large?: boolean;
  onPress: () => void;
  hidden?: boolean;
  disabled?: boolean;
}

interface ActionCardProps {
  style?: any;
  children: any;
  actionList: Action[];
  quickAction?: Action;
  horizontal?: boolean;
  forceActionsDisplay?: boolean;
  translator: (key: string) => string;
}

const ActionCard = ({
  style,
  children,
  actionList,
  quickAction,
  horizontal = false,
  forceActionsDisplay = false,
  translator,
}: ActionCardProps) => {
  const Colors = useThemeColor();

  const [displaySeeActionsButton, setDisplaySeeActionsButton] = useState(false);
  const [isActionsVisible, setIsActionsVisible] = useState(true);
  const [isDifferentLength, setIsDifferentLength] = useState(false);

  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside({wrapperRef});

  useEffect(() => {
    if (
      clickOutside === OUTSIDE_INDICATOR &&
      displaySeeActionsButton &&
      isActionsVisible &&
      !forceActionsDisplay
    ) {
      setIsActionsVisible(false);
    }
  }, [
    clickOutside,
    displaySeeActionsButton,
    forceActionsDisplay,
    isActionsVisible,
  ]);

  const _actionList = useMemo(
    () =>
      Array.isArray(actionList) && actionList.length > 0
        ? actionList
            .filter(action => !action.hidden)
            .flatMap(action => (action.large ? [action, null] : action))
        : [],
    [actionList],
  );

  const _quickAction = useMemo(
    () =>
      quickAction != null && !quickAction.hidden ? quickAction : undefined,
    [quickAction],
  );

  const isMoreThanOneAction = useMemo(
    () => _actionList.length > 1,
    [_actionList],
  );

  const middleIndex = useMemo(() => {
    if (_actionList.length > 0) {
      const _middleIndex = _actionList.length / 2;
      if (Number.isInteger(_middleIndex)) {
        setIsDifferentLength(false);
        return _middleIndex;
      } else {
        setIsDifferentLength(true);
        return Math.trunc(_middleIndex + 1);
      }
    }
  }, [_actionList]);

  useEffect(() => {
    const shouldDisplay =
      (_quickAction != null && !_quickAction.large
        ? _actionList.length > 1
        : _actionList.length > 2 ||
          (_actionList[0]?.large && horizontal) ||
          _actionList[1]?.large) && !forceActionsDisplay;
    setDisplaySeeActionsButton(shouldDisplay);
    setIsActionsVisible(!shouldDisplay);
  }, [_actionList, forceActionsDisplay, horizontal, _quickAction]);

  const isCardMinHeight = useMemo(
    () => _actionList.length > 1 || _actionList[0]?.large,
    [_actionList],
  );

  const styles = useMemo(
    () => getStyles(isMoreThanOneAction),
    [isMoreThanOneAction],
  );

  const getIconColor = (action: Action) => {
    return action?.iconColor ?? Colors.secondaryColor_dark.background;
  };

  const renderHorizontalActions = (list, isLastList) => {
    return list.map((action, index) => {
      if (action == null) {
        return null;
      }

      const isDoubleWidth =
        action.large ||
        (isLastList && index === list.length - 1 && isDifferentLength);
      return (
        <InfoButton
          style={{width: isDoubleWidth ? ACTION_WIDTH * 2 : ACTION_WIDTH}}
          iconName={action.iconName}
          iconColor={getIconColor(action)}
          indication={action.helper}
          onPress={action.onPress}
          disabled={action.disabled}
          key={index}
        />
      );
    });
  };

  const renderVerticalActions = () => {
    const verticalActions = [];

    let index = 0;
    while (index < _actionList.length) {
      const action1 = _actionList[index];
      const action2 = _actionList[index + 1];
      const action3 = _actionList[index + 2];

      const isThreeActions = _actionList.length - index >= 3;

      verticalActions.push(
        <View
          style={getVerticalActionStyle(action2 == null || action3 === null)}
          key={index}>
          <InfoButton
            style={{width: ACTION_WIDTH}}
            iconName={action1.iconName}
            iconColor={getIconColor(action1)}
            indication={action1.helper}
            onPress={action1.onPress}
            disabled={action1.disabled}
          />
          {action2 != null && (!isThreeActions || action3 != null) && (
            <InfoButton
              style={{width: ACTION_WIDTH}}
              iconName={action2.iconName}
              iconColor={getIconColor(action2)}
              indication={action2.helper}
              onPress={action2.onPress}
              disabled={action2.disabled}
            />
          )}
        </View>,
      );

      index = action3 === null ? index + 1 : index + 2;
    }

    return verticalActions;
  };

  return (
    <View
      style={[styles.container, style]}
      ref={wrapperRef}
      testID="actionCardContainer">
      <View style={styles.cardContainer}>
        {React.cloneElement(children, {
          style: {
            ...(children.props?.style ?? {}),
            minHeight: isCardMinHeight && TWO_ACTIONS_HEIGHT,
          },
        })}
      </View>
      {_actionList.length > 0 &&
        isActionsVisible &&
        (!_quickAction || isMoreThanOneAction) && (
          <View>
            {horizontal ? (
              <>
                <View style={styles.horizontalActionContainer}>
                  {renderHorizontalActions(
                    _actionList.slice(0, middleIndex),
                    false,
                  )}
                </View>
                {isMoreThanOneAction && (
                  <View style={styles.horizontalActionContainer}>
                    {renderHorizontalActions(
                      _actionList.slice(middleIndex),
                      true,
                    )}
                  </View>
                )}
              </>
            ) : (
              <View style={styles.verticalActionContainer}>
                {renderVerticalActions()}
              </View>
            )}
          </View>
        )}
      <View style={styles.quickActionContainer}>
        {_quickAction != null && _actionList.length === 1 && (
          <InfoButton
            style={getVerticalActionStyle(false)}
            iconName={actionList[0].iconName}
            iconColor={getIconColor(actionList[0])}
            indication={actionList[0].helper}
            onPress={actionList[0].onPress}
            disabled={actionList[0].disabled}
          />
        )}
        {displaySeeActionsButton &&
          (!isActionsVisible || _quickAction != null) && (
            <InfoButton
              style={getVerticalActionStyle(
                _quickAction == null || _quickAction.large,
              )}
              iconName="three-dots"
              iconColor={Colors.secondaryColor_dark.background}
              indication={translator('Base_SeeActions')}
              onPress={() => setIsActionsVisible(current => !current)}
            />
          )}
        {_quickAction != null && (
          <InfoButton
            style={getVerticalActionStyle(
              _actionList.length === 0 || _quickAction.large,
            )}
            iconName={_quickAction.iconName}
            iconColor={getIconColor(_quickAction)}
            indication={_quickAction.helper}
            onPress={_quickAction.onPress}
            disabled={_quickAction.disabled}
          />
        )}
      </View>
    </View>
  );
};

const getStyles = (isMoreThanOneAction: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '96%',
      flexDirection: 'row',
      alignSelf: 'center',
      marginVertical: 2,
    },
    cardContainer: {
      flex: 1,
    },
    horizontalActionContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      height: isMoreThanOneAction ? '50%' : '100%',
    },
    verticalActionContainer: {
      flexDirection: 'row',
    },
    quickActionContainer: {
      flexDirection: 'column-reverse',
      flexWrap: 'wrap',
    },
  });

const getVerticalActionStyle = (isLargeAction: boolean) =>
  StyleSheet.create({
    action: {
      width: ACTION_WIDTH,
      height: isLargeAction ? '100%' : '50%',
    },
  }).action;

export default ActionCard;
