import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@axelor/aos-mobile-core';
import {CircleButton} from '@axelor/aos-mobile-ui';

const TicketBottom = ({idTicket}) => {
  const navigation = useNavigation();
  return (
    <CircleButton
      style={styles.floatingButton}
      iconName="pen"
      onPress={() =>
        navigation.navigate('TicketFormScreen', {
          idTicket: idTicket,
        })
      }
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

export default TicketBottom;
