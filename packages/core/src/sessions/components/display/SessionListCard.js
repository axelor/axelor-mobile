/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {useThemeColor, Icon} from '@axelor/aos-mobile-ui';
import {SessionCard} from '../../components';

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

  const sessions = useMemo(() => sessionList, [sessionList]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          name="plus-lg"
          style={styles.iconPlus}
          touchable={true}
          onPress={openCreation}
        />
      </View>
      {!Array.isArray(sessions) || sessions?.length === 0 ? null : (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollView}>
          {sessions.map(_session => (
            <SessionCard
              key={_session.id}
              session={_session}
              changeActiveSession={changeActiveSession}
              openConnection={openConnection}
              openEdition={openEdition}
              isUnactive={_session.id !== session?.id}
              logoFile={logoFile}
            />
          ))}
        </ScrollView>
      )}
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
      margin: 4,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.secondaryColor_dark.foreground,
      borderWidth: 1,
      borderColor: Colors.primaryColor.background,
      borderRadius: 10,
      width: 30,
      height: 30,
    },
    textIndicationStyle: {
      width: Dimensions.get('window').width * 0.65,
    },
  });

export default SessionListCard;
