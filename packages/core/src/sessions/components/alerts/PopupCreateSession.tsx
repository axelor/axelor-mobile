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
import {StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Alert} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '../../../redux/hooks';
import {login} from '../../../features/authSlice';
import {useTranslator} from '../../../i18n';
import {ErrorText, SessionInputs} from '../../components';
import {sessionStorage} from '../../SessionStorage';
import {getStorageUrl} from '../../utils';
import {Session} from '../../type';

const PopupCreateSession = ({
  sessionList,
  visible,
  handleVisibility,
  showUrlInput = false,
  modeDebug = false,
  testInstanceConfig,
  releaseInstanceConfig,
}: {
  sessionList?: Session[];
  visible?: boolean;
  handleVisibility: (_v?: boolean) => void;
  showUrlInput?: boolean;
  modeDebug?: boolean;
  testInstanceConfig?: any;
  releaseInstanceConfig?: any;
}) => {
  const I18n = useTranslator();
  const dispatch: any = useDispatch();

  const {loading, error, baseUrl} = useSelector(state => state.auth);

  const urlStorage = useMemo(() => getStorageUrl(), []);

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

  const [isBackground, setIsBackground] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [_session, setSession] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const onPressLogin = useCallback(
    (session: Session) => {
      dispatch(
        (login as any)({...session, closePopup: () => handleVisibility(false)}),
      ).then((res: any) => {
        if (res.error == null && isMounted) {
          sessionStorage.registerSession({session});
        }
      });
    },
    [dispatch, handleVisibility, isMounted],
  );

  useEffect(() => {
    if (visible != null) {
      setIsBackground(false);
    }
  }, [visible]);

  const inputProps: any = useMemo(
    () => ({
      sessionList,
      session:
        _session != null
          ? _session
          : modeDebug
            ? {
                name: DeviceInfo.getApplicationName(),
                url: defaultUrl,
                username: testInstanceConfig?.defaultUsername,
                password: testInstanceConfig?.defaultPassword,
                isDefault: false,
              }
            : {url: defaultUrl, isDefault: false},
      showUrlInput,
      loading,
      mode: 'creation',
      showPopup: (_v?: boolean) => {
        setIsBackground(!_v);
        handleVisibility(_v ? true : undefined);
      },
      onValidation: onPressLogin,
      saveBeforeScan: setSession,
    }),
    [
      _session,
      defaultUrl,
      handleVisibility,
      loading,
      modeDebug,
      onPressLogin,
      sessionList,
      showUrlInput,
      testInstanceConfig?.defaultPassword,
      testInstanceConfig?.defaultUsername,
    ],
  );

  if (isBackground) return <SessionInputs hidden={true} {...inputProps} />;

  return (
    <Alert
      style={styles.alert}
      visible={visible ?? false}
      title={I18n.t('Base_Connection_CreateSession')}
      cancelButtonConfig={{
        hide: loading || sessionList?.length! <= 0,
        showInHeader: true,
        onPress: handleVisibility,
      }}>
      <View style={styles.popupContainer}>
        <ErrorText error={error} />
        <SessionInputs {...inputProps} />
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  alert: {
    maxHeight: '90%',
  },
  popupContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
});

export default PopupCreateSession;
