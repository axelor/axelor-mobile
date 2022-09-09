import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeColor } from "../../../ThemeContext";
import { Card, Icon } from "../../atoms";

interface DropdownMenuProps {
  children: any;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [visible, setVisible] = useState(false);
  const Colors = useThemeColor();

  return (
    <View>
      {visible && <Card style={styles.menuContainer}>{children}</Card>}
      <View style={styles.container}>
        <Icon
          name="ellipsis-v"
          color={Colors.primaryColor}
          size={22}
          style={styles.action}
          touchable={true}
          onPress={() => {
            setVisible(!visible);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 13,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  menuContainer: {
    width: 225,
    top: 45,
    right: 0,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: "absolute",
    zIndex: 6,
  },
  action: {
    margin: 5,
  },
});

export default DropdownMenu;
