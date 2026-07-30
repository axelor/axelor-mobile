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
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  Button,
  checkNullString,
  useThemeColor,
  WarningCard,
} from '@axelor/aos-mobile-ui';
import {useScanActivator, useScannerDeviceActivator} from '../../../hooks';
import {useDispatch} from '../../../redux/hooks';
import {useTranslator} from '../../../i18n';
import {isUrlValid} from '../../../features/authSlice';
import {
  clearScan,
  useScannedValueByKey,
  useScannerSelector,
} from '../../../features/scannerSlice';
import {
  clearBarcode,
  useCameraScannerValueByKey,
} from '../../../features/cameraScannerSlice';
import {Session} from '../../type';
import {
  DefaultCheckbox,
  SessionNameInput,
  UrlInput,
  UsernameInput,
  PasswordInput,
} from '../inputs';

const getScanKey = (mode: string) => `urlUsername_${mode}_inputs`;

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
  showUrlInput = false,
  loading = false,
  mode,
  showPopup,
  onValidation,
  hidden = false,
  saveBeforeScan,
}: {
  style?: any;
  sessionList?: Session[];
  session?: Session;
  showUrlInput?: boolean;
  loading?: boolean;
  mode: string;
  showPopup?: (_v: boolean) => void;
  onValidation: (_v?: any) => void;
  hidden?: boolean;
  saveBeforeScan?: (_v?: any) => void;
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
  const [form, setForm] = useState<Session | undefined>(session);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    if (session != null && !loading && mode !== MODE.creation) {
      setForm({...session});
    }
  }, [loading, mode, session]);

  const handleFieldChange = useCallback(
    (value: any, fieldName: string) => {
      setForm(_current => {
        const old: any = _current == null ? {} : {..._current};

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
    (scanValue: string) => {
      if (scanValue.includes('username')) {
        const parseScannnedData = JSON.parse(scanValue);
        handleFieldChange(parseScannnedData.url, FIELDS.url);
        handleFieldChange(parseScannnedData.username, FIELDS.username);
      } else {
        handleFieldChange(scanValue, FIELDS.url);
      }
      showPopup?.(true);
    },
    [handleFieldChange, showPopup],
  );

  useEffect(() => {
    if (scannedValue) {
      parseQrCode(scannedValue);
      dispatch(clearScan());
    } else if (scanData?.value != null) {
      parseQrCode(scanData?.value);
      setTimeout(() => dispatch(clearBarcode()), 100);
    }
  }, [dispatch, parseQrCode, scanData, scannedValue]);

  const handleScanPress = useCallback(() => {
    saveBeforeScan?.(form);

    DeviceInfo.getManufacturer()
      .then(manufacturer => {
        if (manufacturer !== 'Zebra Technologies') {
          showPopup?.(false);
        }
      })
      .then(() => onScanPress());
  }, [form, onScanPress, saveBeforeScan, showPopup]);

  const testUrl = useCallback(
    (url?: string) => dispatch((isUrlValid as any)({url})),
    [dispatch],
  );

  const handleTestUrl = useCallback(
    () => testUrl(form?.url),
    [form?.url, testUrl],
  );

  useEffect(() => {
    testUrl(session?.url);
  }, [session?.url, testUrl]);

  const nameSessionAlreadyExist = useMemo(() => {
    if (!Array.isArray(sessionList) || sessionList.length === 0) {
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
      return checkNullString((form as any)?.password);
    } else {
      return false;
    }
  }, [loading, form, mode, nameSessionAlreadyExist]);

  const styles = useMemo(
    () => getStyles(mode, isKeyboardOpen),
    [isKeyboardOpen, mode],
  );

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardOpen(false),
    );

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardOpen(true),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (hidden) return null;

  return (
    <ScrollView style={[styles.container, style]}>
      <View>
        {!loading && nameSessionAlreadyExist && (
          <WarningCard
            style={styles.fullWidth}
            errorMessage={I18n.t('Base_Connection_SessionNameAlreadyExist')}
          />
        )}
      </View>
      <SessionNameInput
        style={styles.fullWidth}
        value={form?.name}
        onChange={_value => handleFieldChange(_value, FIELDS.name)}
        showRequiredFields={showRequiredFields}
        hidden={mode === MODE.connection || mode === MODE.unique}
      />
      <UrlInput
        style={styles.fullWidth}
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
        showRequiredFields={showRequiredFields}
        hidden={!showUrlInput}
      />
      <UsernameInput
        style={styles.fullWidth}
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
        showRequiredFields={showRequiredFields}
      />
      <PasswordInput
        style={styles.fullWidth}
        value={(form as any)?.password}
        onChange={_value => handleFieldChange(_value, FIELDS.password)}
        readOnly={loading}
        showRequiredFields={showRequiredFields}
        hidden={mode === MODE.edition}
      />
      <DefaultCheckbox
        style={styles.fullWidth}
        value={form?.isDefault}
        onChange={_value => handleFieldChange(_value, FIELDS.isDefault)}
        hidden={mode === MODE.connection || mode === MODE.unique}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primaryColor.background}
        />
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
    </ScrollView>
  );
};

const getStyles = (mode: string, isKeyboardOpen: boolean) =>
  StyleSheet.create({
    container: {
      width: mode === MODE.unique ? '90%' : '100%',
      height:
        Dimensions.get('window').height < 500 &&
        (mode === MODE.creation || isKeyboardOpen)
          ? '85%'
          : null,
    },
    fullWidth: {
      width: '100%',
      marginHorizontal: 0,
    },
    button: {
      width: undefined,
      height: undefined,
      paddingHorizontal: 15,
      paddingVertical: 8,
    },
  });

export default SessionInputs;
