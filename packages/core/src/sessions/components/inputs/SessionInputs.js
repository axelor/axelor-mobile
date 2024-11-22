/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {useDispatch} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {
  Button,
  WarningCard,
  checkNullString,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  DefaultCheckbox,
  SessionNameInput,
  UrlInput,
  UsernameInput,
  PasswordInput,
} from '../inputs';
import {
  useScanActivator,
  useScannerDeviceActivator,
} from '../../../hooks/use-scan-activator';
import {
  clearScan,
  useScannedValueByKey,
  useScannerSelector,
} from '../../../features/scannerSlice';
import {
  clearBarcode,
  useCameraScannerValueByKey,
} from '../../../features/cameraScannerSlice';
import {isUrlValid} from '../../../features/authSlice';
import {useTranslator} from '../../../i18n';

const getScanKey = mode => `urlUsername_${mode}_inputs`;

const MODE = {
  creation: 'creation',
  edition: 'edition',
  connection: 'connection',
  unique: 'unique',
};

const FIELDS = {
  name: 'name',
  url: 'url',
  username: 'username',
  password: 'password',
  isDefault: 'isDefault',
};

const SessionInputs = ({
  style,
  sessionList,
  session,
  showUrlInput,
  loading,
  mode,
  showPopup,
  onValidation,
  hidden,
  saveBeforeScan = () => {},
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const _scanKey = useMemo(() => getScanKey(mode), [mode]);

  const {enable: onScanPress} = useScanActivator(_scanKey);
  const {enable: enableScanner} = useScannerDeviceActivator(_scanKey);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(_scanKey);
  const scanData = useCameraScannerValueByKey(_scanKey);

  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const [form, setForm] = useState({
    name: session?.name,
    url: session?.url,
    username: session?.username,
    password: session?.password,
    isDefault: session?.isDefault,
  });

  useEffect(() => {
    if (session != null && !loading && mode !== MODE.creation) {
      setForm({...session});
    }
  }, [loading, mode, session]);

  const handleFieldChange = useCallback(
    (value, fieldName) => {
      setForm(_current => {
        const old = _current == null ? {} : {..._current};
        if (mode === MODE.unique) {
          return {...old, [fieldName]: value};
        }

        if (fieldName !== FIELDS.password && mode !== MODE.connection) {
          return {...old, [fieldName]: value};
        }

        if (fieldName === FIELDS.password && mode !== MODE.edition) {
          return {...old, [fieldName]: value};
        }

        return _current;
      });
    },
    [mode],
  );

  const parseQrCode = useCallback(
    scanValue => {
      if (scanValue.includes('username') === true) {
        const parseScannnedData = JSON.parse(scanValue);
        handleFieldChange(parseScannnedData.url, FIELDS.url);
        handleFieldChange(parseScannnedData.username, FIELDS.username);
      } else {
        handleFieldChange(scanValue, FIELDS.url);
      }
      showPopup(true);
    },
    [handleFieldChange, showPopup],
  );

  useEffect(() => {
    if (scannedValue) {
      parseQrCode(scannedValue);
      dispatch(clearScan());
    } else if (scanData?.value != null) {
      parseQrCode(scanData?.value);
      dispatch(clearBarcode());
    }
  }, [dispatch, parseQrCode, scanData, scannedValue]);

  const handleScanPress = useCallback(() => {
    saveBeforeScan(form);

    DeviceInfo.getManufacturer()
      .then(manufacturer => {
        if (manufacturer !== 'Zebra Technologies') {
          showPopup(false);
        }
      })
      .then(() => onScanPress());
  }, [form, onScanPress, saveBeforeScan, showPopup]);

  const testUrl = useCallback(
    url => {
      dispatch(isUrlValid({url: url}));
    },
    [dispatch],
  );

  const handleTestUrl = useCallback(() => {
    testUrl(form?.url);
  }, [form?.url, testUrl]);

  useEffect(() => {
    testUrl(session?.url);
  }, [session?.url, testUrl]);

  const nameSessionAlreadyExist = useMemo(() => {
    if (!Array.isArray(sessionList) || sessionList?.length === 0) {
      return false;
    }

    return sessionList.some(
      _session => _session.name === form?.name && _session.id !== form?.id,
    );
  }, [form, sessionList]);

  const disabled = useMemo(() => {
    if (
      loading ||
      (mode !== MODE.unique && checkNullString(form?.name)) ||
      checkNullString(form?.url) ||
      checkNullString(form?.username) ||
      nameSessionAlreadyExist
    ) {
      return true;
    } else if (mode !== MODE.edition) {
      return checkNullString(form?.password);
    } else {
      return false;
    }
  }, [
    loading,
    form?.name,
    form?.url,
    form?.username,
    form?.password,
    mode,
    nameSessionAlreadyExist,
  ]);

  if (hidden) {
    return null;
  }

  return (
    <View style={style}>
      <View>
        {!loading && nameSessionAlreadyExist && (
          <WarningCard
            style={styles.warningCard}
            errorMessage={I18n.t('Base_Connection_SessionNameAlreadyExist')}
          />
        )}
      </View>
      <SessionNameInput
        value={form?.name}
        onChange={_value => handleFieldChange(_value, FIELDS.name)}
        style={styles.input}
        showRequiredFields={showRequiredFields}
        hidden={mode === MODE.connection || mode === MODE.unique}
      />
      <UrlInput
        value={form?.url}
        onChange={_value => handleFieldChange(_value, FIELDS.url)}
        readOnly={mode === MODE.connection}
        onScanPress={handleScanPress}
        onSelection={enableScanner}
        onEndFocus={handleTestUrl}
        scanIconColor={
          isEnabled && scanKey === _scanKey
            ? Colors.primaryColor.background
            : Colors.secondaryColor_dark.background
        }
        style={styles.input}
        showRequiredFields={showRequiredFields}
        hidden={!showUrlInput}
      />
      <UsernameInput
        value={form?.username}
        onChange={_value => handleFieldChange(_value, FIELDS.username)}
        readOnly={mode === MODE.connection}
        showScanIcon={!showUrlInput}
        onScanPress={handleScanPress}
        onSelection={enableScanner}
        scanIconColor={
          isEnabled && scanKey === getScanKey(mode)
            ? Colors.primaryColor.background
            : Colors.secondaryColor_dark.background
        }
        style={styles.input}
        showRequiredFields={showRequiredFields}
      />
      <PasswordInput
        value={form?.password}
        onChange={_value => handleFieldChange(_value, FIELDS.password)}
        readOnly={loading}
        style={styles.input}
        showRequiredFields={showRequiredFields}
        hidden={mode === MODE.edition}
      />
      <DefaultCheckbox
        value={form?.isDefault}
        onChange={_value => handleFieldChange(_value, FIELDS.isDefault)}
        hidden={mode === MODE.connection || mode === MODE.unique}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button
          title={I18n.t(
            mode === MODE.edition
              ? 'Base_Connection_Update'
              : 'Base_Connection_Login',
          )}
          onPress={() => onValidation(form)}
          disabled={disabled}
          onDisabledPress={() => setShowRequiredFields(true)}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    width: 150,
    height: 30,
  },
  input: {
    width: '100%',
  },
  warningCard: {
    width: '90%',
  },
});

export default SessionInputs;
