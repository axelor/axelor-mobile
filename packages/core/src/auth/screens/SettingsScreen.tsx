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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Icon,
  Picker,
  RightIconButton,
  Screen,
  ScrollView,
  SwitchCard,
  Text,
  useThemeColor,
  GroupedCard,
} from '@axelor/aos-mobile-ui';
import {useSelector} from '../../redux/hooks';
import {useTranslator} from '../../i18n';
import {useStorageUpdater} from '../../hooks';
import {SettingsElt, SettingsItemType, useSettings} from '../settings';

const SettingsScreen = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  useStorageUpdater();

  const {switchItems, pickerItems, buttonItems} = useSettings();
  const {appVersion, baseUrl} = useSelector(state => state.auth);

  const renderSettingsItem = useCallback(
    (item: SettingsElt) => {
      switch (item.type) {
        case SettingsItemType.picker:
          return (
            <Picker
              key={item.key}
              title={item.title}
              defaultValue={item.defaultValue}
              listItems={item.listItems}
              labelField={item.labelField}
              valueField={item.valueField}
              onValueChange={item.onValueChange}
              emptyValue={item.emptyValue ?? false}
            />
          );
        case SettingsItemType.switch:
          return (
            <SwitchCard
              key={item.key}
              title={item.title}
              defaultValue={item.defaultValue}
              onToggle={item.onToggle}
              style={styles.switchCard}
              showWrapper={false}
            />
          );
        case SettingsItemType.button:
          return (
            <RightIconButton
              key={item.key}
              title={item.title}
              icon={
                <Icon
                  name="chevron-right"
                  color={Colors.primaryColor.background}
                />
              }
              style={styles.button}
              onPress={item.onPress}
              showWrapper={false}
            />
          );
        default:
          return null;
      }
    },
    [Colors],
  );

  return (
    <Screen removeSpaceOnTop>
      <ScrollView>
        <GroupedCard
          title={I18n.t('Auth_Preferences')}
          style={styles.preferencesCard}
          data={pickerItems}
          renderItem={renderSettingsItem}
        />
        <GroupedCard data={switchItems} renderItem={renderSettingsItem} />
        <GroupedCard data={buttonItems} renderItem={renderSettingsItem} />
      </ScrollView>
      <View style={styles.footerContainer}>
        <Text
          writingType="important"
          fontSize={12}>{`${I18n.t('Base_ConnectedOn')}:`}</Text>
        <Text fontSize={12} numberOfLines={1}>
          {baseUrl}
        </Text>
        <Text fontSize={12}>
          {I18n.t('Base_Version', {appVersion: appVersion})}
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  preferencesCard: {
    zIndex: 1,
    elevation: 4,
  },
  switchCard: {
    alignSelf: 'center',
    borderWidth: 0,
    marginVertical: 0,
    height: undefined,
    minHeight: undefined,
  },
  button: {
    alignSelf: 'center',
    height: undefined,
    minHeight: undefined,
    width: '90%',
    marginHorizontal: 18,
    marginRight: 18,
    paddingLeft: 0,
    paddingRight: 0,
    paddingVertical: 0,
  },
  footerContainer: {
    alignItems: 'center',
    gap: 2,
    marginBottom: 2,
  },
});

export default SettingsScreen;
