import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input} from '@/components/atoms';
import {useThemeColor} from '@/features/themeSlice';

const UsernameInput = ({value, onChange, readOnly}) => {
  const Colors = useThemeColor();
  const container = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={container}>
      <Input
        style={styles.input}
        value={value}
        onChange={onChange}
        placeholder="Username"
        readOnly={readOnly}
      />
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    borderColor: Colors.secondaryColor,
    borderWidth: 1,
    borderRadius: 13,
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginHorizontal: 20,
    marginVertical: 6,
  });

const styles = StyleSheet.create({
  input: {
    width: '100%',
  },
});

export default UsernameInput;
