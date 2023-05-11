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

import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  useThemeColor,
  Text,
  Screen,
  Button,
  InfoBubble,
} from '@axelor/aos-mobile-ui';
import {
  LogoImage,
  PopupSessionList,
  PopupCreateSession,
  PopupSession,
} from '../components';
import {useTranslator} from '../i18n';
import {useSessions} from '../sessions';

const LoginScreen = ({route}) => {
  const appVersion = route?.params?.version;
  const testInstanceConfig = route?.params?.testInstanceConfig;
  const releaseInstanceConfig = route?.params?.releaseInstanceConfig;
  const enableConnectionSessions = route?.params?.enableConnectionSessions;
  const logoFile = route?.params?.logoFile;
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const {sessionList, sessionActive} = useSessions(enableConnectionSessions);

  const modeDebug = useMemo(() => __DEV__, []);

  const showUrlInput = useMemo(() => {
    if (modeDebug) {
      return true;
    } else {
      return releaseInstanceConfig?.showUrlInput || true;
    }
  }, [modeDebug, releaseInstanceConfig?.showUrlInput]);

  const [popupCreateSessionIsOpen, setPopupCreateSessionIsOpen] =
    useState(false);
  const [popupSessionIsOpen, setPopupSessionIsOpen] = useState(false);
  const [popupSessionListIsOpen, setPopupSessionListIsOpen] = useState(false);

  const renderChangeSessionButton = () => {
    if (
      (!sessionActive && sessionList?.length === 1) ||
      sessionList?.length > 1
    ) {
      return (
        <View style={styles.row}>
          <View style={styles.bubble}>
            <Text>{sessionList.length}</Text>
          </View>
          <Button
            title={
              !sessionActive && sessionList?.length > 0
                ? I18n.t('Auth_Choose_Session')
                : I18n.t('Auth_Change_Session')
            }
            onPress={() => {
              setPopupSessionListIsOpen(true);
            }}
            style={styles.buttonChangeSession}
          />
        </View>
      );
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <LogoImage logoFile={logoFile} />
            </View>
            {sessionActive && (
              <Button
                title={sessionActive.id}
                onPress={() => {
                  setPopupSessionIsOpen(true);
                }}
                style={styles.button}
              />
            )}
            {!sessionActive && sessionList?.length > 0 && (
              <Button
                title={I18n.t('Auth_No_Active_Session')}
                onPress={() => {}}
                style={styles.buttonDisabled}
                disabled={true}
              />
            )}
            {renderChangeSessionButton()}
            <View style={styles.row}>
              <InfoBubble
                indication={I18n.t('Auth_InfoSession')}
                iconName="info"
                badgeColor={Colors.cautionColor}
                style={styles.infoBubble}
                textIndicationStyle={styles.textIndicationStyle}
              />
              <Button
                title={I18n.t('Auth_Create_Session')}
                style={
                  sessionList?.length > 0
                    ? styles.buttonCreateSession
                    : styles.button
                }
                onPress={() => setPopupCreateSessionIsOpen(true)}
              />
            </View>
            <PopupCreateSession
              modeDebug={modeDebug}
              popupIsOpen={popupCreateSessionIsOpen}
              setPopupIsOpen={setPopupCreateSessionIsOpen}
              showUrlInput={showUrlInput}
              testInstanceConfig={testInstanceConfig}
              enableConnectionSessions={enableConnectionSessions}
              releaseInstanceConfig={releaseInstanceConfig}
            />
            <PopupSession
              enableConnectionSessions={enableConnectionSessions}
              sessionActive={sessionActive}
              popupIsOpen={popupSessionIsOpen}
              setPopupIsOpen={setPopupSessionIsOpen}
              showUrlInput={showUrlInput}
            />
            <PopupSessionList
              sessionList={sessionList}
              popupIsOpen={popupSessionListIsOpen}
              setPopupIsOpen={setPopupSessionListIsOpen}
              setPopupSessionIsOpen={setPopupSessionIsOpen}
            />
            <View style={styles.copyright}>
              <Text>{`© 2005 - ${new Date().getFullYear()} Axelor. All rights reserved.`}</Text>
              <Text>{`Version ${appVersion}`}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      marginTop: '15%',
      alignItems: 'center',
      height: Dimensions.get('window').height * 0.95,
    },
    imageContainer: {
      alignItems: 'center',
      width: '100%',
      height: '15%',
      marginTop: Dimensions.get('window').height < 500 ? '15%' : '40%',
      marginBottom: '10%',
    },
    copyright: {
      position: 'absolute',
      alignItems: 'center',
      width: '100%',
      bottom: 0,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    button: {
      width: '50%',
    },
    buttonCreateSession: {
      width: '50%',
      borderWidth: 1,
      borderColor: Colors.primaryColor.background,
      backgroundColor: Colors.secondaryColor_dark.foreground,
    },
    buttonChangeSession: {
      width: '50%',
      backgroundColor: Colors.infoColor.background_light,
    },
    infoBubble: {
      position: 'absolute',
      left: '-10%',
    },
    textIndicationStyle: {
      width: Dimensions.get('window').height * 0.3,
    },
    bubble: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.secondaryColor_dark.foreground,
      borderWidth: 2,
      borderColor: Colors.infoColor.background_light,
      borderRadius: Dimensions.get('window').width * 0.07,
      width: Dimensions.get('window').width * 0.07,
      height: Dimensions.get('window').width * 0.07,
      position: 'absolute',
      left: '-10%',
    },
    buttonDisabled: {
      width: '50%',
      backgroundColor: Colors.secondaryColor.background_light,
    },
  });

export default LoginScreen;
