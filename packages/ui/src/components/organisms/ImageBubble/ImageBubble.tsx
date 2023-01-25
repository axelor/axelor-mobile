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

import React, {useMemo} from 'react';
import {
  Dimensions,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Image} from '../../molecules';

function getComponentPosition(index, imageSize): ViewStyle {
  switch (index) {
    case 0:
      return {
        position: 'absolute',
        bottom: 0,
        left: imageSize * 0.03,
      };
    case 1:
      return {
        position: 'absolute',
        bottom: imageSize * 0.3,
        left: imageSize * 0.3,
      };
    case 2:
      return {
        position: 'absolute',
        bottom: imageSize * 0.7,
        left: imageSize * 0.3,
      };
    case 3:
      return {
        position: 'absolute',
        bottom: imageSize,
        left: imageSize * 0.03,
      };
    case 4:
      return {
        position: 'absolute',
        bottom: imageSize,
        right: imageSize * 0.03,
      };
    case 5:
      return {
        position: 'absolute',
        bottom: imageSize * 0.7,
        right: imageSize * 0.3,
      };
    case 6:
      return {
        position: 'absolute',
        bottom: imageSize * 0.3,
        right: imageSize * 0.3,
      };
    case 7:
      return {
        position: 'absolute',
        bottom: 0,
        right: imageSize * 0.03,
      };
    default:
      return {display: 'none'};
  }
}

interface ImageBubbleProps {
  style?: any;
  listComponent: any;
  source: ImageSourcePropType;
  imageSize?: number;
  defaultIconSize?: number;
}

const ImageBubble = ({
  source,
  listComponent,
  style,
  imageSize = Dimensions.get('window').width * 0.2,
  defaultIconSize = 60,
}: ImageBubbleProps) => {
  const styles = useMemo(() => getStyles(imageSize), [imageSize]);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        generalStyle={[styles.generalImageStyle, style]}
        imageSize={styles.imageStyle}
        defaultIconSize={defaultIconSize}
        source={source}
      />
      <View>
        {listComponent.map((elt, index) => {
          return (
            <View style={getComponentPosition(index, imageSize)} key={index}>
              {elt}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const getStyles = imageSize =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    generalImageStyle: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: '5%',
    },
    imageStyle: {
      borderRadius: imageSize,
      width: imageSize,
      height: imageSize,
    },
  });

export default ImageBubble;
