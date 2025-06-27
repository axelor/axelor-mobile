/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {clearMaintenanceState} from '../api/installMaintenanceInterceptor';
import {useTranslator} from '../i18n';

const MaintenanceScreen = ({onCheckStatus}: {onCheckStatus: () => void}) => {
  const I18n = useTranslator();

  return (
    <Screen
      fixedItems={
        <Button
          title={I18n.t('Base_ReloadApp')}
          onPress={() => {
            clearMaintenanceState();
            onCheckStatus();
          }}
          iconName="arrow-repeat"
        />
      }>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          resizeMode="contain"
          source={require('../assets/Logo_Axelor.png')}
          imageSize={styles.image}
          defaultIconSize={80}
        />
        <Text style={styles.text}>{I18n.t('Base_ServerMainteance')}</Text>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: Dimensions.get('window').height,
  },
  image: {
    width: '100%',
    height: '15%',
    marginVertical: '15%',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginHorizontal: 10,
  },
});

export default MaintenanceScreen;
