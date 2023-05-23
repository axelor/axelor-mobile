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
import DeviceInfo from 'react-native-device-info';
import {Icon, PopUp, useThemeColor, LabelText} from '@axelor/aos-mobile-ui';
import {PasswordInput, UsernameInput} from '../../organisms';
import {ErrorText, LoginButton} from '../../molecules';
import {
  useScanActivator,
  useScannerDeviceActivator,
} from '../../../hooks/use-scan-activator';
import {
  useScannedValueByKey,
  useScannerSelector,
} from '../../../features/scannerSlice';
import {useCameraScannerValueByKey} from '../../../features/cameraScannerSlice';
import {login} from '../../../features/authSlice';
import {sessionStorage} from '../../../sessions';
import {checkNullString} from '../../../utils';

const urlScanKey = 'urlUsername_FastConnection_login';

const PopupSession = ({
  popupIsOpen,
  setPopupIsOpen,
  showUrlInput,
  sessionActive,
  testInstanceConfig,
}) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {loading, error} = useSelector(state => state.auth);
  const {enable: onScanPress} = useScanActivator(urlScanKey);
  const {enable: enableScanner} = useScannerDeviceActivator(urlScanKey);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(urlScanKey);
  const scanData = useCameraScannerValueByKey(urlScanKey);

  const [isOpen, setIsOpen] = useState(false);
  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const [username, setUsername] = useState(sessionActive?.username);
  const [password, setPassword] = useState('');

  const modeDebug = useMemo(() => __DEV__, []);

  useEffect(() => {
    if (sessionActive != null) {
      setUsername(sessionActive.username);
      setPassword(modeDebug ? testInstanceConfig?.defaultPassword : '');
    }
  }, [modeDebug, sessionActive, testInstanceConfig?.defaultPassword]);

  const onPressLogin = useCallback(() => {
    dispatch(login({url: sessionActive.url, username, password}));
  }, [dispatch, password, sessionActive, username]);

  const deleteSession = useCallback(() => {
    sessionStorage.removeSession({sessionId: sessionActive?.id});
    setPopupIsOpen(false);
  }, [sessionActive?.id, setPopupIsOpen]);

  const parseQrCode = useCallback(scanValue => {
    if (scanValue.includes('username') === true) {
      const parseScannnedData = JSON.parse(scanValue);
      setUsername(parseScannnedData.username);
    }
    setIsOpen(true);
  }, []);

  const disabledLogin = useMemo(
    () => checkNullString(username) || checkNullString(password) || loading,
    [loading, password, username],
  );

  useEffect(() => {
    if (scannedValue) {
      parseQrCode(scannedValue);
    } else if (scanData?.value != null) {
      parseQrCode(scanData?.value);
    }
  }, [parseQrCode, scanData, scannedValue]);

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

  if (sessionActive == null) {
    return null;
  }

  return (
    <PopUp visible={isOpen} title={sessionActive?.id} style={styles.popup}>
      <View style={styles.popupContainer}>
        <Icon
          name="times"
          size={20}
          touchable={true}
          onPress={() => setPopupIsOpen(false)}
          style={styles.closeIcon}
        />
        <ErrorText error={error} />
        {showUrlInput && (
          <LabelText
            iconName="link"
            title={sessionActive.url}
            style={styles.labText}
            size={20}
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
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <LoginButton
            onPress={onPressLogin}
            onDisabledPress={() => setShowRequiredFields(true)}
            disabled={disabledLogin}
          />
        )}
        <Icon
          name="trash-alt"
          size={20}
          color={Colors.errorColor.background}
          touchable={true}
          onPress={deleteSession}
          style={styles.binIcon}
        />
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
  binIcon: {
    position: 'absolute',
    right: '1%',
    bottom: '5%',
  },
  input: {
    width: '100%',
  },
  labText: {
    width: '95%',
    marginVertical: 10,
  },
});

export default PopupSession;
