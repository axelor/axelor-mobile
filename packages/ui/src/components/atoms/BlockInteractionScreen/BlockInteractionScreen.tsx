import React, {ReactNode, useMemo} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useConfig} from '../../../config/ConfigContext';

interface BlockInteractionScreenProps {
  children: ReactNode;
  hideHeader?: boolean;
}

const DEFAULT_TOP_OFFSET = 0;

const BlockInteractionScreen = ({
  children,
  hideHeader = false,
}: BlockInteractionScreenProps) => {
  const {headerHeight} = useConfig();

  const styles = useMemo(
    () => getStyles(hideHeader ? DEFAULT_TOP_OFFSET : headerHeight),
    [headerHeight, hideHeader],
  );

  return (
    <View style={styles.container}>
      <View style={styles.greyCard} />
      {children}
    </View>
  );
};

const getStyles = topOffset =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: topOffset,
      left: 0,
      zIndex: 999,
    },
    greyCard: {
      marginTop: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'grey',
      opacity: 0.2,
      height: Dimensions.get('window').height * 2,
      top: -50,
      width: Dimensions.get('window').width,
      position: 'absolute',
    },
  });

export default BlockInteractionScreen;
