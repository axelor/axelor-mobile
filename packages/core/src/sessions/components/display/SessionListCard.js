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

import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useThemeColor, Icon, Text} from '@axelor/aos-mobile-ui';
import {SessionCard} from '../../components';
import {useTranslator} from '../../../i18n';

const SessionListCard = ({
  logoFile,
  sessionList,
  changeActiveSession,
  openConnection,
  openEdition,
  openCreation,
  session,
  handleRemoveSession = null,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const sessions = useMemo(() => sessionList, [sessionList]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={styles.container}>
      <View style={styles.addContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={openCreation}
          activeOpacity={0.8}>
          <Icon
            name="plus-lg"
            size={18}
            color={Colors.secondaryColor_dark.background_light}
          />
          <Text writingType="important" style={styles.addLabel}>
            {I18n.t('Base_Add')}
          </Text>
        </TouchableOpacity>
      </View>
      {!Array.isArray(sessions) || sessions?.length === 0 ? null : (
        <ScrollView>
          {sessions.map(_session => (
            <SessionCard
              key={_session.id}
              session={_session}
              changeActiveSession={changeActiveSession}
              openConnection={openConnection}
              openEdition={openEdition}
              isUnactive={_session.id !== session?.id}
              logoFile={logoFile}
              handleRemove={handleRemoveSession}
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
      width: '100%',
      height: '65%',
    },
    addContainer: {
      alignSelf: 'flex-end',
      marginRight: '5%',
      marginBottom: 8,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: Colors.backgroundColor,
      borderWidth: 1,
      borderColor: Colors.secondaryColor.background_light,
    },
    addLabel: {
      marginLeft: 8,
      color: Colors.secondaryColor_dark.background_light,
    },
  });

export default SessionListCard;
