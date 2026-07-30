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
import {Dimensions, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Text, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '../redux/hooks';
import {login} from '../features/authSlice';
import {
  sessionStorage,
  getStorageUrl,
  ErrorText,
  LogoImage,
  MfaVerificationPopup,
  SessionInputs,
} from '../sessions';

const LoginScreen = ({route}: any) => {
  const {testInstanceConfig, releaseInstanceConfig, logoFile} =
    route?.params ?? {};
  const Colors = useThemeColor();
  const dispatch: any = useDispatch();

  const {appVersion, loading, error, baseUrl} = useSelector(
    state => state.auth,
  );

  const urlStorage = useMemo(() => getStorageUrl(), []);
  const modeDebug = useMemo(() => __DEV__, []);
  const sessionList = sessionStorage.getSessionList();

  const showUrlInput = useMemo(
    () => modeDebug || (releaseInstanceConfig?.showUrlInput ?? true),
    [modeDebug, releaseInstanceConfig?.showUrlInput],
  );

  const defaultUrl = useMemo(
    () =>
      urlStorage ??
      baseUrl ??
      (modeDebug ? testInstanceConfig?.defaultUrl : releaseInstanceConfig?.url),
    [
      urlStorage,
      baseUrl,
      modeDebug,
      releaseInstanceConfig?.url,
      testInstanceConfig?.defaultUrl,
    ],
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const onPressLogin = useCallback(
    ({
      url,
      username,
      password,
    }: {
      url: string;
      username: string;
      password: string;
    }) => {
      dispatch(
        (login as any)({
          url,
          username,
          password,
        }),
      ).then((res: any) => {
        if (!res.error && isMounted) {
          sessionStorage.saveHiddenSession({
            id: 'session',
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
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <LogoImage logoFile={logoFile} />
          </View>
          <View style={styles.contentWrapper}>
            <View
              style={[
                styles.wrapper,
                {backgroundColor: Colors.backgroundColor},
              ]}>
              <ErrorText error={error} />
              <SessionInputs
                sessionList={[]}
                session={
                  (sessionList.length > 0
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
                      }) as any
                }
                showUrlInput={showUrlInput}
                loading={loading}
                mode="unique"
                onValidation={onPressLogin}
              />
            </View>
          </View>
          <View style={styles.copyrightContainer}>
            <Text writingType="important" fontSize={12}>
              {`© 2005 - ${new Date().getFullYear()} Axelor. All rights reserved.`}
            </Text>
            <Text fontSize={12}>{`Version ${appVersion}`}</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
      <MfaVerificationPopup />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    gap: '5%',
  },
  imageContainer: {
    height: '10%',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height < 500 ? '10%' : '40%',
  },
  contentWrapper: {
    flex: 1,
  },
  wrapper: {
    borderRadius: 12,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  copyrightContainer: {
    alignItems: 'center',
    gap: 4,
    marginBottom: 5,
  },
});

export default LoginScreen;
