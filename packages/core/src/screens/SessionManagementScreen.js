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
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Text, Screen} from '@axelor/aos-mobile-ui';
import {
  LogoImage,
  PopupCreateSession,
  PopupSession,
  SessionListCard,
  PopupEditSession,
  useSessions,
} from '../sessions';
import {clearError} from '../features/authSlice';
import {useSelector} from '../redux/hooks';

const SessionManagementScreen = ({route}) => {
  const testInstanceConfig = route?.params?.testInstanceConfig;
  const releaseInstanceConfig = route?.params?.releaseInstanceConfig;
  const logoFile = route?.params?.logoFile;
  const dispatch = useDispatch();

  const modeDebug = useMemo(() => __DEV__, []);

  const {sessionList, sessionDefault} = useSessions();

  const showUrlInput = useMemo(() => {
    if (modeDebug) {
      return true;
    } else {
      return releaseInstanceConfig?.showUrlInput || true;
    }
  }, [modeDebug, releaseInstanceConfig?.showUrlInput]);

  const [isMounted, setIsMounted] = useState(false);
  const [popupCreateIsOpen, setPopupCreateIsOpen] = useState(false);
  const [popupConnectionIsOpen, setPopupConnectionIsOpen] = useState(false);
  const [popupEditIsOpen, setPopupEditIsOpen] = useState(false);
  const [session, setSession] = useState(
    sessionDefault != null ? sessionDefault : null,
  );

  const {appVersion} = useSelector(state => state.auth);

  useEffect(() => {
    if (!popupCreateIsOpen && !popupConnectionIsOpen) {
      dispatch(clearError());
    }
  }, [dispatch, popupConnectionIsOpen, popupCreateIsOpen]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (sessionDefault != null && isMounted) {
      setPopupConnectionIsOpen(true);
    }
  }, [isMounted, sessionDefault]);

  useEffect(() => {
    if (!Array.isArray(sessionList) || sessionList.length === 0) {
      setPopupCreateIsOpen(true);
    }
  }, [sessionList]);

  const changeActiveSession = useCallback(_session => {
    setSession(_session);
  }, []);

  return (
    <Screen>
      <KeyboardAvoidingView keyboardOffset={{ios: 0, android: 180}}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <LogoImage logoFile={logoFile} url={session?.url} />
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
          <View style={styles.copyrightContainer}>
            <Text>{`© 2005 - ${new Date().getFullYear()} Axelor. All rights reserved.`}</Text>
            <Text>{`Version ${appVersion}`}</Text>
          </View>
        </View>
        <PopupCreateSession
          sessionList={sessionList}
          visible={popupCreateIsOpen}
          handleVisibility={setPopupCreateIsOpen}
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
          showUrlInput={showUrlInput}
          handleClose={() => {
            setPopupConnectionIsOpen(false);
            setPopupEditIsOpen(false);
          }}
          modeDebug={modeDebug}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    height: '15%',
    alignItems: 'center',
    paddingTop: '15%',
  },
  copyrightContainer: {
    alignItems: 'center',
  },
});

export default SessionManagementScreen;
