import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {useThemeColor} from '../../../theme/ThemeContext';

interface ScreenProps {
  style?: any;
  children: any;
  fixedItems: any;
  listScreen?: boolean;
  loading?: boolean;
}

const immersiveMode = async () => {
  await SystemNavigationBar.navigationHide();
};

const Screen = ({
  style,
  children,
  fixedItems,
  listScreen = false,
  loading = false,
}: ScreenProps) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  useEffect(() => {
    immersiveMode();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View
      style={[styles.container, listScreen ? null : styles.marginTop, style]}>
      {children}
      {React.Children.count(fixedItems) > 0 && (
        <View style={[styles.fixedContainer, styles.smallTopShadow]}>
          {fixedItems}
        </View>
      )}
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.screenBackgroundColor,
      flex: 1,
    },
    fixedContainer: {
      width: '100%',
      alignContent: 'flex-end',
      alignSelf: 'flex-end',
      backgroundColor: Colors.backgroundColor,
      borderTopLeftRadius: 13,
      borderTopRightRadius: 13,
    },
    smallTopShadow: {
      borderTopWidth: 0.5,
      borderRightWidth: 1,
      borderLeftWidth: 0.5,
      borderTopColor: 'rgba(0,0,0,0.1)',
      borderRightColor: 'rgba(0,0,0,0.2)',
      borderLeftColor: 'rgba(0,0,0,0.1)',
      elevation: 24,
    },
    marginTop: {
      paddingTop: '1.5%',
    },
  });

export default Screen;
