/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {Icon, PopUp, useThemeColor} from '@axelor/aos-mobile-ui';
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
    <PopUp visible={isOpen} title={sessionActive?.name} style={styles.popup}>
      <View style={styles.popupContainer}>
        {!loading && (
          <Icon
            name="times"
            size={20}
            touchable={true}
            onPress={handleClose}
            style={styles.closeIcon}
          />
        )}
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
    top: -30,
  },
  binIcon: {
    position: 'absolute',
    right: '1%',
    bottom: '5%',
  },
});

export default PopupSession;
