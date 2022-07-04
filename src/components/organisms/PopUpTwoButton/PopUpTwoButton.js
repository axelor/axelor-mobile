import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from '@/components/atoms';
import {PopUp} from '@/components/molecules';
import {ColorHook} from '@/themeStore';

const PopUpTwoButton = ({
  visible,
  title,
  data,
  PrimaryBtnTitle,
  onPressPrimary,
  SecondaryBtnTitle,
  onPressSecondary,
}) => {
  const Colors = ColorHook();
  return (
    <PopUp visible={visible} title={title} data={data}>
      <Button
        style={styles.button}
        color={Colors.secondaryColor}
        title={SecondaryBtnTitle}
        onPress={onPressSecondary}
      />
      <Button
        style={styles.button}
        color={Colors.primaryColor}
        title={PrimaryBtnTitle}
        onPress={onPressPrimary}
      />
    </PopUp>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 4,
    marginTop: 15,
    elevation: 5,
  },
});

export default PopUpTwoButton;
