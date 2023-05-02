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
import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  useThemeColor,
  Text,
  Screen,
  Button,
  InfoBubble,
} from '@axelor/aos-mobile-ui';
import {
  LogoImage,
  PopupSessionList,
  PopupCreateSession,
  PopupSession,
} from '../components';
import {useSelector} from 'react-redux';
import {useScannedValueByKey} from '../features/scannerSlice';
import {useCameraScannerValueByKey} from '../features/cameraScannerSlice';

import useTranslator from '../i18n/hooks/use-translator';
import {sessionStorage, useSessions} from '../sessions';

const urlScanKey = 'login_url';

const LoginScreen = ({route}) => {
  const appVersion = route?.params?.version;
  const testInstanceConfig = route?.params?.testInstanceConfig;
  const releaseInstanceConfig = route?.params?.releaseInstanceConfig;
  const enableConnectionSessions = route?.params?.enableConnectionSessions;
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {error, baseUrl} = useSelector(state => state.auth);
  const scannedValue = useScannedValueByKey(urlScanKey);
  const scanData = useCameraScannerValueByKey(urlScanKey);

  const {sessionList, sessionActive} = useSessions(enableConnectionSessions);

  const modeDebug = useMemo(() => __DEV__, []);

  const showUrlInput = useMemo(() => {
    if (modeDebug) {
      return true;
    } else {
      return releaseInstanceConfig?.showUrlInput || true;
    }
  }, [modeDebug, releaseInstanceConfig?.showUrlInput]);

  const defaultUrl = useMemo(() => {
    if (sessionList?.length > 0) {
      return sessionActive?.url;
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
    sessionActive?.url,
    sessionList,
    testInstanceConfig?.defaultUrl,
  ]);

  const [url, setUrl] = useState(defaultUrl || '');
  const [username, setUsername] = useState(
    sessionList?.length > 0
      ? sessionActive?.username
      : modeDebug
      ? testInstanceConfig?.defaultUsername
      : '',
  );

  const [popupCreateSessionIsOpen, setPopupCreateSessionIsOpen] =
    useState(false);
  const [popupSessionIsOpen, setPopupSessionIsOpen] = useState(false);
  const [popupSessionListIsOpen, setPopupSessionListIsOpen] = useState(false);

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

  const changeActiveSession = useCallback(sessionId => {
    sessionStorage.changeActiveSession({sessionId});
    setPopupSessionListIsOpen(false);
  }, []);

  const removeSession = useCallback(sessionId => {
    sessionStorage.removeSession({sessionId});
  }, []);

  const showSessionName = useMemo(() => {
    if (sessionActive == null) {
      return false;
    }

    return username === sessionActive.username && url === sessionActive.url;
  }, [sessionActive, url, username]);

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <LogoImage url={url} />
            </View>
            {showSessionName && (
              <Text>{`${I18n.t('Auth_Session')} : ${sessionActive?.id}`}</Text>
            )}
            {sessionActive && (
              <Button
                title={sessionActive.id}
                onPress={() => {
                  setPopupSessionIsOpen(true);
                }}
                style={styles.button}
              />
            )}
            {sessionList?.length > 1 && (
              <View style={styles.row}>
                <View style={styles.bubble}>
                  <Text>{sessionList.length}</Text>
                </View>

                <Button
                  title={I18n.t('Auth_Change_Session')}
                  onPress={() => {
                    setPopupSessionListIsOpen(true);
                  }}
                  style={styles.button}
                />
              </View>
            )}
            <View style={styles.row}>
              <InfoBubble
                indication={I18n.t('Auth_InfoSession')}
                iconName="info"
                badgeColor={Colors.cautionColor}
                style={styles.infoBubble}
                textIndicationStyle={styles.textIndicationStyle}
              />
              <Button
                title={I18n.t('Auth_Create_Session')}
                style={styles.button}
                onPress={() => setPopupCreateSessionIsOpen(true)}
              />
            </View>
            <PopupCreateSession
              modeDebug={modeDebug}
              popupIsOpen={popupCreateSessionIsOpen}
              setPopupIsOpen={setPopupCreateSessionIsOpen}
              showUrlInput={showUrlInput}
              testInstanceConfig={testInstanceConfig}
              enableConnectionSessions={enableConnectionSessions}
              releaseInstanceConfig={releaseInstanceConfig}
            />
            <PopupSession
              defaultUrl={defaultUrl}
              enableConnectionSessions={enableConnectionSessions}
              sessionActive={sessionActive}
              error={error}
              popupIsOpen={popupSessionIsOpen}
              setPopupIsOpen={setPopupSessionIsOpen}
              showUrlInput={showUrlInput}
            />
            <PopupSessionList
              changeActiveSession={changeActiveSession}
              removeSession={removeSession}
              sessionList={sessionList}
              popupIsOpen={popupSessionListIsOpen}
              setPopupIsOpen={setPopupSessionListIsOpen}
            />
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
  text: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  checkbox: {
    width: '88%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: '50%',
  },
  infoBubble: {
    position: 'absolute',
    left: '-10%',
    top: '15%',
  },
  textIndicationStyle: {
    width: Dimensions.get('window').height * 0.3,
  },
  bubble: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: Dimensions.get('window').width * 0.07,
    width: Dimensions.get('window').width * 0.07,
    height: Dimensions.get('window').width * 0.07,
    position: 'absolute',
    left: '-10%',
    top: '25%',
  },
});

export default LoginScreen;
