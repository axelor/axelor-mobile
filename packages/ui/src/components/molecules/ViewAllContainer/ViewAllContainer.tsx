import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useThemeColor } from "../../../ThemeContext";
import { Card, Icon, Text } from "../../atoms";

interface ViewAllContainerProps {
  style?: any;
  children: any;
  isHeaderExist?: boolean;
  onNewIcon?: () => void;
  onPress: () => void;
  translator?: (any) => void | undefined;
}

const ViewAllContainer = ({
  style,
  children,
  isHeaderExist = false,
  onNewIcon = () => {},
  onPress = () => {},
  translator = null,
}: ViewAllContainerProps) => {
  const Colors = useThemeColor();

  return (
    <Card style={[styles.container, style]}>
      {isHeaderExist && (
        <View style={styles.headLineMove}>
          <Text>
            {translator == null ? "Content" : translator("Base_Content")}
          </Text>
          <Icon
            name="plus"
            color={Colors.primaryColor}
            size={24}
            touchable={true}
            onPress={onNewIcon}
          />
        </View>
      )}
      <View style={styles.cardContainer}>{children}</View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <View style={styles.iconContainer}>
          <Text style={styles.txtDetails}>
            {translator == null ? "View all" : translator("Base_ViewAll")}
          </Text>
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor_light}
            size={20}
          />
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: "2%",
    paddingHorizontal: "3%",
    paddingRight: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 4,
  },
  headLineMove: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 1,
    marginVertical: 2,
    width: "100%",
  },
  cardContainer: {
    marginBottom: 2,
    width: "100%",
  },
  iconContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 2,
    elevation: 3,
  },
  txtDetails: {
    fontSize: 14,
    marginHorizontal: 15,
  },
});

export default ViewAllContainer;
