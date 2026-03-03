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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {Text, Screen, KeyboardAvoidingScrollView} from '@axelor/aos-mobile-ui';
import {login} from '../features/authSlice';
import {
  sessionStorage,
  getStorageUrl,
  ErrorText,
  LogoImage,
  SessionInputs,
} from '../sessions';

const LoginScreen = ({route}) => {
  const testInstanceConfig = route?.params?.testInstanceConfig;
  const releaseInstanceConfig = route?.params?.releaseInstanceConfig;
  const logoFile = route?.params?.logoFile;
  const dispatch = useDispatch();

  const {appVersion, loading, error, baseUrl} = useSelector(
    state => state.auth,
  );

  const urlStorage = useMemo(() => getStorageUrl(), []);
  const modeDebug = useMemo(() => __DEV__, []);
  const sessionList = sessionStorage.getSessionList();

  const showUrlInput = useMemo(() => {
    if (modeDebug) {
      return true;
    } else {
      return releaseInstanceConfig?.showUrlInput || true;
    }
  }, [modeDebug, releaseInstanceConfig?.showUrlInput]);

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
    urlStorage,
    baseUrl,
    modeDebug,
    releaseInstanceConfig?.url,
    testInstanceConfig?.defaultUrl,
  ]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const onPressLogin = useCallback(
    ({url, username, password}) => {
      dispatch(
        login({
          url,
          username,
          password,
        }),
      ).then(res => {
        if (res.error == null && isMounted) {
          sessionStorage.saveHiddenSession({
            name: DeviceInfo.getApplicationName(),
            url: url,
            username: username,
            isDefault: true,
          });
        }
      });
    },
    [dispatch, isMounted],
  );

  return (
    <Screen>
      <KeyboardAvoidingScrollView
        keyboardOffset={{ios: 0, android: 0}}
        style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <LogoImage logoFile={logoFile} />
          </View>
          <ErrorText error={error} style={styles.card} />
          <SessionInputs
            style={styles.card}
            sessionList={[]}
            session={
              sessionList.length > 0
                ? {
                    ...sessionList[0],
                    password: modeDebug
                      ? testInstanceConfig?.defaultPassword
                      : '',
                  }
                : {
                    url: defaultUrl,
                    username: modeDebug
                      ? testInstanceConfig?.defaultUsername
                      : '',
                    password: modeDebug
                      ? testInstanceConfig?.defaultPassword
                      : '',
                  }
            }
            showUrlInput={showUrlInput}
            loading={loading}
            mode="unique"
            showPopup={() => {}}
            onValidation={onPressLogin}
          />
          <View style={styles.copyright}>
            <Text>{`© 2005 - ${new Date().getFullYear()} Axelor. All rights reserved.`}</Text>
            <Text>{`Version ${appVersion}`}</Text>
          </View>
        </View>
      </KeyboardAvoidingScrollView>
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
    marginTop: Dimensions.get('window').height < 500 ? '10%' : '40%',
    marginBottom: '10%',
  },
  copyright: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
  },
  card: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '90%',
  },
  scroll: {
    height: null,
  },
});

export default LoginScreen;
