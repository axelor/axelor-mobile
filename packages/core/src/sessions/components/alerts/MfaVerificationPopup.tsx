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
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Alert, Button, Label, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {cancelMfa, verifyMfa} from '../../../features/authSlice';
import {useDispatch, useSelector} from '../../../redux/hooks';
import {useTranslator} from '../../../i18n';
import {
  EmailAlert,
  MFA_SUPPORTED_METHODS,
  MfaMethod,
  MfaVerifyErrorCode,
  getMfaDescriptionKey,
  getMfaMethodLabelKey,
  useEmailCode,
} from '../../mfa';
import {MfaCodeInput} from '../inputs';

const MfaVerificationPopup = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loading, mfaPending, mfaState, error, baseUrl} = useSelector(
    state => state.auth,
  );

  const username: string = useMemo(
    () => mfaState?.username ?? '',
    [mfaState?.username],
  );

  const availableMethods: MfaMethod[] = useMemo(
    () =>
      ((mfaState?.methods ?? []) as MfaMethod[]).filter(_m =>
        MFA_SUPPORTED_METHODS.includes(_m),
      ),
    [mfaState?.methods],
  );

  const [activeAlert, setActiveAlert] = useState<EmailAlert | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<MfaMethod | undefined>();
  const [code, setCode] = useState<string>('');

  const {
    retryCount,
    alert: emailAlert,
    send: sendEmail,
    reset: resetEmail,
  } = useEmailCode({
    baseUrl,
    username,
    initialRetryAfter: mfaState?.emailRetryAfter,
  });

  useEffect(() => {
    if (!mfaPending || !username) return;

    setSelectedMethod(availableMethods[0]);
    setCode('');
    resetEmail();
    setActiveAlert(null);
  }, [availableMethods, mfaPending, resetEmail, username]);

  useEffect(() => {
    if (emailAlert) setActiveAlert(emailAlert);
  }, [emailAlert]);

  useEffect(() => {
    switch (error?.message) {
      case MfaVerifyErrorCode.INVALID_CODE:
        setActiveAlert({
          type: 'danger',
          message: I18n.t('Auth_MFA_InvalidCode'),
        });
        return;
      case MfaVerifyErrorCode.SESSION_LOST:
        setActiveAlert({
          type: 'danger',
          message: I18n.t('Auth_MFA_SessionLost'),
        });
        return;
      default:
        return;
    }
  }, [I18n, error?.message]);

  useEffect(() => {
    if (loading) setActiveAlert(null);
  }, [loading]);

  const handleMethodChange = useCallback(
    (method: MfaMethod) => {
      if (method === selectedMethod) return;

      setSelectedMethod(method);
      setCode('');
      resetEmail();

      if (method === MfaMethod.EMAIL && retryCount === -1) {
        sendEmail();
      }
    },
    [resetEmail, retryCount, selectedMethod, sendEmail],
  );

  const handleVerify = useCallback(() => {
    if (!selectedMethod || !code) return;

    dispatch(verifyMfa({mfaCode: code, mfaMethod: selectedMethod} as any));
  }, [code, dispatch, selectedMethod]);

  const otherMethods = useMemo(
    () => availableMethods.filter(m => m !== selectedMethod),
    [availableMethods, selectedMethod],
  );

  return (
    <Alert
      style={styles.alert}
      visible={!!mfaPending}
      title={I18n.t('Auth_MFA_Title')}
      cancelButtonConfig={{
        showInHeader: true,
        onPress: () => dispatch(cancelMfa()),
      }}
      translator={I18n.t}>
      <View style={styles.container}>
        <Text style={styles.description}>
          {I18n.t(getMfaDescriptionKey(selectedMethod))}
        </Text>
        {activeAlert && (
          <Label
            style={styles.alertLabel}
            type={activeAlert.type}
            message={activeAlert.message}
          />
        )}
        <MfaCodeInput
          value={code}
          onChange={setCode}
          selectedMethod={selectedMethod}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button
            title={I18n.t('Auth_MFA_Verify')}
            onPress={handleVerify}
            disabled={!code || !selectedMethod}
          />
        )}
        {selectedMethod === MfaMethod.EMAIL && retryCount !== -1 && (
          <Button
            title={
              retryCount === 0
                ? I18n.t('Auth_MFA_ResendEmail')
                : I18n.t('Auth_MFA_ResendEmailIn').replace(
                    '{{count}}',
                    String(retryCount),
                  )
            }
            onPress={sendEmail}
            disabled={retryCount > 0 || loading}
            color={Colors.cautionColor}
          />
        )}
        {otherMethods.length > 0 && (
          <View style={styles.otherMethods}>
            <Text>{I18n.t('Auth_MFA_OtherOptions')}</Text>
            {otherMethods.map(method => (
              <Button
                key={method}
                title={I18n.t(getMfaMethodLabelKey(method))}
                onPress={() => handleMethodChange(method)}
                color={Colors.infoColor}
              />
            ))}
          </View>
        )}
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  alert: {
    maxHeight: '90%',
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  description: {
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  otherMethods: {
    width: '100%',
    alignItems: 'center',
    marginTop: 6,
  },
  alertLabel: {
    width: '90%',
    marginBottom: 5,
  },
});

export default MfaVerificationPopup;
