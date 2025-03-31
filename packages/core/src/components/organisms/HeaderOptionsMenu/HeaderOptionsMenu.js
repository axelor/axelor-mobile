/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {DropdownMenu, DropdownMenuItem} from '@axelor/aos-mobile-ui';
import {HeaderOptionMenuItem} from '../../molecules';
import {useBasicActions} from '../../../header';
import PopupPrintTemplate from '../PopupPrintTemplate/PopupPrintTemplate';
import PopupFilters from '../PopupFilters/PopupFilters';

const SMALLEST_WINDOW_WIDTH = 300;

const HeaderOptionsMenu = ({
  model,
  modelId,
  actions = [],
  genericActions = {},
  options,
  disableJsonFields,
  disablePrint,
  barcodeFieldname,
}) => {
  const {
    savedFiltersAction,
    barcodeAction,
    printAction,
    jsonFieldsAction,
    isTemplateSelectorVisible,
    areSavedFiltersVisible,
    closePrintTemplateSelector,
    closeSavedFiltersPopup,
    savedFilters,
    userFilters,
  } = useBasicActions({
    model,
    modelId,
    disablePrint,
    barcodeFieldname,
    disableJsonFields,
  });

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
      if (model && modelId) {
        const _genericActions = await Promise.all(
          Object.entries(genericActions).map(
            async ([key, func]) =>
              await func({model, modelId, options: options?.[key]}),
          ),
        );
        setVisibleGenericActions(_genericActions);
      } else {
        setVisibleGenericActions([]);
      }
    };

    getVisibleGenericActions();
  }, [genericActions, model, modelId, options]);

  const allActions = useMemo(
    () =>
      [
        printAction,
        savedFiltersAction,
        barcodeAction,
        jsonFieldsAction,
        ...actions,
        ...visibleGenericActions,
      ]
        .filter(_action => !_action.hideIf)
        .sort((a, b) => a.order - b.order),
    [
      actions,
      barcodeAction,
      jsonFieldsAction,
      savedFiltersAction,
      printAction,
      visibleGenericActions,
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

  const renderPopupPrintTemplate = useCallback(
    () =>
      isTemplateSelectorVisible ? (
        <PopupPrintTemplate
          visible={isTemplateSelectorVisible}
          onClose={closePrintTemplateSelector}
          model={model}
          modelId={modelId}
        />
      ) : null,
    [closePrintTemplateSelector, isTemplateSelectorVisible, model, modelId],
  );

  const renderPopupSavedFilters = useCallback(
    () =>
      areSavedFiltersVisible ? (
        <PopupFilters
          visible={areSavedFiltersVisible}
          onClose={closeSavedFiltersPopup}
          savedFilters={savedFilters}
          userFilters={userFilters}
        />
      ) : null,
    [closeSavedFiltersPopup, areSavedFiltersVisible, savedFilters, userFilters],
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
        {renderPopupPrintTemplate()}
        {renderPopupSavedFilters()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {HeaderItemList}
      {menuActions.length !== 0 && <DropdownMenu>{MenuItemList}</DropdownMenu>}
      {renderPopupPrintTemplate()}
      {renderPopupSavedFilters()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});

export default HeaderOptionsMenu;
