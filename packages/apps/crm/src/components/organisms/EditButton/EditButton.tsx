import React from 'react';
import {StyleSheet} from 'react-native';
import {CircleButton} from '@axelor/aos-mobile-ui';

const EditButton = ({onPress}) => {
  return (
    <CircleButton
      style={styles.floatingButton}
      iconName="pen"
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
});

export default EditButton;
