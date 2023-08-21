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
import {StyleSheet, View, Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {Text, KeyboardAvoidingScrollView, Screen} from '@axelor/aos-mobile-ui';
import {
  LogoImage,
  PopupCreateSession,
  PopupSession,
  SessionListCard,
  PopupEditSession,
} from '../components';
import {sessionStorage, useSessions} from '../sessions';
import {clearError} from '../features/authSlice';

const SessionManagementScreen = ({route}) => {
  const appVersion = route?.params?.version;
  const testInstanceConfig = route?.params?.testInstanceConfig;
  const releaseInstanceConfig = route?.params?.releaseInstanceConfig;
  const logoFile = route?.params?.logoFile;
  const dispatch = useDispatch();

  const modeDebug = useMemo(() => __DEV__, []);

  const {sessionList, sessionActive, sessionDefault} = useSessions();

  const showUrlInput = useMemo(() => {
    if (modeDebug) {
      return true;
    } else {
      return releaseInstanceConfig?.showUrlInput || true;
    }
  }, [modeDebug, releaseInstanceConfig?.showUrlInput]);

  const [popupCreateIsOpen, setPopupCreateIsOpen] = useState(false);
  const [popupConnectionIsOpen, setPopupConnectionIsOpen] = useState(false);
  const [popupEditIsOpen, setPopupEditIsOpen] = useState(false);
  const [session, setSession] = useState(
    sessionDefault != null ? sessionDefault : sessionActive,
  );

  useEffect(() => {
    if (!popupCreateIsOpen && !popupConnectionIsOpen) {
      dispatch(clearError());
    }
  }, [dispatch, popupConnectionIsOpen, popupCreateIsOpen]);

  useEffect(() => {
    if (sessionDefault != null) {
      setPopupConnectionIsOpen(true);
    }
  }, [sessionDefault]);

  useEffect(() => {
    if (sessionList <= 0 || sessionList == null) {
      setPopupCreateIsOpen(true);
    }
  }, [sessionList]);

  const changeActiveSession = useCallback(sessionId => {
    sessionStorage.changeActiveSession({sessionId});
    setSession(sessionStorage.getActiveSession());
  }, []);

  return (
    <Screen>
      <KeyboardAvoidingScrollView keyboardOffset={{ios: 0, android: 180}}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <LogoImage logoFile={logoFile} url={sessionActive?.url} />
          </View>
          <SessionListCard
            logoFile={logoFile}
            sessionList={sessionList}
            changeActiveSession={changeActiveSession}
            openConnection={() => setPopupConnectionIsOpen(true)}
            openEdition={() => setPopupEditIsOpen(true)}
            openCreation={() => setPopupCreateIsOpen(true)}
            session={session}
          />
          <PopupCreateSession
            sessionList={sessionList}
            popupIsOpen={popupCreateIsOpen}
            handleClose={() => setPopupCreateIsOpen(false)}
            showUrlInput={showUrlInput}
            modeDebug={modeDebug}
            testInstanceConfig={testInstanceConfig}
            releaseInstanceConfig={releaseInstanceConfig}
          />
          <PopupSession
            sessionActive={session}
            popupIsOpen={!popupEditIsOpen && popupConnectionIsOpen}
            handleClose={() => setPopupConnectionIsOpen(false)}
            showUrlInput={showUrlInput}
            testInstanceConfig={testInstanceConfig}
          />
          <PopupEditSession
            session={session}
            sessionList={sessionList}
            popupIsOpen={popupEditIsOpen}
            handleClose={() => {
              setPopupConnectionIsOpen(false);
              setPopupEditIsOpen(false);
            }}
            modeDebug={modeDebug}
          />
          <View style={styles.copyright}>
            <Text>{`© 2005 - ${new Date().getFullYear()} Axelor. All rights reserved.`}</Text>
            <Text>{`Version ${appVersion}`}</Text>
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.9,
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    height: '15%',
    marginTop: Dimensions.get('window').height < 500 ? '10%' : '40%',
    marginBottom: 10,
  },
  copyright: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
  },
});

export default SessionManagementScreen;
