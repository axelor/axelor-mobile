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
import {StyleSheet, View} from 'react-native';
import {
  DraggableWrapper,
  FloatingButton,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '../../../redux/hooks';
import {useNavigation} from '../../../hooks/use-navigation';
import {useActiveScreen} from '../../../navigator';
import {useTranslator} from '../../../i18n';
import {Tool, useModules} from '../../../app';
import {addDefaultValues, addModuleTools} from './tool.helpers';

const GlobalToolBox = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const {name, context} = useActiveScreen();
  const {modules} = useModules();
  const dispatch = useDispatch();

  const storeState = useSelector(state => state);

  const modulesActions: Tool[] = useMemo(
    () =>
      modules
        .filter(_m => _m.globalTools?.length > 0)
        .reduce(addModuleTools, [])
        .map(addDefaultValues),
    [modules],
  );

  const visibleActions = useMemo(() => {
    const data = {dispatch, storeState, screenContext: context};

    return modulesActions
      .filter(_a => !_a.hideIf(data))
      .sort((a, b) => a.order - b.order)
      .map(_a => ({
        key: _a.key,
        title: _a.title,
        color: Colors[_a.color],
        iconName: _a.iconName,
        disabled: _a.disabledIf(data),
        onPress: () => _a.onPress({...data, navigation}),
      }));
  }, [Colors, context, dispatch, modulesActions, navigation, storeState]);

  if (name == null) {
    return null;
  }

  return (
    <View style={styles.position} pointerEvents="box-none">
      <DraggableWrapper>
        <FloatingButton
          style={styles.buttonPosition}
          actions={visibleActions}
          translator={I18n.t}
        />
      </DraggableWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 9999,
  },
  buttonPosition: {
    position: 'relative',
    bottom: undefined,
    right: undefined,
  },
});

export default GlobalToolBox;
