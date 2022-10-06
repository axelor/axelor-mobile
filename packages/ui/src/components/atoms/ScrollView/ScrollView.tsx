import React from 'react';
import {
  Dimensions,
  ScrollView as ReactNativeScrollView,
  StyleSheet,
} from 'react-native';

interface ScrollViewProps {
  style?: any;
  children?: any;
}

const ScrollView = ({style, children}: ScrollViewProps) => {
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
    height: Dimensions.get('window').height,
  },
});

export default ScrollView;
