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

import React from 'react';
import {ColorValue} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import Text from '../Text/Text';
import iconsMap from '../../../icons/bootstrap-icon-map.json';
import {useThemeColor} from '../../../theme';

interface BootstrapIconProps {
  name: string;
  size: number;
  color: ColorValue;
  style?: React.CSSProperties | unknown;
}

const BootstrapIcon = ({name, size, color, style}: BootstrapIconProps) => {
  const Colors = useThemeColor();

  if (iconsMap == null) {
    return null;
  }

  const _pathList = iconsMap[name];

  if (_pathList) {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill={color}
        style={style}
        testID={`icon-${name}`}>
        {_pathList.map((_path, index) => (
          <Path key={index} d={_path} />
        ))}
      </Svg>
    );
  }

  return (
    <Text
      textColor={Colors.secondaryColor_dark.background}
      style={{
        fontSize: size / 2,
      }}>
      ?
    </Text>
  );
};

export default React.memo(BootstrapIcon);
