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
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, PopUp} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {ErrorText, SessionInputs} from '../../components';
import {login} from '../../../features/authSlice';
import {getStorageUrl, sessionStorage} from '../..';
import DeviceInfo from 'react-native-device-info';

const PopupCreateSession = ({
  sessionList,
  visible,
  handleVisibility,
  showUrlInput,
  modeDebug,
  testInstanceConfig,
  releaseInstanceConfig,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loading, error, baseUrl} = useSelector(state => state.auth);

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

  const [isBackground, setIsBackground] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [_session, setSession] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const onPressLogin = useCallback(
    session => {
      dispatch(login({...session})).then(res => {
        if (res.error == null && isMounted) {
          sessionStorage.registerSession({
            session,
          });
        }
      });
    },
    [dispatch, isMounted],
  );

  useEffect(() => {
    if (visible != null) {
      setIsBackground(false);
    }
  }, [visible]);

  const inputProps = useMemo(
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
      showPopup: value => {
        setIsBackground(!value);
        handleVisibility(value ? true : null);
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

  if (isBackground) {
    return <SessionInputs hidden={true} {...inputProps} />;
  }

  return (
    <PopUp
      visible={visible}
      title={I18n.t('Base_Connection_CreateSession')}
      style={styles.popup}>
      <View style={styles.popupContainer}>
        {sessionList?.length > 0 && (
          <Icon
            name="times"
            size={20}
            touchable={true}
            onPress={handleVisibility}
            style={styles.closeIcon}
          />
        )}
        <ErrorText error={error} />
        <SessionInputs {...inputProps} />
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
    top: -30,
  },
});

export default PopupCreateSession;
