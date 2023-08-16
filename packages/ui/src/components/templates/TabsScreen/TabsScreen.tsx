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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {useThemeColor} from '../../../theme';
import {
  TabsPosition,
  TabsScreenProps,
  capitalizeFirstLetter,
} from './tabs.helper';
import Tab from './Tab';
import {useConfig} from '../../../config/ConfigContext';

const immersiveMode = async () => {
  await SystemNavigationBar.navigationHide();
};

const TabsScreen = ({
  style,
  viewStyle,
  position = TabsPosition.Top,
  tabHeight = 60,
  tabWidth = 100,
  items,
}: TabsScreenProps) => {
  const Colors = useThemeColor();

  const {showActivityIndicator} = useConfig();

  const [panels, setPanels] = useState(items?.filter(_tab => !_tab.hidden));

  useEffect(() => {
    immersiveMode();
  }, []);

  useEffect(() => {
    setPanels(current => {
      const activeTabKey = current.find(_item => _item.isActive)?.key;

      return items
        ?.filter(_tab => !_tab.hidden)
        .map(_item =>
          _item.key === activeTabKey
            ? {..._item, isActive: true}
            : {..._item, isActive: false},
        );
    });
  }, [items]);

  const swicthTab = useCallback((tabKey: number) => {
    setPanels(_current => {
      return _current.map(item =>
        item.key === tabKey
          ? {...item, isActive: true}
          : {...item, isActive: false},
      );
    });
  }, []);

  const getTabStyle = useCallback(
    () => ({
      [`border${capitalizeFirstLetter(
        position === TabsPosition.Top ? TabsPosition.Bottom : TabsPosition.Top,
      )}Width`]: 3,
      height: tabHeight,
      width: tabWidth,
    }),
    [position, tabHeight, tabWidth],
  );

  const tabsScroll = useMemo(() => {
    return (
      <View style={{height: tabHeight}}>
        <ScrollView horizontal={true}>
          {panels?.map(_item => (
            <Tab
              key={_item.key}
              title={_item.title}
              isActive={_item.isActive}
              disabled={_item.disabled}
              count={_item.count}
              showBadge={_item.showBadge}
              onPress={() => swicthTab(_item.key)}
              style={getTabStyle()}
            />
          ))}
        </ScrollView>
      </View>
    );
  }, [getTabStyle, panels, swicthTab, tabHeight]);

  const activeView = useMemo(() => {
    if (!Array.isArray(panels) || panels.length === 0) {
      return;
    }

    const activeTab = panels.filter(item => item.isActive)?.[0];

    if (activeTab == null) {
      swicthTab(panels[0].key);
      return;
    }

    return activeTab.view;
  }, [panels, swicthTab]);

  if (!Array.isArray(panels) || panels.length === 0) {
    return <View />;
  }

  return (
    <View
      pointerEvents={showActivityIndicator === true ? 'none' : 'auto'}
      style={[
        styles.container,
        {
          backgroundColor: Colors.screenBackgroundColor,
        },
        style,
      ]}>
      {position === TabsPosition.Top ? tabsScroll : null}
      <View style={[styles.view, viewStyle]}>{activeView}</View>
      {position === TabsPosition.Bottom ? tabsScroll : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '98%',
    width: Dimensions.get('window').width,
  },
  view: {
    height: '95%',
  },
});

export default TabsScreen;
