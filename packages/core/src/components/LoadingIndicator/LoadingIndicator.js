import React from 'react';
import {ActivityIndicator, View, StyleSheet, Dimensions} from 'react-native';
import {Card, useConfig} from '@aos-mobile/ui';

/**
 * @description To activate this component, please use setActivityIndicator(true) from useConfig of aos-mobile/ui
 * @description To desactivate this component, please use setActivityIndicator(false) from useConfig of aos-mobile/ui
 */
function LoadingIndicator() {
  const {showActivityIndicator} = useConfig();
  if (showActivityIndicator === false) {
    return null;
  } else {
    return (
      <View style={styles.view}>
        <View style={styles.greyCard} />
        <Card style={styles.loadingIndicatorCard}>
          <ActivityIndicator size="large" />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
  },
  loadingIndicatorCard: {
    position: 'relative',
    top: Dimensions.get('window').height * 0.4,
    left: Dimensions.get('window').width * 0.4,
    borderTopWidth: 0.5,
    borderRightWidth: 1,
    borderLeftWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderRightColor: 'rgba(0,0,0,0.2)',
    borderLeftColor: 'rgba(0,0,0,0.1)',
    elevation: 24,
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

export default LoadingIndicator;
