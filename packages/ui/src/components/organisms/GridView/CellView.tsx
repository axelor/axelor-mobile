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

import React, {useCallback, useMemo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useThemeColor} from '../../../theme';

const CellView = ({showRight = false, showBottom = false, width, ...props}) => {
  const Colors = useThemeColor();

  const getBorderStyle = useCallback(
    side =>
      ({
        [`border${side}Color`]: Colors.secondaryColor.background,
        [`border${side}Width`]: 1,
      }) as StyleProp<ViewStyle>,
    [Colors],
  );

  const borderStyles = useMemo(() => {
    const result: StyleProp<ViewStyle>[] = [{width, padding: 5}];

    if (showRight) {
      result.push(getBorderStyle('Right'));
    }

    if (showBottom) {
      result.push(getBorderStyle('Bottom'));
    }

    return result;
  }, [getBorderStyle, showBottom, showRight, width]);

  return <View {...props} style={borderStyles} testID="cellView" />;
};

export default CellView;
