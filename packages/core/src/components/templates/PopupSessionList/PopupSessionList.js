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
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Text,
  PopUp,
  useThemeColor,
  Icon,
  HorizontalRule,
} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';

const PopupSessionList = ({
  popupIsOpen,
  setPopupIsOpen,
  sessionList,
  changeActiveSession = () => {},
  removeSession = () => {},
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const sessions = useMemo(() => sessionList, [sessionList]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  if (!Array.isArray(sessions) || sessions?.length === 0) {
    return null;
  }

  return (
    <PopUp visible={popupIsOpen} title={I18n.t('Auth_Saved_Sessions')}>
      <View style={styles.popupContainer}>
        {sessions.map((_session, index) => {
          return (
            <View key={index} style={styles.popupItemContainer}>
              <View
                style={_session.isActive ? styles.itemActive : styles.item}
              />
              <View style={styles.popupItemChildren}>
                <TouchableOpacity
                  onPress={() => changeActiveSession(_session.id)}>
                  <Text style={styles.textTitle}>{_session.id}</Text>
                  <Text numberOfLines={1}>{_session.url}</Text>
                  <HorizontalRule style={styles.line} />
                </TouchableOpacity>
              </View>
              <Icon
                name="close"
                color="red"
                FontAwesome5={false}
                touchable={true}
                onPress={() => removeSession(_session.id)}
              />
            </View>
          );
        })}
        <View style={styles.closeBtn}>
          <TouchableOpacity onPress={() => setPopupIsOpen(false)}>
            <Text>{I18n.t('Auth_Close')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PopUp>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    popupContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    popupItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: '-4%',
      marginVertical: '2%',
    },
    popupItemChildren: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '120%',
      marginLeft: '5%',
    },
    textTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    line: {
      marginTop: 5,
    },
    closeBtn: {
      marginTop: '5%',
    },
    itemActive: {
      width: 7,
      height: 40,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: Colors.primaryColor.background_light,
    },
    item: {
      width: 7,
      height: 40,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: Colors.backgroundColor,
    },
  });

export default PopupSessionList;
