import React from 'react';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Text, Screen, Image, Button} from '@axelor/aos-mobile-ui';

const ErrorScreen = ({errorMessage, onReloadPress}) => {
  return (
    <Screen
      fixedItems={<Button title="RELOAD SCREEN" onPress={onReloadPress} />}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          resizeMode="contain"
          source={require('../assets/Logo_Axelor.png')}
          imageSize={styles.imageContainer}
          defaultIconSize={80}
        />
        <Text style={styles.text}>{errorMessage}</Text>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: Dimensions.get('window').height,
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    height: '15%',
    marginVertical: '15%',
  },
  text: {
    alignSelf: 'center',
    marginHorizontal: 10,
  },
});

export default ErrorScreen;
