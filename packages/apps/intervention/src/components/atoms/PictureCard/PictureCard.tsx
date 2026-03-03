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

import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AOSImage,
  openFileInExternalApp,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {CircleButton, useThemeColor} from '@axelor/aos-mobile-ui';

const IMAGE_HEIGHT = Dimensions.get('window').width * 0.45;

interface PictureCardProps {
  style?: any;
  item: any;
  handleDelete: () => void;
  showDeleteIcon: any;
  onSelectImage: (itemId: any) => void;
}

const PictureCard = ({
  style,
  item,
  handleDelete,
  showDeleteIcon,
  onSelectImage,
}: PictureCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);

  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const handleLongPress = () => {
    onSelectImage(item.id);
    startShakeAnimation(shakeAnimation);
  };

  const startShakeAnimation = animationRef => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationRef, {
          toValue: 5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(animationRef, {
          toValue: -5,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      {iterations: 2},
    ).start();
  };

  const handleShowFile = async () => {
    await openFileInExternalApp(
      {fileName: item?.fileName, id: item?.id, isMetaFile: true},
      {baseUrl: baseUrl, token: token, jsessionId: jsessionId},
      I18n,
    );
  };

  return (
    <View style={style}>
      <TouchableOpacity
        onPress={handleShowFile}
        onLongPress={handleLongPress}
        delayLongPress={300}>
        <Animated.View style={{transform: [{translateX: shakeAnimation}]}}>
          <AOSImage
            imageSize={styles.imageSize}
            resizeMode="contain"
            metaFile={item}
            defaultIconSize={IMAGE_HEIGHT}
          />
        </Animated.View>
      </TouchableOpacity>
      {showDeleteIcon && (
        <CircleButton
          iconName="x-lg"
          size={30}
          isNeutralBackground={true}
          style={styles.closeIcon}
          onPress={handleDelete}
          color={Colors.importantColor}
          square={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageSize: {
    height: IMAGE_HEIGHT,
    width: IMAGE_HEIGHT,
  },
  closeIcon: {
    position: 'absolute',
    right: -5,
    top: -10,
    minHeight: null,
  },
});

export default PictureCard;
