/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useMemo, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {
  AOSImage,
  openFileInExternalApp,
  useTranslator,
  useSelector,
} from '@axelor/aos-mobile-core';
import {ThemeColors, Icon, useThemeColor} from '@axelor/aos-mobile-ui';

interface PicturesCardProps {
  style?: any;
  item: any;
  onPressClose?: () => void;
  selectedImageId: any;
  onSelectImage: any;
}

const PicturesCard = ({
  style,
  item,
  onPressClose,
  selectedImageId,
  onSelectImage,
}: PicturesCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);

  const shakeAnimation1 = useRef(new Animated.Value(0)).current;
  const shakeAnimation2 = useRef(new Animated.Value(0)).current;

  const handleLongPress = imageId => {
    onSelectImage(imageId);
    const animationRef =
      item.item1.id === imageId
        ? shakeAnimation1
        : item.item2 && item.item2.id === imageId
        ? shakeAnimation2
        : null;
    if (animationRef) {
      startShakeAnimation(animationRef);
    }
  };

  const styles = useMemo(() => getStyles(Colors), [Colors]);

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

  const handleShowFile = async imageData => {
    await openFileInExternalApp(
      {fileName: imageData?.fileName, id: imageData?.id, isMetaFile: true},
      {baseUrl: baseUrl, token: token, jsessionId: jsessionId},
      I18n,
    );
  };

  const renderImage = (imageData, animationRef) => (
    <View style={styles.imageContainer}>
      <TouchableOpacity
        onPress={() => handleShowFile(imageData.pictureFile)}
        onLongPress={() => handleLongPress(imageData.id)}
        delayLongPress={300}>
        <Animated.View style={{transform: [{translateX: animationRef}]}}>
          <AOSImage
            generalStyle={[styles.imageStyle, style]}
            imageSize={styles.imageSize}
            resizeMode="contain"
            metaFile={imageData.pictureFile}
            defaultIconSize={60}
          />
        </Animated.View>
      </TouchableOpacity>
      {selectedImageId === imageData.id && (
        <Icon
          style={styles.closeIcon}
          onPress={() => onPressClose()}
          touchable={true}
          name="x-lg"
          size={15}
          color={Colors.importantColor.background}
        />
      )}
    </View>
  );

  return (
    <View style={styles.rowContainer}>
      {item.item1 && renderImage(item.item1, shakeAnimation1)}
      {item.item2 && renderImage(item.item2, shakeAnimation2)}
    </View>
  );
};

const getStyles = (color: ThemeColors) =>
  StyleSheet.create({
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10,
    },
    imageContainer: {
      position: 'relative',
      margin: 5,
    },
    imageStyle: {
      flex: 1,
    },
    imageSize: {
      height: Dimensions.get('window').width * 0.45,
      width: Dimensions.get('window').width * 0.45,
    },
    closeIcon: {
      position: 'absolute',
      right: -5,
      top: -10,
      backgroundColor: color.backgroundColor,
      borderRadius: 50,
      padding: 5,
      borderWidth: 2,
      borderColor: color.importantColor.background,
    },
  });

export default PicturesCard;
