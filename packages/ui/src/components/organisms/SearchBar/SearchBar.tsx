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
  onEndFocus: () => void;
  isFocus?: boolean;
  onScanPress?: () => void;
  scanIconColor?: string;
}

const SearchBar = ({
  style,
  valueTxt,
  placeholder,
  onClearPress,
  onChangeTxt,
  onSelection = () => {},
  onEndFocus = () => {},
  isFocus = false,
  onScanPress = () => {},
  scanIconColor = null,
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
      isFocus={isFocus}
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
          color={Colors.secondaryColor_dark.background}
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
