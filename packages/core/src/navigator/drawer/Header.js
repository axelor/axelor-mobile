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
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {Text, useThemeColor} from '@axelor/aos-mobile-ui';
import DrawerToggleButton from './DrawerToggleButton';
import BackIcon from './BackIcon';
import {useTranslator} from '../../i18n';
import {HeaderOptionsMenu} from '../../components';
import {headerActionsProvider, useHeaderOptions} from '../../header';

const Header = ({mainScreen, title, actionID = null, shadedHeader = true}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {options} = useHeaderOptions(actionID);

  const headerOptions = useMemo(
    () => options || headerActionsProvider.getHeaderOptions(actionID),
    [actionID, options],
  );

  const styles = useMemo(() => getHeaderStyles(Colors), [Colors]);

  return (
    <View style={[styles.header, shadedHeader ? styles.shadedHeader : null]}>
      <View style={styles.options}>
        {mainScreen ? (
          <DrawerToggleButton tintColor={Colors.primaryColor.background} />
        ) : (
          <BackIcon tintColor={Colors.primaryColor.background} />
        )}
        <View>
          <Text fontSize={20} adjustsFontSizeToFit={true} numberOfLines={1}>
            {headerOptions?.headerTitle || I18n.t(title)}
          </Text>
        </View>
        {headerOptions != null ? (
          <HeaderOptionsMenu
            model={headerOptions.model}
            modelId={headerOptions.modelId}
            actions={headerOptions.actions}
            attachedFileScreenTitle={headerOptions.attachedFileScreenTitle}
            disableMailMessages={headerOptions.disableMailMessages}
          />
        ) : null}
      </View>
    </View>
  );
};

const getHeaderStyles = Colors =>
  StyleSheet.create({
    headerContianer: {
      position: 'absolute',
      top: 0,
      left: -16,
      width: Dimensions.get('screen').width,
    },
    headerTitle: {
      color: Colors.text,
      marginLeft: -14,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: Platform.OS === 'ios' ? -Dimensions.get('window').width * 0.5 : -15,
      backgroundColor: Colors.backgroundColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      height: 56,
    },
    shadedHeader: {
      elevation: 3,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 2},
    },
    options: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
    },
  });

export default Header;
