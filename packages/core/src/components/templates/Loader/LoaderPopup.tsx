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

import React, {useCallback, useMemo, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {
  Alert,
  Button,
  Label,
  Text,
  useConfig,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {useNavigation} from '../../../hooks/use-navigation';
import {processProvider} from './ProcessProvider';
import {generateUniqueID} from './loader-helper';
import {EventType, ProcessItem} from './types';

interface LoaderPopupProps {
  start?: boolean;
  autoLeave?: boolean;
  timeout?: number;
  disabled?: boolean;
  name: string;
  process: () => Promise<any>;
  onSuccess: () => void;
  onError: () => void;
}

const LoaderPopup = ({
  start = false,
  autoLeave = false,
  timeout = 1000,
  name,
  disabled = false,
  process,
  onSuccess,
  onError,
}: LoaderPopupProps) => {
  const navigation = useNavigation();
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {setActivityIndicator} = useConfig();

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [processItem, setProcessItem] = useState<ProcessItem>();

  const timeoutRef = useRef(null);

  const processOptions = useMemo(
    () => ({
      name,
      disabled,
      process,
      onSuccess,
      onError,
    }),
    [name, disabled, process, onSuccess, onError],
  );

  const onFinish = useCallback(() => setShowPopup(false), []);

  const handleNotifyMe = useCallback(() => {
    setShowPopup(false);
    setActivityIndicator(false);
    processProvider.notifyMe(processItem);
    navigation.goBack();
  }, [navigation, processItem, setActivityIndicator]);

  useEffect(() => {
    if (start) {
      const unid = generateUniqueID();

      const p = processProvider.registerProcess(unid, processOptions);

      processProvider.on(unid, EventType.STARTED, () => setLoading(true));
      processProvider.on(unid, EventType.COMPLETED, () => {
        setLoading(false);
        onFinish();
      });
      processProvider.on(unid, EventType.FAILED, () => {
        setLoading(false);
        onFinish();
      });

      processProvider.runProcess(p, I18n);
      setProcessItem(p);
    }
  }, [start, I18n, processOptions, onFinish]);

  useEffect(() => {
    if (loading) {
      setActivityIndicator(true);
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
    autoLeave,
    setActivityIndicator,
    setShowPopup,
    handleNotifyMe,
  ]);

  return (
    <Alert visible={showPopup}>
      <Label
        type="danger"
        message={I18n.t('Base_Loader_DoNotCloseTheApp')}
        iconName="exclamation-triangle-fill"
      />
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={Colors.primaryColor.background}
        />
        <Text style={styles.marginLeft} writingType="title">
          {I18n.t('Base_Loader_LoadingInProgress')}
        </Text>
      </View>
      <Button
        iconName="check-lg"
        title={I18n.t('Base_Loader_NotifyMe')}
        onPress={handleNotifyMe}
      />
    </Alert>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  marginLeft: {
    marginLeft: 10,
  },
});

export default LoaderPopup;
