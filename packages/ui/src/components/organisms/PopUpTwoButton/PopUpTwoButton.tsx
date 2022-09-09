import React from "react";
import { StyleSheet } from "react-native";
import { useThemeColor } from "../../../ThemeContext";
import { Button } from "../../atoms";
import { PopUp } from "../../molecules";

interface PopUpTwoButtonProps {
  visible: boolean;
  title: string;
  data: string;
  PrimaryBtnTitle: string;
  onPressPrimary: () => void;
  SecondaryBtnTitle: string;
  onPressSecondary: () => void;
}

const PopUpTwoButton = ({
  visible,
  title,
  data,
  PrimaryBtnTitle,
  onPressPrimary,
  SecondaryBtnTitle,
  onPressSecondary,
}: PopUpTwoButtonProps) => {
  const Colors = useThemeColor();

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
    width: "40%",
  },
});

export default PopUpTwoButton;
