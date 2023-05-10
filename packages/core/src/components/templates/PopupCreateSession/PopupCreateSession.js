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
import {useDispatch, useSelector} from 'react-redux';
import {Icon, PopUp, useThemeColor, WarningCard} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {
  PasswordInput,
  SessionNameInput,
  UrlInput,
  UsernameInput,
} from '../../organisms';
import {ErrorText, LoginButton} from '../../molecules';
import {
  useScanActivator,
  useScannerDeviceActivator,
} from '../../../hooks/use-scan-activator';
import {
  useScannerSelector,
  useScannedValueByKey,
} from '../../../features/scannerSlice';
import {useCameraScannerValueByKey} from '../../../features/cameraScannerSlice';
import {login} from '../../../features/authSlice';
import {getStorageUrl, sessionStorage, useSessions} from '../../../sessions';
import {checkNullString} from '../../../utils';

const urlScanKey = 'urlUsername_createSession_login';

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

  const {loading, error, baseUrl} = useSelector(state => state.auth);
  const {enable: onScanPress} = useScanActivator(urlScanKey);
  const {enable: enableScanner} = useScannerDeviceActivator(urlScanKey);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(urlScanKey);
  const scanData = useCameraScannerValueByKey(urlScanKey);
  const {sessionList} = useSessions(enableConnectionSessions);

  const urlStorage = useMemo(() => getStorageUrl(), []);

  const defaultUrl = useMemo(() => {
    if (urlStorage != null) {
      return urlStorage;
    }

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
    urlStorage,
  ]);

  const [sessionName, setSessionName] = useState('');
  const [url, setUrl] = useState(defaultUrl || '');
  const [username, setUsername] = useState(
    modeDebug ? testInstanceConfig?.defaultUsername : '',
  );
  const [password, setPassword] = useState(
    modeDebug ? testInstanceConfig?.defaultPassword : '',
  );

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

  const disabledLogin = useMemo(
    () =>
      checkNullString(sessionName) ||
      checkNullString(url) ||
      checkNullString(username) ||
      checkNullString(password) ||
      loading ||
      nameSessionAlreadyExist,
    [loading, nameSessionAlreadyExist, password, sessionName, url, username],
  );

  const onPressLogin = useCallback(() => {
    dispatch(login({url, username, password}));

    if (enableConnectionSessions && error == null) {
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
        <ErrorText error={error} />
        <View>
          {!loading && nameSessionAlreadyExist && (
            <WarningCard
              style={styles.warningCard}
              errorMessage={I18n.t('Auth_Session_Name_Aleary_Exist')}
            />
          )}
        </View>
        <SessionNameInput
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
          <LoginButton onPress={onPressLogin} disabled={disabledLogin} />
        )}
      </View>
    </PopUp>
  );
};

const styles = StyleSheet.create({
  popup: {
    width: '90%',
    paddingHorizontal: 15,
    paddingRight: 15,
    paddingVertical: 15,
  },
  popupContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '120%',
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: '-10%',
  },
  input: {
    width: '100%',
  },
  warningCard: {
    width: '100%',
  },
});

export default PopupCreateSession;
