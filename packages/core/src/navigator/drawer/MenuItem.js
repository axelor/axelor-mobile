import React, {useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text, useThemeColor} from '@aos-mobile/ui';

const MenuItem = ({icon, title, isActive, onPress, disabled}) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors, disabled), [Colors, disabled]);

  const backgroundColor = useMemo(
    () => getBackgroundColor(isActive).container,
    [isActive],
  );

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.menuItemContainer]}>
        <View style={[styles.menuItemActive, backgroundColor]} />
        {icon && (
          <Icon
            style={styles.menuItemIcon}
            name={icon}
            size={24}
            color={
              disabled
                ? Colors.secondaryColor.background_light
                : Colors.secondaryColor_dark.background
            }
          />
        )}
        <View style={styles.menuItemTextContainer}>
          <Text style={styles.menuItemTitle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getBackgroundColor = isMenuActive => {
  return StyleSheet.create({
    container: {
      backgroundColor: isMenuActive ? '#76DCAE' : '#fff',
    },
  });
};

const getStyles = (Colors, disabled) =>
  StyleSheet.create({
    menuItemContainer: {
      flexDirection: 'row',
      paddingVertical: 8,
    },
    menuItemActive: {
      width: 7,
      height: 32,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    menuItemIcon: {
      marginLeft: 12,
      marginRight: 18,
    },
    menuItemTextContainer: {
      flex: 1,
      alignSelf: 'center',
      paddingRight: 16,
    },
    menuItemTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: disabled ? Colors.secondaryColor.background_light : Colors.text,
    },
  });

export default MenuItem;
