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
import {Text, PopUp, useThemeColor, Icon} from '@axelor/aos-mobile-ui';

const PopupSession = ({
  popupIsOpen,
  sessionList,
  setPopupIsOpen,
  activeSession,
  delSession,
}) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);
  return (
    <PopUp visible={popupIsOpen} title={'Saved Sessions'}>
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
                <TouchableOpacity onPress={() => activeSession(sesion.name)}>
                  <Text>{sesion.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => delSession(sesion.name)}>
                  <Icon name="close" color="red" FontAwesome5={false} />
                </TouchableOpacity>
              </View>
              <Text>{sesion.url}</Text>
              <View style={styles.lineContainer}>
                <View style={styles.lineStyle} />
              </View>
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
      flexDirection: 'column',
      backgroundColor: Colors.primaryColor.background_light,
    },
    popupItemContainer: {
      flexDirection: 'column',
    },
    popupItemChildren: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export default PopupSession;
