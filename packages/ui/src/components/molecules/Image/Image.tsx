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
  Image as ReactNativeImage,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  StyleProp,
} from 'react-native';
import {useThemeColor} from '../../../theme';
import {Icon} from '../../atoms';

/* The server answers an empty picture field with a 1x1 blank image and
   status 200, so the image never fails: remember those addresses and show
   the placeholder for them. */
const emptyImageUris = new Set<string>();

interface ImageProps {
  imageSize?: StyleProp<ImageStyle>;
  generalStyle?: StyleProp<ImageStyle>;
  resizeMode: ImageResizeMode;
  source: ImageSourcePropType | undefined;
  defaultIconSize?: number;
}

const Image = ({
  imageSize,
  generalStyle,
  resizeMode,
  source,
  defaultIconSize = 60,
}: ImageProps) => {
  let timeOutReload = useRef<any>(null);
  const Colors = useThemeColor();

  const [isValid, setValid] = useState(true);

  const handleURIError = () => {
    setValid(_current => {
      if (_current) {
        return false;
      }

      return _current;
    });
  };

  const uri = (source as ImageURISource | undefined)?.uri;

  useEffect(() => {
    if (uri == null || emptyImageUris.has(uri)) {
      return;
    }

    let active = true;
    ReactNativeImage.getSize(uri)
      .then(({width, height}) => {
        if (width === 1 && height === 1) {
          emptyImageUris.add(uri);
          active && setValid(false);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [uri]);

  useEffect(() => {
    if (source != null) {
      const id = setTimeout(() => setValid(true));
      timeOutReload.current = id;

      return () => {
        clearTimeout(timeOutReload.current);
      };
    }
  }, [source]);

  if (
    source == null ||
    isValid === false ||
    (uri != null && emptyImageUris.has(uri))
  ) {
    return (
      <Icon
        name="camera-fill"
        size={defaultIconSize}
        color={Colors.secondaryColor.background_light}
        style={generalStyle}
      />
    );
  }

  return (
    <ReactNativeImage
      accessible={true}
      accessibilityRole="image"
      onError={handleURIError}
      resizeMode={resizeMode}
      source={source}
      style={[imageSize, generalStyle]}
    />
  );
};

export default Image;
