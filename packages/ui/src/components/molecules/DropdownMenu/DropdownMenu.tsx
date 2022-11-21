import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useClickOutside} from '../../../hooks/use-click-outside';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Card, Icon} from '../../atoms';

interface DropdownMenuProps {
  children: any;
}

const DropdownMenu = ({children}: DropdownMenuProps) => {
  const [visible, setVisible] = useState(false);
  const Colors = useThemeColor();

  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside(wrapperRef);

  useEffect(() => {
    if (clickOutside === 'outside' && visible) {
      setVisible(false);
    }
  }, [clickOutside, visible]);

  return (
    <View ref={wrapperRef}>
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
      {visible && <Card style={styles.menuContainer}>{children}</Card>}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: 255,
    top: 30,
    right: -12,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    elevation: 6,
  },
  action: {
    marginRight: 5,
    marginLeft: 15,
  },
});

export default DropdownMenu;
