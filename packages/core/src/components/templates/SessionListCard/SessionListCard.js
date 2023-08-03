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
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {onTouchStart, onTouchEnd} = useSwipe(onSwipeLeft, onSwipeRight, 6);

  const [showButton, setShowButton] = useState(false);

  const sessions = useMemo(() => sessionList, [sessionList]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const translateXAnim = useRef(new Animated.Value(1)).current;

  const selectedIndex = sessions.findIndex(
    _session => _session.id === session.id,
  );

  function onSwipeLeft() {
    Animated.timing(translateXAnim, {
      toValue: -60,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setPopupSessionIsOpen(false);
    setShowButton(true);
    setPopupSessionIsOpen(false);
    setShowButton(true);
  }

  function onSwipeRight() {
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
      sessionStorage.changeActiveSession({sessionId});
      onChange(sessionStorage.getActiveSession());
      setPopupSessionIsOpen(true);
    },
    [onChange, setPopupSessionIsOpen],
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
                onPress={() => {
                  onSwipeRight();
                  changeActiveSession(_session.id);
                }}
                activeOpacity={0.9}>
                <Animated.View
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                  style={[
                    selectedIndex === index
                      ? {transform: [{translateX: translateXAnim}]}
                      : null,
                  ]}>
                  <Card
                    style={[
                      styles.cardContainer,
                      _session.id === session.id
                        ? styles.selectBorderCard
                        : styles.borderCard,
                    ]}>
                    <View style={styles.imageContainer}>
                      <LogoImage logoFile={logoFile} url={_session?.url} />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.textTitle}>{_session.id}</Text>
                      <Text numberOfLines={1}>{`Url: ${_session.url}`}</Text>
                    </View>
                  </Card>
                </Animated.View>
              </TouchableOpacity>
              {showButton && _session.id === session.id && (
                <Animated.View
                  style={[
                    styles.squareIconContainer,
                    {transform: [{translateX: translateXAnim}]},
                  ]}>
                  <Icon
                    name="pencil-alt"
                    style={styles.iconPen}
                    touchable={true}
                    onPress={() => setPopupCreateIsOpen(true)}
                  />
                  <Icon
                    name="trash-alt"
                    style={styles.iconTrash}
                    touchable={true}
                    onPress={() => removeSession(_session.id)}
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
      width: '90%',
    },
    contentContainer: {
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
    },
    icon: {
      marginHorizontal: 4,
    },
    iconPlus: {
      marginHorizontal: 4,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primaryColor.background_light,
      borderWidth: 2,
      borderColor: Colors.primaryColor.background,
      borderRadius: Dimensions.get('window').width * 0.07,
      width: Dimensions.get('window').width * 0.07,
      height: Dimensions.get('window').width * 0.07,
    },
    squareIconContainer: {
      flexDirection: 'column',
      position: 'absolute',
      right: -60,
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
