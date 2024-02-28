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

import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import useProcessRegister from './use-process-register';
import {processProvider} from './ProcessProvider';

interface LoaderPopupProps {
  process: () => Promise<any>;
  onSuccess: () => void;
  onError: () => void;
  start?: boolean;
  disabled?: boolean;
  autoLeave?: boolean;
  timeout?: number;
}

const LoaderPopup = ({
  process,
  onSuccess,
  onError,
  start = false,
  disabled = false,
  autoLeave = false,
  timeout = 100,
}: LoaderPopupProps) => {
  const navigation = useNavigation();
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {setActivityIndicator} = useConfig();

  const [showPopup, setShowPopup] = useState<boolean>(false);

  const timeoutRef = useRef(null);

  const {processItem, loading} = useProcessRegister(
    {
      name: 'process #1',
      disabled,
      process,
      onSuccess,
      onError,
    },
    () => setShowPopup(false),
  );

  const handleNotifyMe = useCallback(() => {
    processProvider.notifyMe(processItem);
    navigation.goBack();
  }, [processItem, navigation]);

  useEffect(() => {
    if (start) {
      processProvider.runProcess(processItem, I18n);
    }
  }, [start, processItem, I18n]);

  useEffect(() => {
    if (loading) {
      if (!showPopup) {
        setActivityIndicator(true);
      }

      timeoutRef.current = setTimeout(() => {
        setActivityIndicator(false);

        autoLeave ? handleNotifyMe() : setShowPopup(true);
      }, timeout);
    }

    return () => {
      setActivityIndicator(false);
      clearTimeout(timeoutRef.current);
    };
  }, [
    timeout,
    loading,
    showPopup,
    autoLeave,
    setActivityIndicator,
    setShowPopup,
    handleNotifyMe,
  ]);

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
          onPress={handleNotifyMe}
        />
      </Card>
    </BlockInteractionScreen>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width * 0.9,
    top: Dimensions.get('window').height * 0.2,
    left: Dimensions.get('window').width * 0.05,
    paddingRight: null,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  activityIndicatorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default LoaderPopup;
