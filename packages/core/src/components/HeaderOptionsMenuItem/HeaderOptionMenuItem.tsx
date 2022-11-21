import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Badge, Icon, useThemeColor} from '@aos-mobile/ui';

interface HeaderOptionMenuItemProps {
  icon: string;
  indicator?: number;
  FontAwesome5?: boolean;
  disabled?: boolean;
  size?: number;
  badgeSize?: number;
  badgeBorderColor?: string;
  hideIf: boolean;
  onPress: () => void;
}

const HeaderOptionMenuItem = ({
  icon,
  indicator = 0,
  size = 22,
  FontAwesome5 = true,
  disabled = false,
  badgeSize = 16,
  badgeBorderColor,
  hideIf = false,
  onPress,
}: HeaderOptionMenuItemProps) => {
  const Colors = useThemeColor();
  const styles = useMemo(
    () => getStyles(badgeBorderColor || Colors.primaryColor, badgeSize),
    [badgeBorderColor, badgeSize, Colors.primaryColor],
  );

  if (hideIf) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}>
      <Icon name={icon} FontAwesome5={FontAwesome5} size={size} />
      {indicator > 0 && (
        <Badge
          style={styles.badge}
          txtStyle={styles.badgeText}
          color={Colors.backgroundColor}
          title={indicator}
        />
      )}
    </TouchableOpacity>
  );
};

const getStyles = (badgeBorderColor, size) =>
  StyleSheet.create({
    badge: {
      width: size,
      height: size,
      borderColor: badgeBorderColor,
      borderWidth: 2,
      borderRadius: Math.ceil(size / 2),
      position: 'absolute',
      top: -4,
      right: -8,
      zIndex: 10,
    },
    badgeText: {
      fontSize: Math.ceil(size / 2),
    },
    container: {
      marginRight: 5,
      marginLeft: 15,
      flexDirection: 'row',
    },
  });

export default HeaderOptionMenuItem;
