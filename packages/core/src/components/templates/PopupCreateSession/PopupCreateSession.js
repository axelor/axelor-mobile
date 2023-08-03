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
import {
  Icon,
  PopUp,
  useThemeColor,
  WarningCard,
  Checkbox,
} from '@axelor/aos-mobile-ui';
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
import {isUrlValid, login} from '../../../features/authSlice';
import {getStorageUrl, sessionStorage} from '../../../sessions';
import {checkNullString} from '../../../utils';
import DeviceInfo from 'react-native-device-info';

const urlScanKey = 'urlUsername_createSession_login';

const PopupCreateSession = ({
  sessionList,
  popupIsOpen,
  setPopupIsOpen,
  showUrlInput,
  modeDebug,
  testInstanceConfig,
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

  const [isOpen, setIsOpen] = useState(false);
  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const [sessionName, setSessionName] = useState(
    modeDebug ? DeviceInfo.getApplicationName() : '',
  );
  const [url, setUrl] = useState(defaultUrl || '');
  const [username, setUsername] = useState(
    modeDebug ? testInstanceConfig?.defaultUsername : '',
  );
  const [password, setPassword] = useState(
    modeDebug ? testInstanceConfig?.defaultPassword : '',
  );
  const [isDefault, setIsDefault] = useState(false);

  const parseQrCode = useCallback(scanValue => {
    if (scanValue.includes('username') === true) {
      const parseScannnedData = JSON.parse(scanValue);
      setUrl(parseScannnedData.url);
      setUsername(parseScannnedData.username);
    } else {
      setUrl(scanValue);
    }
    setIsOpen(true);
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
    dispatch(login({url, username, password})).then(res => {
      if (res.error == null && error == null) {
        if (error == null) {
          sessionStorage.addSession({
            session: {
              id: sessionName,
              url: url,
              username: username,
              isActive: true,
              isDefault: isDefault,
            },
          });
        }
      }
    });
  }, [dispatch, password, sessionName, url, username, error, isDefault]);

  const handleTestUrl = useCallback(() => {
    dispatch(isUrlValid({url}));
  }, [dispatch, url]);

  useEffect(() => {
    handleTestUrl();
  }, [handleTestUrl, url]);

  useEffect(() => {
    setIsOpen(popupIsOpen);
  }, [popupIsOpen]);

  const handleScanPress = useCallback(() => {
    DeviceInfo.getManufacturer()
      .then(manufacturer => {
        if (manufacturer !== 'Zebra Technologies') {
          setIsOpen(false);
        }
      })
      .then(() => onScanPress());
  }, [onScanPress]);

  return (
    <PopUp
      visible={isOpen}
      title={I18n.t('Auth_Create_Session')}
      style={styles.popup}>
      <View style={styles.popupContainer}>
        {sessionList?.length > 0 && (
          <Icon
            name="times"
            size={20}
            touchable={true}
            onPress={() => setPopupIsOpen(false)}
            style={styles.closeIcon}
          />
        )}
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
          showRequiredFields={showRequiredFields}
        />
        {showUrlInput && (
          <UrlInput
            value={url}
            onChange={setUrl}
            readOnly={loading}
            onScanPress={handleScanPress}
            onSelection={enableScanner}
            onEndFocus={handleTestUrl}
            scanIconColor={
              isEnabled && scanKey === urlScanKey
                ? Colors.primaryColor.background
                : Colors.secondaryColor_dark.background
            }
            style={styles.input}
            showRequiredFields={showRequiredFields}
          />
        )}
        <UsernameInput
          value={username}
          onChange={setUsername}
          readOnly={loading}
          showScanIcon={!showUrlInput}
          onScanPress={handleScanPress}
          onSelection={enableScanner}
          scanIconColor={
            isEnabled && scanKey === urlScanKey
              ? Colors.primaryColor.background
              : Colors.secondaryColor_dark.background
          }
          style={styles.input}
          showRequiredFields={showRequiredFields}
        />
        <PasswordInput
          value={password}
          onChange={setPassword}
          readOnly={loading}
          style={styles.input}
          showRequiredFields={showRequiredFields}
        />
        <Checkbox
          title={I18n.t('Auth_Always_Active')}
          isDefaultChecked={isDefault}
          onChange={setIsDefault}
          iconSize={20}
          style={styles.checkbox}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <LoginButton
            onPress={onPressLogin}
            onDisabledPress={() => setShowRequiredFields(true)}
            disabled={disabledLogin}
          />
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
  checkbox: {
    alignSelf: 'flex-start',
  },
});

export default PopupCreateSession;
