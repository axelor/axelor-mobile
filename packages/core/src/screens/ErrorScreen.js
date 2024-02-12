/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Text, Screen, Image, Button} from '@axelor/aos-mobile-ui';

const ErrorScreen = ({errorMessage, onReloadPress}) => {
  return (
    <Screen
      fixedItems={
        <Button
          title="RELOAD SCREEN"
          onPress={onReloadPress}
          iconName="arrow-repeat"
        />
      }>
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
