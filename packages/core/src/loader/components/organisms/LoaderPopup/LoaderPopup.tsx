/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {
  Alert,
  Button,
  Label,
  Text,
  useConfig,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useNavigation} from '../../../../hooks/use-navigation';
import {useTranslator} from '../../../../i18n';
import {processProvider} from '../../../ProcessProvider';
import {ProcessItem, ProcessStatus} from '../../../types';

interface LoaderPopupProps {
  start?: boolean;
  autoLeave?: boolean;
  timeout?: number;
  name: string;
  disabled?: boolean;
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
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const {setActivityIndicator} = useConfig();

  const [loading, setLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
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

  const onEndProcess = useCallback(() => {
    setLoading(false);
    setShowPopup(false);
  }, []);

  const handleNotifyMe = useCallback(() => {
    setShowPopup(false);
    setActivityIndicator(false);
    processProvider.notifyMe(processItem.key);
    navigation.goBack();
  }, [navigation, processItem, setActivityIndicator]);

  useEffect(() => {
    if (start) {
      const processKey = new Date().getTime().toString();

      const _process = processProvider.registerProcess(
        processKey,
        processOptions,
      );
      setProcessItem(_process);

      processProvider.on(processKey, ProcessStatus.InProgress, () =>
        setLoading(true),
      );
      processProvider.on(processKey, ProcessStatus.Success, () =>
        onEndProcess(),
      );
      processProvider.on(processKey, ProcessStatus.Failed, () =>
        onEndProcess(),
      );

      processProvider.runProcess(processKey, I18n);
    }
  }, [I18n, onEndProcess, processOptions, start]);

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
    autoLeave,
    handleNotifyMe,
    loading,
    setActivityIndicator,
    setShowPopup,
    timeout,
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
