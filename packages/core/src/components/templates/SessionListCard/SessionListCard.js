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

import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import {
  useThemeColor,
  Card,
  Text,
  InfoBubble,
  Icon,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {sessionStorage} from '../../../sessions';
import {LogoImage} from '../../organisms';
import {SessionNumberIndicator} from '../../molecules';
import {useSwipe} from '../../../hooks/useSwipe';

const SessionListCard = ({
  sessionList,
  onChange,
  logoFile,
  setPopupSessionIsOpen,
  setPopupCreateIsOpen,
  session,
  setAuthorizePopupToOpen,
  setPopupEditIsOpen,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {onTouchStart, onTouchEnd} = useSwipe(onSwipeLeft, onSwipeRight, 6);

  const [showButton, setShowButton] = useState(false);

  const sessions = useMemo(() => sessionList, [sessionList]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const translateXAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const selectedIndex = sessions.findIndex(
    _session => _session?.sessionId === session?.sessionId,
  );

  function onSwipeLeft() {
    setAuthorizePopupToOpen(false);
    Animated.timing(translateXAnim, {
      toValue: -60,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setPopupSessionIsOpen(false);
    setShowButton(true);
    setPopupSessionIsOpen(false);
    setShowButton(true);
  }

  function onSwipeRight() {
    setAuthorizePopupToOpen(false);
    Animated.timing(translateXAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setPopupSessionIsOpen(false);
    setShowButton(false);
  }

  const removeSession = useCallback(sessionId => {
    sessionStorage.removeSession({sessionId});
  }, []);

  const changeActiveSession = useCallback(
    sessionId => {
      setAuthorizePopupToOpen(true);
      translateXAnim.setValue(0);
      translateYAnim.setValue(0);
      scaleAnim.setValue(1);

      sessionStorage.changeActiveSession({sessionId});
      onChange(sessionStorage.getActiveSession());
      setPopupSessionIsOpen(true);
    },
    [
      setAuthorizePopupToOpen,
      onChange,
      scaleAnim,
      setPopupSessionIsOpen,
      translateXAnim,
      translateYAnim,
    ],
  );

  const animateRemoval = useCallback(
    index => {
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
        removeSession(sessionList[index].sessionId);
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

  if (!Array.isArray(sessions) || sessions?.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <InfoBubble
          indication={I18n.t('Auth_InfoSession')}
          iconName="info"
          badgeColor={Colors.cautionColor}
          textIndicationStyle={styles.textIndicationStyle}
          style={styles.icon}
        />
        <SessionNumberIndicator number={sessionList?.length} />
        <Icon
          name="plus"
          style={styles.iconPlus}
          touchable={true}
          onPress={() => setPopupCreateIsOpen(true)}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}>
        {sessions.map((_session, index) => {
          return (
            <View key={index} style={styles.listContainer}>
              <TouchableOpacity
                onLongPress={() => {
                  changeActiveSession(_session.sessionId);
                  onSwipeLeft();
                }}
                onPress={() => {
                  onSwipeRight();
                  changeActiveSession(_session.sessionId);
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
                  <Icon
                    name="pencil-alt"
                    style={styles.iconPen}
                    touchable={true}
                    onPress={() => setPopupEditIsOpen(true)}
                  />
                  <Icon
                    name="trash-alt"
                    style={styles.iconTrash}
                    touchable={true}
                    onPress={() => animateRemoval(index)}
                    color={Colors.errorColor.background}
                  />
                </Animated.View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      maxHeight: Dimensions.get('window').height * 0.45,
    },
    listContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    scrollView: {
      width: '100%',
    },
    contentContainer: {
      alignItems: 'center',
      paddingHorizontal: '5%',
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
      borderColor: Colors.infoColor.background,
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
    iconContainer: {
      alignSelf: 'flex-end',
      flexDirection: 'row',
      paddingHorizontal: '5%',
    },
    icon: {
      marginHorizontal: 4,
    },
    details: {
      fontStyle: 'italic',
    },
    iconPlus: {
      marginHorizontal: 4,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.secondaryColor_dark.foreground,
      borderWidth: 2,
      borderColor: Colors.primaryColor.background,
      borderRadius: Dimensions.get('window').width * 0.07,
      width: Dimensions.get('window').width * 0.07,
      height: Dimensions.get('window').width * 0.07,
    },
    squareIconContainer: {
      flexDirection: 'column',
      position: 'absolute',
      right: -Dimensions.get('window').height * 0.07 - 10,
    },
    iconTrash: {
      marginHorizontal: 4,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.secondaryColor_dark.foreground,
      borderWidth: 2,
      borderColor: Colors.errorColor.background,
      borderRadius: 10,
      width: Dimensions.get('window').height * 0.07,
      height: Dimensions.get('window').height * 0.07,
      marginVertical: 3,
    },
    iconPen: {
      marginHorizontal: 4,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.secondaryColor_dark.foreground,
      borderWidth: 2,
      borderColor: Colors.infoColor.background,
      borderRadius: 10,
      width: Dimensions.get('window').height * 0.07,
      height: Dimensions.get('window').height * 0.07,
      marginVertical: 3,
    },
    textIndicationStyle: {
      width: Dimensions.get('window').width * 0.7,
    },
  });

export default SessionListCard;
