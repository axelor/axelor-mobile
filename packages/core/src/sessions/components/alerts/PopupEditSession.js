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
import {useSelector} from 'react-redux';
import {Alert} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {ErrorText, SessionInputs} from '../../components';
import {sessionStorage} from '../..';

const PopupEditSession = ({
  session,
  sessionList,
  popupIsOpen,
  handleClose,
  showUrlInput,
}) => {
  const I18n = useTranslator();

  const {loading, error} = useSelector(state => state.auth);

  const [updateSession, setUpdateSession] = useState(session);
  const [isBackground, setIsBackground] = useState(false);

  const onpressUpdate = useCallback(
    _session => {
      sessionStorage.registerSession({
        session: {id: updateSession?.id, ..._session},
      });
      handleClose();
    },
    [handleClose, updateSession?.id],
  );

  useEffect(() => {
    if (popupIsOpen != null) {
      setIsBackground(false);
    }
  }, [popupIsOpen]);

  useEffect(() => {
    setUpdateSession(() => sessionList?.find(item => item.id === session?.id));
  }, [session, sessionList]);

  const inputProps = useMemo(
    () => ({
      sessionList,
      session: updateSession,
      showUrlInput,
      loading,
      mode: 'edition',
      showPopup: value => setIsBackground(!value),
      onValidation: onpressUpdate,
      saveBeforeScan: value =>
        setUpdateSession(_current => ({..._current, ...value})),
    }),
    [loading, onpressUpdate, sessionList, showUrlInput, updateSession],
  );

  if (isBackground) {
    return <SessionInputs hidden={true} {...inputProps} />;
  }

  return (
    <Alert
      style={styles.alert}
      visible={popupIsOpen}
      title={I18n.t('Base_Connection_EditSession')}
      cancelButtonConfig={{
        hide: sessionList?.length <= 0,
        showInHeader: true,
        onPress: handleClose,
      }}>
      <View style={styles.popupContainer}>
        <ErrorText error={error} />
        <SessionInputs {...inputProps} />
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
});

export default PopupEditSession;
