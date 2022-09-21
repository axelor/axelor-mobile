import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from '../../atoms';
import {PopUp} from '../../molecules';

interface PopUpOneButtonProps {
  visible: boolean;
  title: string;
  data: string;
  btnTitle: string;
  onPress: () => void;
}

const PopUpOneButton = ({
  visible,
  title,
  data,
  btnTitle,
  onPress,
}: PopUpOneButtonProps) => {
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
