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
import {DropdownMenu, DropdownMenuItem} from '@axelor/aos-mobile-ui';
import {HeaderOptionMenuItem} from '../../molecules';
import {useBasicActions} from '../../../header';

const SMALLEST_WINDOW_WIDTH = 300;

const HeaderOptionsMenu = ({
  model,
  modelId,
  actions = [],
  disableMailMessages,
  disableJsonFields,
  attachedFileScreenTitle,
  barcodeFieldname,
}) => {
  const {
    mailMessagesAction,
    attachedFilesAction,
    barcodeAction,
    jsonFieldsAction,
  } = useBasicActions({
    model,
    modelId,
    disableMailMessages,
    barcodeFieldname,
    disableJsonFields,
    attachedFileScreenTitle,
  });

  const collapseMenuItems = useMemo(
    () => Dimensions.get('window').width <= SMALLEST_WINDOW_WIDTH,
    [],
  );

  const MenuItem = useMemo(
    () => (collapseMenuItems ? DropdownMenuItem : HeaderOptionMenuItem),
    [collapseMenuItems],
  );

  const allActions = useMemo(
    () =>
      [
        attachedFilesAction,
        mailMessagesAction,
        barcodeAction,
        jsonFieldsAction,
        ...actions,
      ]
        .filter(_action => !_action.hideIf)
        .sort((a, b) => a.order - b.order),
    [
      actions,
      attachedFilesAction,
      barcodeAction,
      jsonFieldsAction,
      mailMessagesAction,
    ],
  );

  const headerActions = useMemo(
    () => allActions.filter(_action => _action.showInHeader).slice(0, 2),
    [allActions],
  );

  const menuActions = useMemo(
    () =>
      allActions.filter(
        _action => !headerActions.some(_header => _header.key === _action.key),
      ),
    [allActions, headerActions],
  );

  const HeaderItemList = useMemo(
    () =>
      headerActions.map((_action, index) => (
        <MenuItem
          key={_action.key + index}
          icon={_action.iconName}
          color={_action.iconColor}
          indicator={_action.indicator}
          placeholder={_action.title}
          FontAwesome5={_action.FontAwesome5}
          hideIf={_action.hideIf}
          disableIf={_action.disableIf}
          onPress={_action.onPress}
        />
      )),
    [headerActions],
  );

  const MenuItemList = useMemo(
    () =>
      menuActions.map((_action, index) => (
        <DropdownMenuItem
          key={_action.key + index}
          icon={_action.iconName}
          indicator={_action.indicator}
          placeholder={_action.title}
          FontAwesome5={_action.FontAwesome5}
          hideIf={_action.hideIf}
          disableIf={_action.disableIf}
          onPress={_action.onPress}
        />
      )),
    [menuActions],
  );

  if (allActions.length === 0) {
    return null;
  }

  if (collapseMenuItems) {
    return (
      <View style={styles.container}>
        <DropdownMenu>{[...HeaderItemList, ...MenuItemList]}</DropdownMenu>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {HeaderItemList}
      {menuActions.length !== 0 && <DropdownMenu>{MenuItemList}</DropdownMenu>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});

export default HeaderOptionsMenu;
