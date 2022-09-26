import React, {useMemo} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Icon, Input, useThemeColor} from '@aos-mobile/ui';
import {getCommonStyles} from '@/components/commons-styles';

const SearchBarNoQR = ({
  style,
  valueTxt,
  placeholder,
  onClearPress = () => {},
  onChangeTxt = () => {},
  onSelection = () => {},
  onEndFocus = () => {},
  isFocus = false,
}) => {
  const Colors = useThemeColor();
  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <View
      style={[
        commonStyles.filter,
        commonStyles.filterAlign,
        commonStyles.filterSize,
        style,
      ]}>
      <Input
        style={styles.input}
        value={valueTxt}
        placeholder={placeholder}
        onChange={onChangeTxt}
        onSelection={onSelection}
        onEndFocus={onEndFocus}
        isFocus={isFocus}
      />
      <View style={styles.actions}>
        <View style={styles.action}>
          {valueTxt === '' || valueTxt == null ? null : (
            <Icon
              name="times"
              size={Dimensions.get('window').width * 0.05}
              color={Colors.secondaryColor_dark}
              touchable={true}
              onPress={onClearPress}
            />
          )}
        </View>
        <View style={styles.action}>
          <Icon
            name="search"
            size={Dimensions.get('window').width * 0.05}
            color={Colors.secondaryColor_dark}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
  },
  input: {
    width: '70%',
  },
  actions: {
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
  },
  action: {
    flex: 1,
    marginLeft: 12,
  },
});

export default SearchBarNoQR;
