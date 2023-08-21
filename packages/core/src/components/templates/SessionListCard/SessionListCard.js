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
import {ScrollView, StyleSheet, View, Dimensions} from 'react-native';
import {useThemeColor, InfoBubble, Icon} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {SessionCard} from '../../organisms';
import {SessionNumberIndicator} from '../../molecules';

const SessionListCard = ({
  logoFile,
  sessionList,
  changeActiveSession,
  openConnection,
  openEdition,
  openCreation,
  session,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const sessions = useMemo(() => sessionList, [sessionList]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  if (!Array.isArray(sessions) || sessions?.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <InfoBubble
          indication={I18n.t('Auth_InfoSession')}
          iconName="info"
          badgeColor={Colors.cautionColor}
          textIndicationStyle={styles.textIndicationStyle}
          style={styles.icon}
          position="left"
        />
        <SessionNumberIndicator number={sessionList?.length} />
        <Icon
          name="plus"
          style={styles.iconPlus}
          touchable={true}
          onPress={openCreation}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}>
        {sessions.map(_session => (
          <SessionCard
            key={_session.sessionId}
            session={_session}
            changeActiveSession={changeActiveSession}
            openConnection={openConnection}
            openEdition={openEdition}
            isUnactive={_session.sessionId !== session?.sessionId}
            logoFile={logoFile}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      maxHeight: Dimensions.get('window').height * 0.45,
      width: '100%',
    },
    scrollView: {
      width: '100%',
    },
    contentContainer: {
      alignItems: 'center',
      paddingHorizontal: '5%',
    },
    iconContainer: {
      alignSelf: 'flex-end',
      flexDirection: 'row',
      marginRight: 20,
    },
    icon: {
      marginHorizontal: 4,
    },
    details: {
      fontStyle: 'italic',
    },
    iconPlus: {
      marginHorizontal: 4,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.secondaryColor_dark.foreground,
      borderWidth: 2,
      borderColor: Colors.primaryColor.background,
      borderRadius: Dimensions.get('window').width * 0.07,
      width: Dimensions.get('window').width * 0.07,
      height: Dimensions.get('window').width * 0.07,
    },
    textIndicationStyle: {
      width: Dimensions.get('window').width * 0.65,
    },
  });

export default SessionListCard;
