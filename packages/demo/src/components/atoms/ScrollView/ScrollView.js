import React from 'react';
import {ScrollView as ReactNativeScrollView, StyleSheet} from 'react-native';

const ScrollView = ({style, children}) => {
  return (
    <ReactNativeScrollView contentContainerStyle={[styles.container, style]}>
      {children}
    </ReactNativeScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    height: '100%',
  },
});

export default ScrollView;
