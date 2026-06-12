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

import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useThemeColor} from '../../../theme';
import {checkNullString} from '../../../utils';
import {Text} from '../../atoms';

const ANIMATION_DURATION = 250;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const CLOSE_THRESHOLD = 120;
const CLOSE_VELOCITY = 0.5;

interface BottomSheetProps {
  style?: any;
  visible: boolean;
  title?: string;
  children: any;
  onClose?: () => void;
}

const BottomSheet = ({
  style,
  visible = false,
  title,
  children,
  onClose,
}: BottomSheetProps) => {
  const Colors = useThemeColor();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (
          gestureState.dy > CLOSE_THRESHOLD ||
          gestureState.vy > CLOSE_VELOCITY
        ) {
          onCloseRef.current?.();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) setMounted(true);
  }, [visible]);

  useEffect(() => {
    if (!mounted) return;

    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
        }),
      ]).start(() => setMounted(false));
    }
  }, [visible, mounted, translateY, opacity]);

  if (!mounted) return null;

  return (
    <Modal
      testID="bottomSheetModal"
      visible
      transparent
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.scrim, {opacity}]} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.panel,
            {
              backgroundColor: Colors.backgroundColor,
              transform: [{translateY}],
            },
            style,
          ]}>
          <View style={styles.header} {...panResponder.panHandlers}>
            <View
              style={[
                styles.grip,
                {backgroundColor: Colors.secondaryColor.background},
              ]}
            />
            {!checkNullString(title) && (
              <Text
                numberOfLines={1}
                fontSize={12}
                textColor={Colors.secondaryColor_dark.background}
                style={styles.title}>
                {title}
              </Text>
            )}
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  panel: {
    width: '100%',
    maxHeight: '80%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  header: {
    paddingVertical: 6,
  },
  grip: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  title: {
    paddingHorizontal: 20,
    marginBottom: 4,
  },
});

export default BottomSheet;
