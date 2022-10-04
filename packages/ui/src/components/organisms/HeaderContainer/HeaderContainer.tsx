import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useConfig} from '../../../config/ConfigContext';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon} from '../../atoms';

interface HeaderContainerProps {
  style?: any;
  children?: any;
  fixedItems?: any;
  chipComponent?: any;
  expandableFilter?: boolean;
}

const HeaderContainer = ({
  style,
  children,
  fixedItems = null,
  chipComponent = null,
  expandableFilter = true,
}: HeaderContainerProps) => {
  const {showFilter} = useConfig();
  const [isVisible, setVisible] = useState(true);
  const Colors = useThemeColor();

  useEffect(() => {
    setVisible(showFilter);
  }, [showFilter]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={[styles.container, style]}>
      {fixedItems}
      {expandableFilter && isVisible && children}
      {chipComponent}
      {expandableFilter && (
        <TouchableOpacity onPress={() => setVisible(!isVisible)}>
          <View style={styles.arrowContainer}>
            <Icon
              name={isVisible ? 'angle-up' : 'angle-down'}
              size={22}
              color={Colors.primaryColor}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: Colors.backgroundColor,
      elevation: 3,
      zIndex: 2,
      paddingBottom: 5,
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
    },
    arrowContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default HeaderContainer;
