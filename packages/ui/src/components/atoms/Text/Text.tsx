/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {Text as ReactNativeText, TextStyle} from 'react-native';
import {useThemeColor, useWritingType} from '../../../theme';

export interface TextProps {
  style?: any;
  numberOfLines?: number;
  adjustsFontSizeToFit?: boolean;
  onTextLayout?: (any) => void;
  children: any;
  textColor?: string;
  fontSize?: number;
  writingType?: 'title' | 'subtitle' | 'important' | 'details' | undefined;
  testID?: string;
}

const Text = ({
  style,
  numberOfLines,
  adjustsFontSizeToFit = false,
  onTextLayout,
  children,
  textColor,
  fontSize,
  writingType,
  testID,
}: TextProps) => {
  const Colors = useThemeColor();
  const writingStyle = useWritingType(writingType);

  const defaultStyle: TextStyle = useMemo(() => {
    return {
      ...writingStyle,
      color: textColor ? textColor : Colors.text,
      fontSize: fontSize ? fontSize : writingStyle.fontSize,
    };
  }, [Colors.text, fontSize, textColor, writingStyle]);

  return (
    <ReactNativeText
      testID={testID}
      style={[defaultStyle, style]}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      onTextLayout={onTextLayout}>
      {children}
    </ReactNativeText>
  );
};

export default Text;
