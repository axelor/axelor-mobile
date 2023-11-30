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

import React from 'react';
import {ColorValue, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import iconsMap from '../../../icons/bootstrap-icon-map.json';

interface BootstrapIconProps {
  name: string;
  size: number;
  color: ColorValue;
  style?: React.CSSProperties | unknown;
}

const BootstrapIcon = ({name, size, color, style}: BootstrapIconProps) => {
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
        style={style}>
        {_pathList.map((_path, index) => (
          <Path key={index} d={_path} />
        ))}
      </Svg>
    );
  }

  return (
    <Text
      style={{
        fontSize: size / 2,
        color,
      }}>
      ?
    </Text>
  );
};

export default React.memo(BootstrapIcon);
