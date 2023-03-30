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
  LabelText,
  sliceString,
} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';

const PopupSession = ({
  popupIsOpen,
  sessionList,
  setPopupIsOpen,
  activeSession,
  delSession,
}) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);
  const I18n = useTranslator();
  return (
    <PopUp visible={popupIsOpen} title={I18n.t('Auth_Save_Session')}>
      <View style={styles.popupContainer}>
        {sessionList?.map((sesion, index) => {
          return (
            <View
              key={index}
              style={
                sesion.isActive
                  ? styles.popupItemContainerActive
                  : styles.popupItemContainer
              }>
              <View style={styles.popupItemChildren}>
                <TouchableOpacity onPress={() => activeSession(sesion.id)}>
                  <LabelText iconName="tag" title={sesion.id} />
                  <LabelText
                    iconName="link"
                    title={sliceString(sesion.url, 23)}
                  />
                  <View style={styles.lineContainer}>
                    <View style={styles.lineStyle} />
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => delSession(sesion.id)}>
                <Icon name="close" color="red" FontAwesome5={false} />
              </TouchableOpacity>
            </View>
          );
        })}
        <TouchableOpacity onPress={() => setPopupIsOpen(false)}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </PopUp>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    popupContainer: {
      flexDirection: 'column',
    },
    popupItemContainerActive: {
      flexDirection: 'row',
      backgroundColor: Colors.primaryColor.background_light,
      alignItems: 'center',
    },
    popupItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    popupItemChildren: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    lineContainer: {
      alignItems: 'center',
    },
    lineStyle: {
      borderWidth: 0.7,
      width: 280,
    },
  });

export default PopupSession;
