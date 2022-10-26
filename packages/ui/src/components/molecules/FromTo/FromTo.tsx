import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon} from '../../atoms';

interface FromToProps {
  fromComponent: React.ReactNode;
  toComponent: React.ReactNode;
  style?: any;
}

function FromTo({fromComponent, toComponent, style}: FromToProps) {
  const Colors = useThemeColor();
  return (
    <View style={[styles.container, style]}>
      {fromComponent}
      <View style={styles.panel}>
        <Icon name="chevron-right" size={35} color={Colors.primaryColor} />
      </View>
      {toComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  panel: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FromTo;
