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
import {StyleSheet} from 'react-native';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon} from '../../atoms';
import {IconInput} from '../../molecules';

interface SearchBarProps {
  style?: any;
  valueTxt: string;
  placeholder: string;
  onClearPress: () => void;
  onChangeTxt: (any) => void;
  onSelection?: () => void;
  onEndFocus?: () => void;
  onScanPress?: () => void;
  scanIconColor?: string;
  onSearchPress?: () => void;
  disableSearchPress?: boolean;
}

const SearchBar = ({
  style,
  valueTxt,
  placeholder,
  onClearPress,
  onChangeTxt,
  onSelection = () => {},
  onEndFocus = () => {},
  onScanPress = () => {},
  scanIconColor = null,
  onSearchPress = () => {},
  disableSearchPress = false,
}: SearchBarProps) => {
  const Colors = useThemeColor();
  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <IconInput
      style={[
        commonStyles.filter,
        commonStyles.filterAlign,
        commonStyles.filterSize,
        style,
      ]}
      value={valueTxt}
      placeholder={placeholder}
      onChange={onChangeTxt}
      onSelection={onSelection}
      onEndFocus={onEndFocus}
      rightIconsList={[
        <Icon
          style={styles.action}
          name="times"
          color={Colors.secondaryColor_dark.background}
          size={20}
          touchable={true}
          visible={valueTxt != null && valueTxt !== ''}
          onPress={onClearPress}
        />,
        <Icon
          style={styles.action}
          name="search"
          color={
            disableSearchPress
              ? Colors.secondaryColor.background
              : Colors.secondaryColor_dark.background
          }
          onPress={onSearchPress}
          touchable={!disableSearchPress}
          size={20}
        />,
        <Icon
          style={styles.action}
          name="qrcode"
          FontAwesome5={false}
          color={scanIconColor}
          size={20}
          touchable={true}
          visible={scanIconColor != null}
          onPress={onScanPress}
        />,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  action: {
    marginLeft: 12,
  },
});

export default SearchBar;
