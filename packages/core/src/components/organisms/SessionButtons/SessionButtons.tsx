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

import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  Button,
  InfoBubble,
  ThemeColors,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {SessionNumberIndicator} from '../../molecules';

export const CreateSessionButton = ({onPress, numberSessions}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
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
        style={[
          styles.button,
          numberSessions > 0 ? styles.buttonCreateSession : null,
        ]}
        onPress={onPress}
      />
    </View>
  );
};

export const ChooseSessionButton = ({
  onPress,
  numberSessions,
  sessionActive,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  if ((!sessionActive && numberSessions === 1) || numberSessions > 1) {
    return (
      <View style={styles.row}>
        <SessionNumberIndicator number={numberSessions} />
        <Button
          title={
            !sessionActive
              ? I18n.t('Auth_Choose_Session')
              : I18n.t('Auth_Change_Session')
          }
          onPress={onPress}
          color={Colors.infoColor}
          style={styles.button}
        />
      </View>
    );
  }

  return null;
};

export const NoActiveSessionButton = ({numberSessions, sessionActive}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  if (sessionActive || numberSessions === 0) {
    return null;
  }

  return (
    <Button
      title={I18n.t('Auth_No_Active_Session')}
      onPress={() => {}}
      style={styles.button}
      disabled={true}
      color={Colors.secondaryColor}
    />
  );
};

export const ConnectSessionButton = ({onPress, sessionActive}) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  if (!sessionActive) {
    return null;
  }

  return (
    <Button
      title={sessionActive.id}
      onPress={onPress}
      style={styles.button}
      color={Colors.primaryColor}
    />
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    button: {
      width: '90%',
      height: 70,
      marginVertical: '2%',
    },
    buttonCreateSession: {
      borderWidth: 1,
      borderColor: Colors.primaryColor.background,
      backgroundColor: Colors.secondaryColor_dark.foreground,
    },
    infoBubble: {
      position: 'absolute',
      left: '-10%',
    },
    textIndicationStyle: {
      width: Dimensions.get('window').width * 0.7,
    },
  });
