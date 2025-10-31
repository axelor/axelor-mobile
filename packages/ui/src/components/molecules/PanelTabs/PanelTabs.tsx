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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ThemeColors, useThemeColor} from '../../../theme';
import {Text} from '../../atoms';

export interface TabProps {
  key: number;
  title: string;
  isActive: boolean;
  disabled?: boolean;
  component: React.ReactNode;
  translator: (translationKey: string) => string;
}

const Tab = ({
  tabKey,
  title,
  isActive,
  disabled,
  onPress,
  translator,
}: {
  tabKey: number;
  title: string;
  isActive: boolean;
  disabled: boolean;
  onPress?: (tabKey: number) => void;
  translator: (translationKey: string) => string;
}) => {
  const Colors = useThemeColor();
  const handleChangeTab = useCallback(() => {
    return onPress(tabKey);
  }, [onPress, tabKey]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <TouchableOpacity
      onPress={handleChangeTab}
      disabled={disabled || isActive}
      style={[styles.tab, isActive ? styles.actifTab : styles.inactifTab]}
      activeOpacity={0.8}
      testID="tabTouchable">
      <Text
        style={isActive ? styles.boldTitle : null}
        fontSize={16}
        textColor={isActive ? Colors.primaryColor.background : Colors.text}>
        {translator(title)}
      </Text>
    </TouchableOpacity>
  );
};

const PanelTabs = ({tabs}: {tabs: TabProps[]}) => {
  const [panels, setPanels] = useState(tabs);
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const swicthTab = useCallback(
    (tabKey: number) => {
      setPanels(
        panels.map(item =>
          item.key === tabKey
            ? {...item, isActive: true}
            : {...item, isActive: false},
        ),
      );
    },
    [panels],
  );

  const panelComponent = useMemo(() => {
    return panels.filter(item => item.isActive)[0].component;
  }, [panels]);

  const tabsComponent = useMemo(() => {
    return panels.map(item => (
      <Tab
        key={item.key}
        tabKey={item.key}
        title={item.title}
        isActive={item.isActive}
        disabled={item.disabled}
        onPress={swicthTab}
        translator={item.translator}
      />
    ));
  }, [swicthTab, panels]);

  if (panels == null || panels?.length === 0) {
    return <View />;
  }

  return (
    <View style={styles.container} testID="panelTabsContainer">
      <View style={styles.tabs}>{tabsComponent}</View>
      <View style={styles.panel}>{panelComponent}</View>
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
    },
    tabs: {
      paddingTop: 10,
      paddingLeft: 20,
      flexDirection: 'row',
      backgroundColor: Colors.backgroundColor,
    },
    tab: {
      backgroundColor: Colors.screenBackgroundColor,
      paddingHorizontal: 25,
      marginHorizontal: 5,
      paddingVertical: 10,
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
      elevation: 3,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
    },
    boldTitle: {
      fontWeight: 'bold',
    },
    actifTab: {
      borderTopColor: Colors.primaryColor.background,
      borderTopWidth: 4,
    },
    inactifTab: {
      borderTopColor: Colors.screenBackgroundColor,
      borderTopWidth: 4,
    },
    panel: {
      backgroundColor: Colors.screenBackgroundColor,
      height: '100%',
    },
  });

export default PanelTabs;
