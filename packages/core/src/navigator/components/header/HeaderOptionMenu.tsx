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

import React, {useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {DropdownMenu, DropdownMenuItem} from '@axelor/aos-mobile-ui';
import {ActionType, GenericHeaderActions} from '../../../header';
import {useSelector} from '../../../redux/hooks';
import HeaderOptionMenuItem from './HeaderOptionMenuItem';

const SMALLEST_WINDOW_WIDTH = 300;

interface HeaderOptionMenuProps {
  model?: string;
  modelId?: number;
  actions?: ActionType[];
  genericActions?: GenericHeaderActions;
  options?: {[key: string]: any};
}

const HeaderOptionMenu = ({
  model,
  modelId,
  actions = [],
  genericActions = {},
  options,
}: HeaderOptionMenuProps) => {
  const {mobileSettings} = useSelector(state => state.appConfig);

  const collapseMenuItems = useMemo(
    () => Dimensions.get('window').width <= SMALLEST_WINDOW_WIDTH,
    [],
  );

  const MenuItem = useMemo(
    () => (collapseMenuItems ? DropdownMenuItem : HeaderOptionMenuItem),
    [collapseMenuItems],
  );

  const [visibleGenericActions, setVisibleGenericActions] = useState([]);

  useEffect(() => {
    const getVisibleGenericActions = async () => {
      const _genericActions = await Promise.all(
        Object.entries(genericActions).map(
          async ([key, func]) =>
            await func({
              model,
              modelId,
              options: options?.[key],
              config: mobileSettings?.apps,
            }),
        ),
      );
      setVisibleGenericActions(_genericActions ?? []);
    };

    getVisibleGenericActions();
  }, [genericActions, mobileSettings?.apps, model, modelId, options]);

  const allActions = useMemo(
    () =>
      [...actions, ...visibleGenericActions]
        .filter(_action => !_action.hideIf)
        .sort((a, b) => a.order - b.order),
    [actions, visibleGenericActions],
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
          hideIf={_action.hideIf}
          disableIf={_action.disableIf}
          onPress={_action.onPress}
          customComponent={_action.customComponent}
        />
      )),
    [MenuItem, headerActions],
  );

  const MenuItemList = useMemo(
    () =>
      menuActions.map((_action, index) => (
        <DropdownMenuItem
          key={_action.key + index}
          icon={_action.iconName}
          indicator={_action.indicator}
          placeholder={_action.title}
          hideIf={_action.hideIf}
          disableIf={_action.disableIf}
          onPress={_action.onPress}
          customComponent={_action.customComponent}
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});

export default HeaderOptionMenu;
