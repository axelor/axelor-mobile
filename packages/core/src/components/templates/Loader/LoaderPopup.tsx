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

import React, {useCallback, useEffect, useState} from 'react';
import {
  BlockInteractionScreen,
  Button,
  Card,
  Label,
  Text,
  useConfig,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {useTranslator} from '../../../i18n';
import {useNavigation} from '@react-navigation/native';

interface LoaderPopupProps {
  loading: boolean;
  timeout: number;
  onSuccess: () => void;
  onError: () => void;
}

const LoaderPopup = ({loading, timeout = 100}: LoaderPopupProps) => {
  const navigation = useNavigation();
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {setActivityIndicator} = useConfig();

  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    if (loading && !showPopup) {
      setActivityIndicator(true);
    }

    const timerId = setTimeout(() => {
      setActivityIndicator(false);
      setShowPopup(true);
    }, timeout);

    return () => clearTimeout(timerId);
  }, [timeout, loading, showPopup, setActivityIndicator]);

  if (!loading || !showPopup) {
    return null;
  }

  return (
    <BlockInteractionScreen hideHeader={true}>
      <Card style={styles.popupContainer}>
        <Label
          type="danger"
          message={I18n.t('Base_Loading_DoNotCloseTheApp')}
          iconName="exclamation-triangle-fill"
        />
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator
            size="large"
            color={Colors.primaryColor.background}
          />
          <Text style={styles.loadingLabel}>
            {I18n.t('Base_Loader_LoadingInProgress')}
          </Text>
        </View>
        <Button
          iconName="check-lg"
          title={I18n.t('Base_Loader_NotifyMeWantItIsReady')}
          onPress={handleGoBack}
        />
      </Card>
    </BlockInteractionScreen>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    width: 350,
    top: Dimensions.get('window').height * 0.2,
    left: Dimensions.get('window').width * 0.06,
    elevation: 24,
    shadowOpacity: 12,
    paddingVertical: 10,
  },
  activityIndicatorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  loadingLabel: {
    fontWeight: 'bold',
  },
});

export default LoaderPopup;
