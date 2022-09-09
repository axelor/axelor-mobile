import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { getCommonStyles } from "../../../commons-styles";
import { useThemeColor } from "../../../ThemeContext";

interface ButtonProps {
  style?: any;
  color?: string;
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

const Button = ({
  style,
  color,
  title,
  onPress = () => {},
  disabled = false,
}: ButtonProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => {
    return getStyles(color == null ? Colors.primaryColor : color, Colors);
  }, [Colors, color]);

  const commonStyles = useMemo(() => {
    return getCommonStyles(Colors);
  }, [Colors]);

  return (
    <TouchableOpacity
      style={[styles.colorButton, commonStyles.button, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const getStyles = (backgroundColor, Colors) =>
  StyleSheet.create({
    colorButton: {
      backgroundColor: backgroundColor,
    },
    text: {
      fontSize: 15,
      fontWeight: "bold",
      color: Colors.text,
      textAlign: "center",
    },
  });

export default Button;
