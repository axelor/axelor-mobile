import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from '@/components/atoms';
import {PopUp} from '@/components/molecules';

const PopUpOneButton = ({visible, title, data, btnTitle, onPress}) => {
  return (
    <PopUp visible={visible} title={title} data={data}>
      <Button style={styles.button} title={btnTitle} onPress={onPress} />
    </PopUp>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginTop: 15,
    elevation: 5,
    width: '40%',
  },
});

export default PopUpOneButton;
