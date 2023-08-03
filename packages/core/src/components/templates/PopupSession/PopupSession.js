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
import {Icon, PopUp, useThemeColor, LabelText} from '@axelor/aos-mobile-ui';
import {PasswordInput} from '../../organisms';
import {ErrorText, LoginButton} from '../../molecules';
import {} from '../../../hooks/use-scan-activator';
import {login} from '../../../features/authSlice';
import {sessionStorage} from '../../../sessions';

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

  const [isOpen, setIsOpen] = useState(false);
  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const [password, setPassword] = useState('');

  const modeDebug = useMemo(() => __DEV__, []);

  useEffect(() => {
    if (sessionActive != null) {
      setPassword(modeDebug ? testInstanceConfig?.defaultPassword : '');
    }
  }, [modeDebug, sessionActive, testInstanceConfig?.defaultPassword]);

  const onPressLogin = useCallback(() => {
    dispatch(
      login({
        url: sessionActive.url,
        username: sessionActive.username,
        password,
      }),
    );
  }, [dispatch, password, sessionActive]);

  const deleteSession = useCallback(() => {
    sessionStorage.removeSession({sessionId: sessionActive?.id});
    setPopupIsOpen(false);
  }, [sessionActive?.id, setPopupIsOpen]);

  useEffect(() => {
    setIsOpen(popupIsOpen);
  }, [popupIsOpen]);

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
        <LabelText
          iconName="user"
          title={sessionActive.username}
          style={styles.labText}
          size={20}
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
