/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Icon, PopUp, useThemeColor} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';
import {
  PasswordInput,
  SessionInput,
  UrlInput,
  UsernameInput,
} from '../../organisms';
import {useDispatch, useSelector} from 'react-redux';
import {
  useScanActivator,
  useScannerDeviceActivator,
} from '../../../hooks/use-scan-activator';
import {useScannerSelector} from '../../../features/scannerSlice';
import {login} from '../../../features/authSlice';
import {ErrorText, LoginButton} from '../../molecules';
import {sessionStorage, useSessions} from '../../../sessions';
import {useScannedValueByKey} from '../../../features/scannerSlice';
import {useCameraScannerValueByKey} from '../../../features/cameraScannerSlice';

const urlScanKey = 'login_url';

const PopupCreateSession = ({
  popupIsOpen,
  setPopupIsOpen,
  showUrlInput,
  modeDebug,
  testInstanceConfig,
  enableConnectionSessions,
  releaseInstanceConfig,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const [sessionName, setSessionName] = useState('');
  const {loading, error, baseUrl} = useSelector(state => state.auth);
  const {enable: onScanPress} = useScanActivator(urlScanKey);
  const {enable: enableScanner} = useScannerDeviceActivator(urlScanKey);
  const {isEnabled, scanKey} = useScannerSelector();
  const [username, setUsername] = useState(
    modeDebug ? testInstanceConfig?.defaultUsername : '',
  );
  const [password, setPassword] = useState(
    modeDebug ? testInstanceConfig?.defaultPassword : '',
  );
  const scannedValue = useScannedValueByKey(urlScanKey);
  const scanData = useCameraScannerValueByKey(urlScanKey);
  const {sessionList} = useSessions(enableConnectionSessions);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const defaultUrl = useMemo(() => {
    if (baseUrl != null) {
      return baseUrl;
    }
    if (modeDebug) {
      return testInstanceConfig?.defaultUrl;
    }

    return releaseInstanceConfig?.url;
  }, [
    baseUrl,
    modeDebug,
    releaseInstanceConfig?.url,
    testInstanceConfig?.defaultUrl,
  ]);

  const [url, setUrl] = useState(defaultUrl || '');

  const parseQrCode = useCallback(scanValue => {
    if (scanValue.includes('username') === true) {
      const parseScannnedData = JSON.parse(scanValue);
      setUrl(parseScannnedData.url);
      setUsername(parseScannnedData.username);
    } else {
      setUrl(scanValue);
    }
  }, []);

  useEffect(() => {
    if (scannedValue) {
      parseQrCode(scannedValue);
    } else if (scanData?.value != null) {
      parseQrCode(scanData?.value);
    }
  }, [parseQrCode, scanData, scannedValue]);

  const nameSessionAlreadyExist = useMemo(() => {
    if (!Array.isArray(sessionList) || sessionList?.length === 0) {
      return false;
    }

    return sessionList.some(_session => _session.id === sessionName);
  }, [sessionList, sessionName]);

  const onPressLogin = useCallback(() => {
    dispatch(login({url, username, password}));

    if (enableConnectionSessions && error === null) {
      sessionStorage.addSession({
        session: {
          id: sessionName,
          url: url,
          username: username,
          isActive: true,
        },
      });
    }
  }, [
    dispatch,
    enableConnectionSessions,
    password,
    sessionName,
    url,
    username,
    error,
  ]);

  return (
    <PopUp
      visible={popupIsOpen}
      title={I18n.t('Auth_Create_Session')}
      style={styles.popup}>
      <View style={styles.popupContainer}>
        <Icon
          name="times"
          size={20}
          touchable={true}
          onPress={() => setPopupIsOpen(false)}
          style={styles.closeIcon}
        />
        <View>{error && <ErrorText message={error.message} />}</View>
        <SessionInput
          value={sessionName}
          onChange={setSessionName}
          readOnly={loading}
          style={styles.input}
        />
        {showUrlInput && (
          <UrlInput
            value={url}
            onChange={setUrl}
            readOnly={loading}
            onScanPress={onScanPress}
            onSelection={enableScanner}
            scanIconColor={
              isEnabled && scanKey === urlScanKey
                ? Colors.primaryColor.background
                : Colors.secondaryColor_dark.background
            }
            style={styles.input}
          />
        )}
        <UsernameInput
          value={username}
          onChange={setUsername}
          readOnly={loading}
          showScanIcon={!showUrlInput}
          onScanPress={onScanPress}
          onSelection={enableScanner}
          scanIconColor={
            isEnabled && scanKey === urlScanKey
              ? Colors.primaryColor.background
              : Colors.secondaryColor_dark.background
          }
          style={styles.input}
        />
        <PasswordInput
          value={password}
          onChange={setPassword}
          readOnly={loading}
          style={styles.input}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <LoginButton
            onPress={onPressLogin}
            disabled={loading || nameSessionAlreadyExist}
          />
        )}
        <View>
          {!loading && nameSessionAlreadyExist && (
            <ErrorText message={I18n.t('Auth_Session_Name_Aleary_Exist')} />
          )}
        </View>
      </View>
    </PopUp>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    popupContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '120%',
    },
    closeIcon: {
      position: 'absolute',
      right: '-10%',
      top: '-10%',
    },
    popup: {
      width: '90%',
    },
    input: {width: '100%'},
  });

export default PopupCreateSession;
