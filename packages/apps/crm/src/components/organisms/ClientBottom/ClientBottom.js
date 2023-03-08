import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CircleButton} from '@axelor/aos-mobile-ui';

const ClientBottom = ({navigation, idClient}) => {
  return (
    <View style={styles.bottomContainer}>
      <CircleButton
        iconName="pen"
        onPress={() =>
          navigation.navigate('ClientFormScreen', {
            idClient: idClient,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    width: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
    marginBottom: 25,
  },
});

export default ClientBottom;
