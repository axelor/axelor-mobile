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

import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  useThemeColor,
  Text,
  Screen,
  Checkbox,
  Icon,
} from '@axelor/aos-mobile-ui';
import {
  ErrorText,
  LoginButton,
  LogoImage,
  PasswordInput,
  UrlInput,
  UsernameInput,
  SessionInput,
  PopupSession,
} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../features/authSlice';
import {
  useScannedValueByKey,
  useScannerSelector,
} from '../features/scannerSlice';
import {useCameraScannerValueByKey} from '../features/cameraScannerSlice';
import {
  useScanActivator,
  useScannerDeviceActivator,
} from '../hooks/use-scan-activator';
import useTranslator from '../i18n/hooks/use-translator';
import {sessionStorage} from '../utils/session';

const urlScanKey = 'login_url';

const LoginScreen = ({route}) => {
  const {loading, error, baseUrl} = useSelector(state => state.auth);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(urlScanKey);
  const scanData = useCameraScannerValueByKey(urlScanKey);
  const {enable: onScanPress} = useScanActivator(urlScanKey);
  const {enable: enableScanner} = useScannerDeviceActivator(urlScanKey);
  const I18n = useTranslator();

  const appVersion = route?.params?.version;
  const testInstanceConfig = route?.params?.testInstanceConfig;
  const releaseInstanceConfig = route?.params?.releaseInstanceConfig;
  const enableConnectionSessions = route?.params?.enableConnectionSessions;

  const [sessionList, setSessionList] = useState(
    enableConnectionSessions ? sessionStorage.getSession() : [],
  );

  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const modeDebug = useMemo(() => __DEV__, []);

  const showUrlInput = useMemo(() => {
    if (modeDebug) {
      return true;
    } else {
      return releaseInstanceConfig?.showUrlInput || true;
    }
  }, [modeDebug, releaseInstanceConfig?.showUrlInput]);

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
  const [sessionActive, setSessionActive] = useState(
    sessionList?.length > 0
      ? sessionList.find(ses => ses.isActive === true)
      : null,
  );

  const [url, setUrl] = useState(
    sessionList?.length > 0 ? sessionActive?.url : defaultUrl || '',
  );
  const [username, setUsername] = useState(
    sessionList?.length > 0
      ? sessionActive?.username
      : modeDebug
      ? testInstanceConfig?.defaultUsername
      : '',
  );
  const [password, setPassword] = useState(
    modeDebug ? testInstanceConfig?.defaultPassword : '',
  );
  const [savesSession, setSaveSession] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const nameSessionAlreadyExist = useMemo(() => {
    let isExist = false;
    sessionList?.forEach(ses => {
      if (ses.id === sessionName) {
        isExist = true;
      }
    });
    return isExist;
  }, [sessionList, sessionName]);

  useEffect(() => {
    if (scannedValue) {
      if (scannedValue.includes('username') === true) {
        const parseScannnedData = JSON.parse(scannedValue);
        setUrl(parseScannnedData.url);
        setUsername(parseScannnedData.username);
      } else {
        setUrl(scannedValue);
      }
    } else if (scanData?.value != null) {
      if (scanData.value.includes('username') === true) {
        const parseScannnedData = JSON.parse(scanData.value);
        setUrl(parseScannnedData.url);
        setUsername(parseScannnedData.username);
      } else {
        setUrl(scanData.value);
      }
    }
  }, [scanData, scannedValue]);

  const onPressLogin = () => {
    //dispatch(login({url, username, password}));
    if (savesSession && enableConnectionSessions) {
      if (sessionList?.length > 0) {
        sessionList.push({
          id: sessionName,
          url: url,
          username: username,
          isActive: true,
        });
        sessionStorage.addSession({
          data: sessionList,
        });
        setSessionList(sessionList);
        activeSession(sessionName);
        setSessionActive(sessionList.find(ses => ses.isActive === true));
      } else {
        sessionStorage.addSession({
          data: [
            {
              id: sessionName,
              url: url,
              username: username,
              isActive: true,
            },
          ],
        });
        setSessionList([
          {
            id: sessionName,
            url: url,
            username: username,
            isActive: true,
          },
        ]);
        setSessionActive({
          id: sessionName,
          url: url,
          username: username,
          isActive: true,
        });
      }
    }
  };

  const activeSession = sessionNameparam => {
    const tempSessionList = sessionList;
    sessionList?.forEach((sesion, index) => {
      if (sessionNameparam === sesion.id) {
        tempSessionList[index] = {
          id: sesion.id,
          url: sesion.url,
          username: sesion.username,
          isActive: true,
        };
        setSessionActive(sesion);
        setUrl(sesion.url);
        setUsername(sesion.username);
      } else {
        tempSessionList[index] = {
          id: sesion.id,
          url: sesion.url,
          username: sesion.username,
          isActive: false,
        };
      }
    });
    sessionStorage.addSession({
      data: tempSessionList,
    });
  };

  const delSession = sessionNameparam => {
    const sessionToDel = sessionList.filter(
      sesion => sesion.id !== sessionNameparam,
    );
    setSessionList(sessionToDel);
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <LogoImage url={url} />
            </View>
            {sessionList?.length > 0 && <Text>{sessionActive?.id}</Text>}
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
            />
            <PasswordInput
              value={password}
              onChange={setPassword}
              readOnly={loading}
            />
            {enableConnectionSessions && (
              <Checkbox
                title={I18n.t('Auth_Save_Session')}
                onChange={setSaveSession}
              />
            )}
            {savesSession && (
              <SessionInput
                value={sessionName}
                onChange={setSessionName}
                readOnly={loading}
              />
            )}
            <View>
              {nameSessionAlreadyExist && (
                <ErrorText message={I18n.t('Auth_Session_Name_Aleary_Exist')} />
              )}
            </View>
            {enableConnectionSessions && (
              <TouchableOpacity onPress={() => setPopupIsOpen(true)}>
                <View style={styles.arrowContainer}>
                  <Text>{I18n.t('Auth_Change_Session')}</Text>
                  <Icon
                    name="angle-right"
                    size={24}
                    color={Colors.primaryColor.background}
                    style={styles.arrowIcon}
                  />
                </View>
              </TouchableOpacity>
            )}
            <PopupSession
              activeSession={activeSession}
              delSession={delSession}
              popupIsOpen={popupIsOpen}
              sessionList={sessionList}
              setPopupIsOpen={setPopupIsOpen}
            />
            <View>
              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <LoginButton
                  onPress={onPressLogin}
                  disabled={loading || nameSessionAlreadyExist}
                />
              )}
            </View>
            <View>{error && <ErrorText message={error.message} />}</View>
            <View style={styles.copyright}>
              <Text>{`© 2005 - ${new Date().getFullYear()} Axelor. All rights reserved.`}</Text>
              <Text>{`Version ${appVersion}`}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.95,
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    height: '15%',
    marginTop: Dimensions.get('window').height < 500 ? '15%' : '40%',
    marginBottom: '10%',
  },
  copyright: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 32,
    width: '80%',
  },
  arrowIcon: {
    marginRight: -6,
    marginLeft: 5,
  },
});

export default LoginScreen;
