/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {
  useThemeColor,
  useSwipe,
  Card,
  Text,
  SquareIcon,
} from '@axelor/aos-mobile-ui';
import {sessionStorage} from '../../../sessions';
import LogoImage from '../LogoImage/LogoImage';

const SessionCard = ({
  session,
  _session,
  onChange,
  setAuthorizePopupToOpen,
  setPopupSessionIsOpen,
  setPopupEditIsOpen,
  selectedIndex,
  index,
  logoFile,
  sessionList,
}) => {
  const Colors = useThemeColor();

  const {onTouchStart, onTouchEnd} = useSwipe(onSwipeLeft, onSwipeRight, 6);

  const [showButton, setShowButton] = useState(false);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const translateXAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (showButton) {
      Animated.timing(translateXAnim, {
        toValue: -60,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [
    setAuthorizePopupToOpen,
    setPopupSessionIsOpen,
    showButton,
    translateXAnim,
  ]);

  function onSwipeLeft() {
    setAuthorizePopupToOpen(false);
    setShowButton(true);
    setPopupSessionIsOpen(false);
  }

  function onSwipeRight() {
    setShowButton(false);
    setAuthorizePopupToOpen(false);
    setPopupSessionIsOpen(false);
  }

  const changeActiveSession = useCallback(
    sessionId => {
      sessionStorage.changeActiveSession({sessionId});
      onChange(sessionStorage.getActiveSession());
    },
    [onChange],
  );

  const changeActiveSessionPopup = useCallback(
    sessionId => {
      setAuthorizePopupToOpen(true);
      sessionStorage.changeActiveSession({sessionId});
      onChange(sessionStorage.getActiveSession());
      setPopupSessionIsOpen(true);
    },
    [setAuthorizePopupToOpen, onChange, setPopupSessionIsOpen],
  );

  const removeSession = useCallback(sessionId => {
    sessionStorage.removeSession({sessionId});
  }, []);

  const animateRemoval = useCallback(
    _index => {
      setAuthorizePopupToOpen(false);
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: Dimensions.get('window').width * 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: Dimensions.get('window').height * 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        removeSession(sessionList[_index].sessionId);
        scaleAnim.setValue(1);
        translateXAnim.setValue(0);
        translateYAnim.setValue(0);
      });
    },
    [
      setAuthorizePopupToOpen,
      removeSession,
      sessionList,
      scaleAnim,
      translateXAnim,
      translateYAnim,
    ],
  );

  return (
    <View style={styles.listContainer}>
      <TouchableOpacity
        onLongPress={() => {
          changeActiveSession(_session.sessionId);
          onSwipeLeft();
        }}
        onPress={() => {
          onSwipeRight();
          changeActiveSessionPopup(_session.sessionId);
        }}
        activeOpacity={0.9}>
        <Animated.View
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={[
            selectedIndex === index
              ? {
                  transform: [
                    {translateX: translateXAnim},
                    {translateY: translateYAnim},
                    {scale: scaleAnim},
                  ],
                }
              : null,
          ]}>
          <Card
            style={[
              styles.cardContainer,
              _session?.sessionId === session?.sessionId
                ? styles.selectBorderCard
                : styles.borderCard,
              _session?.isDefault ? styles.borderIsDefaultCard : null,
            ]}>
            <View style={styles.imageContainer}>
              <LogoImage logoFile={logoFile} url={_session?.url} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>{_session.id}</Text>
              <Text
                numberOfLines={1}
                style={styles.details}>{`Url: ${_session.url}`}</Text>
            </View>
          </Card>
        </Animated.View>
      </TouchableOpacity>
      {showButton && _session?.sessionId === session?.sessionId && (
        <Animated.View
          style={[
            styles.squareIconContainer,
            {transform: [{translateX: translateXAnim}]},
          ]}>
          <SquareIcon
            iconName="pencil-alt"
            borderColor={Colors.infoColor.background}
            onPress={() => setPopupEditIsOpen(true)}
          />
          <SquareIcon
            iconName="trash-alt"
            borderColor={Colors.errorColor.background}
            onPress={() => animateRemoval(index)}
          />
        </Animated.View>
      )}
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    listContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardContainer: {
      flexDirection: 'row',
      marginVertical: 4,
      width: '100%',
      alignItems: 'center',
      height: Dimensions.get('window').height * 0.15,
    },
    borderCard: {
      borderWidth: 1,
      borderColor: Colors.secondaryColor_dark.background,
    },
    selectBorderCard: {
      borderWidth: 1,
    },
    borderIsDefaultCard: {
      borderWidth: 1,
      borderColor: Colors.primaryColor.background,
    },
    textTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    textContainer: {
      flexDirection: 'column',
      width: '70%',
      marginLeft: 20,
    },
    imageContainer: {
      width: '20%',
      height: 100,
    },
    details: {
      fontStyle: 'italic',
    },
    squareIconContainer: {
      flexDirection: 'column',
      position: 'absolute',
      right: -Dimensions.get('window').height * 0.07 - 10,
    },
  });

export default SessionCard;
