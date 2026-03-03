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
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Icon, useThemeColor} from '@axelor/aos-mobile-ui';
import {ErrorText, SessionInputs} from '../../components';
import {login} from '../../../features/authSlice';
import {sessionStorage} from '../..';

const PopupSession = ({
  sessionList,
  sessionActive,
  popupIsOpen,
  handleClose,
  showUrlInput,
  testInstanceConfig,
}) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {loading, error} = useSelector(state => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  const modeDebug = useMemo(() => __DEV__, []);

  const onPressLogin = useCallback(
    ({password}) => {
      dispatch(
        login({
          url: sessionActive.url,
          username: sessionActive.username,
          password,
          closePopup: () => setIsOpen(false),
        }),
      );
    },
    [dispatch, sessionActive],
  );

  const deleteSession = useCallback(() => {
    sessionStorage.removeSession({sessionId: sessionActive?.id});
    handleClose();
  }, [sessionActive, handleClose]);

  useEffect(() => {
    setIsOpen(popupIsOpen);
  }, [popupIsOpen]);

  if (sessionActive == null) {
    return null;
  }

  return (
    <Alert
      style={styles.alert}
      visible={isOpen}
      title={sessionActive?.name}
      cancelButtonConfig={{
        hide: loading,
        showInHeader: true,
        onPress: handleClose,
      }}>
      <View style={styles.popupContainer}>
        <ErrorText error={error} />
        <SessionInputs
          sessionList={sessionList}
          session={{
            ...sessionActive,
            password: modeDebug ? testInstanceConfig?.defaultPassword : '',
          }}
          showUrlInput={showUrlInput}
          loading={loading}
          mode="connection"
          showPopup={setIsOpen}
          onValidation={onPressLogin}
        />
        <Icon
          name="trash3-fill"
          size={20}
          color={Colors.errorColor.background}
          touchable={true}
          onPress={deleteSession}
          style={styles.binIcon}
        />
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
  binIcon: {
    position: 'absolute',
    right: '1%',
    bottom: '5%',
  },
});

export default PopupSession;
