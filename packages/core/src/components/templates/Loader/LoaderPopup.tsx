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

import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {
  BlockInteractionScreen,
  Button,
  Card,
  Label,
  Text,
  useConfig,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {useNavigation} from '../../../hooks/use-navigation';
import useLoaderListner from './use-loader-listener';
import {useLoader} from './LoaderContext';

interface LoaderPopupProps {
  process: () => Promise<any>;
  onSuccess: () => void;
  onError: () => void;
  runProccess: boolean;
  timeout: number;
  disabled: boolean;
}

const LoaderPopup = ({
  process,
  onSuccess,
  onError,
  runProccess = false,
  timeout = 100,
  disabled = false,
}: LoaderPopupProps) => {
  const navigation = useNavigation();
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {setActivityIndicator} = useConfig();

  const timeoutRef = useRef(null);

  const {loading, notifyMe, showPopup, setNotifyMe, setShowPopup} = useLoader();

  const {listener} = useLoaderListner({
    process,
    onSuccess,
    onError,
    disabled,
  });

  useEffect(() => {
    if (notifyMe) {
      navigation.goBack();
    }
  }, [navigation, notifyMe]);

  useEffect(() => {
    if (runProccess) {
      listener();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runProccess]);

  useEffect(() => {
    if (loading) {
      if (!showPopup) {
        setActivityIndicator(true);
      }

      timeoutRef.current = setTimeout(() => {
        setActivityIndicator(false);
        setShowPopup(true);
      }, timeout);
    }

    return () => {
      setActivityIndicator(false);
      clearTimeout(timeoutRef.current);
    };
  }, [timeout, loading, showPopup, setActivityIndicator, setShowPopup]);

  if (!loading || !showPopup) {
    return null;
  }

  return (
    <BlockInteractionScreen hideHeader={true}>
      <Card style={styles.popupContainer}>
        <Label
          type="danger"
          message={I18n.t('Base_Loader_DoNotCloseTheApp')}
          iconName="exclamation-triangle-fill"
        />
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator
            size="large"
            color={Colors.primaryColor.background}
          />
          <Text writingType="title">
            {I18n.t('Base_Loader_LoadingInProgress')}
          </Text>
        </View>
        <Button
          iconName="check-lg"
          title={I18n.t('Base_Loader_NotifyMe')}
          onPress={() => setNotifyMe(true)}
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
});

export default LoaderPopup;
