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
import {SessionNameInput, UrlInput, UsernameInput} from '../../organisms';
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
import {isUrlValid} from '../../../features/authSlice';
import {sessionStorage} from '../../../sessions';
import {checkNullString} from '../../../utils';
import DeviceInfo from 'react-native-device-info';

const urlScanKey = 'urlUsername_createSession_login';

const PopupEditSession = ({
  session,
  sessionList,
  popupIsOpen,
  setPopupIsOpen,
  showUrlInput,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loading, error} = useSelector(state => state.auth);
  const {enable: onScanPress} = useScanActivator(urlScanKey);
  const {enable: enableScanner} = useScannerDeviceActivator(urlScanKey);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(urlScanKey);
  const scanData = useCameraScannerValueByKey(urlScanKey);

  const [updateSession, setUpdateSession] = useState(session);
  const [isOpen, setIsOpen] = useState(false);
  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const [sessionName, setSessionName] = useState(updateSession?.id);
  const [url, setUrl] = useState(updateSession?.url);
  const [username, setUsername] = useState(updateSession?.username);
  const [isDefault, setIsDefault] = useState(updateSession?.isDefault);

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
    return sessionList.some(
      _session =>
        _session.id === sessionName && sessionName !== updateSession.id,
    );
  }, [sessionList, sessionName, updateSession]);

  const disabledLogin = useMemo(
    () =>
      checkNullString(sessionName) ||
      checkNullString(url) ||
      checkNullString(username) ||
      loading ||
      nameSessionAlreadyExist,
    [loading, nameSessionAlreadyExist, sessionName, url, username],
  );

  const onPressLogin = useCallback(() => {
    sessionStorage.updateSession({
      newSession: {
        sessionId: updateSession?.sessionId,
        id: sessionName,
        url: url,
        username: username,
        isActive: updateSession?.isActive,
        isDefault: isDefault,
      },
    });
    setPopupIsOpen(false);
  }, [isDefault, sessionName, url, username, setPopupIsOpen, updateSession]);

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

  useEffect(() => {
    setUpdateSession(() => {
      const _updatedSession = sessionList?.find(
        item => item.sessionId === session?.sessionId,
      );
      setSessionName(_updatedSession?.id);
      setUrl(_updatedSession?.url);
      setUsername(_updatedSession?.username);
      setIsDefault(_updatedSession?.isDefault);
      return _updatedSession;
    });
  }, [session, sessionList]);

  return (
    <PopUp
      visible={isOpen}
      title={I18n.t('Auth_EditSession')}
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
              errorMessage={I18n.t('Auth_SessionNameAlreadyExist')}
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
        <Checkbox
          title={I18n.t('Auth_AlwaysActive')}
          isDefaultChecked={isDefault}
          onChange={setIsDefault}
          iconSize={30}
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

export default PopupEditSession;
