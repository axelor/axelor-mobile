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

import React, {useCallback, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useThemeColor, Card, Text, Icon} from '@axelor/aos-mobile-ui';
import LogoImage from './LogoImage';
import {sessionStorage} from '../..';

const SessionCard = ({
  session,
  changeActiveSession,
  openConnection,
  openEdition,
  isUnactive,
  logoFile,
  handleRemove = null,
}) => {
  const Colors = useThemeColor();
  const ref = useRef(null);

  const translateXAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleCloseSwipe = () => {
    ref.current.close();
  };

  const handleConnection = useCallback(() => {
    handleCloseSwipe();
    changeActiveSession(session);
    openConnection();
  }, [changeActiveSession, openConnection, session]);

  const handleEdition = useCallback(() => {
    handleCloseSwipe();
    changeActiveSession(session);
    openEdition();
  }, [changeActiveSession, openEdition, session]);

  const animateRemoval = useCallback(() => {
    handleCloseSwipe();
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
      if (handleRemove != null) {
        handleRemove({sessionId: session.id});
      } else {
        sessionStorage.removeSession({sessionId: session.id});
      }
      scaleAnim.setValue(1);
      translateXAnim.setValue(0);
      translateYAnim.setValue(0);
    });
  }, [handleRemove, scaleAnim, session, translateXAnim, translateYAnim]);

  const renderActionButton = (trans, iconName, color, onPress) => {
    return (
      <Animated.View
        style={[styles.actionView, {transform: [{translateX: trans}]}]}>
        <RectButton onPress={onPress}>
          <View
            style={[
              styles.action,
              {borderColor: color, backgroundColor: Colors.backgroundColor},
            ]}>
            <Icon name={iconName} color={color} size={18} />
          </View>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (_, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
    });

    return (
      <View style={styles.actionsContainer}>
        {renderActionButton(
          trans,
          'pencil-fill',
          Colors.infoColor.background,
          handleEdition,
        )}
        {renderActionButton(
          trans,
          'trash3-fill',
          Colors.errorColor.background,
          animateRemoval,
        )}
      </View>
    );
  };

  useEffect(() => {
    if (isUnactive) {
      handleCloseSwipe();
    }
  }, [isUnactive]);

  return (
    <GestureHandlerRootView style={styles.swipeContainer}>
      <Swipeable ref={ref} renderRightActions={renderRightActions}>
        <TouchableOpacity
          onLongPress={() => {
            ref.current.openRight();
          }}
          onPress={handleConnection}
          activeOpacity={0.9}>
          <Animated.View
            style={[
              {
                transform: [
                  {translateX: translateXAnim},
                  {translateY: translateYAnim},
                  {scale: scaleAnim},
                ],
              },
            ]}>
            <Card
              style={[
                styles.cardContainer,
                {
                  borderColor: session?.isDefault
                    ? Colors.primaryColor.background
                    : Colors.secondaryColor.background_light,
                },
              ]}>
              <View
                style={[
                  styles.logoTile,
                  {borderColor: Colors.secondaryColor.background_light},
                ]}>
                <LogoImage logoFile={logoFile} url={session.url} />
              </View>
              <View style={styles.textContainer}>
                <Text writingType="title" fontSize={18}>
                  {session.name}
                </Text>
                <View style={styles.urlRow}>
                  <Icon
                    name="link-45deg"
                    size={16}
                    color={Colors.secondaryColor_dark.background}
                  />
                  <Text
                    style={styles.urlText}
                    writingType="details"
                    numberOfLines={1}
                    textColor={Colors.secondaryColor_dark.background_light}>
                    {session.url}
                  </Text>
                </View>
              </View>
            </Card>
          </Animated.View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  swipeContainer: {
    width: Dimensions.get('window').width,
  },
  cardContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: '90%',
    minHeight: 88,
    borderWidth: 1,
    borderRadius: 16,
  },
  logoTile: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    padding: 6,
    overflow: 'hidden',
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 16,
  },
  urlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  urlText: {
    flex: 1,
    marginLeft: 4,
  },
  actionsContainer: {
    marginLeft: -8,
    marginRight: 20,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionView: {
    height: '100%',
    justifyContent: 'center',
  },
  action: {
    width: 56,
    height: 56,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 16,
    marginHorizontal: 4,
  },
});

export default SessionCard;
