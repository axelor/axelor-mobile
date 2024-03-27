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

import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AOSImage} from '@axelor/aos-mobile-core';
import {ThemeColors, Icon, useThemeColor} from '@axelor/aos-mobile-ui';

interface PicturesCardProps {
  style?: any;
  item: any;
  onPressClose?: () => void;
}

const PicturesCard = ({style, item, onPressClose}: PicturesCardProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const ImageWithCloseButton = ({imageItem}) => (
    <View style={styles.imageContainer}>
      <AOSImage
        generalStyle={styles.imageStyle}
        imageSize={styles.imageSize}
        resizeMode="stretch"
        metaFile={imageItem.pictureFile}
        defaultIconSize={60}
      />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => onPressClose()}>
        <Icon name="x-lg" size={15} color={Colors.importantColor.background} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.rowContainer, style]}>
      {item.item1 && <ImageWithCloseButton imageItem={item.item1} />}
      {item.item2 && <ImageWithCloseButton imageItem={item.item2} />}
    </View>
  );
};

const getStyles = (color: ThemeColors) =>
  StyleSheet.create({
    imageSize: {
      height: Dimensions.get('window').width * 0.4,
      width: Dimensions.get('window').width * 0.4,
    },
    imageStyle: {
      flex: 1,
      margin: 5,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
      marginVertical: 5,
    },
    imageContainer: {
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      right: -5,
      backgroundColor: color.backgroundColor,
      borderRadius: 50,
      padding: 5,
      borderWidth: 2,
      borderColor: color.importantColor.background,
    },
  });

export default PicturesCard;
