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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {Text, useConfig, useThemeColor} from '@axelor/aos-mobile-ui';
import DrawerToggleButton from './DrawerToggleButton';
import BackIcon from './BackIcon';
import {useTranslator} from '../../i18n';
import {HeaderOptionsMenu} from '../../components';
import {
  HeaderBandHelper,
  headerActionsProvider,
  useHeaderActions,
  useHeaderBand,
} from '../../header';

const TIME_BEFORE_RETRY = 500;
const SMALL_SCREEN_LIMIT = 360;

const Header = ({mainScreen, title, actionID = null, shadedHeader = true}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {setHeaderHeight} = useConfig();
  const {allBands} = useHeaderBand();

  let timeOutRequestCall = useRef();

  const {headers} = useHeaderActions(actionID);

  const [options, setOptions] = useState();
  const [containerHeight, setContainerHeight] = useState();

  const visibleBands = useMemo(() => {
    return HeaderBandHelper.filterBands(allBands)?.length ?? 0;
  }, [allBands]);

  useEffect(() => {
    const height = containerHeight + visibleBands * HeaderBandHelper.bandHeight;

    if (!isNaN(height)) {
      setHeaderHeight(height);
    }
  }, [visibleBands, containerHeight, setHeaderHeight]);

  useEffect(() => {
    setOptions(headers);
  }, [headers]);

  const handleTimeOut = useCallback(() => {
    setOptions(headerActionsProvider.getHeaderOptions(actionID));
  }, [actionID]);

  useEffect(() => {
    const id = setTimeout(handleTimeOut, TIME_BEFORE_RETRY);
    timeOutRequestCall.current = id;

    return () => {
      clearTimeout(timeOutRequestCall.current);
    };
  }, [handleTimeOut]);

  const styles = useMemo(() => getHeaderStyles(Colors), [Colors]);

  return (
    <View
      onLayout={event => {
        const {height} = event.nativeEvent.layout;
        setContainerHeight(height);
      }}
      style={[styles.header, shadedHeader ? styles.shadedHeader : null]}>
      <View style={styles.options}>
        {mainScreen ? (
          <DrawerToggleButton tintColor={Colors.primaryColor.background} />
        ) : (
          <BackIcon tintColor={Colors.primaryColor.background} />
        )}
        <View style={styles.titleContainer}>
          <Text
            style={styles.headerTitle}
            fontSize={20}
            numberOfLines={1}
            adjustsFontSizeToFit={
              Dimensions.get('window').width > SMALL_SCREEN_LIMIT
            }>
            {options?.headerTitle || I18n.t(title)}
          </Text>
        </View>
      </View>
      {options != null ? (
        <HeaderOptionsMenu
          model={options.model}
          modelId={options.modelId}
          actions={options.actions}
          attachedFileScreenTitle={options.attachedFileScreenTitle}
          disableMailMessages={options.disableMailMessages}
          barcodeFieldname={options.barcodeFieldname}
        />
      ) : null}
    </View>
  );
};

const getHeaderStyles = Colors =>
  StyleSheet.create({
    headerTitle: {
      color: Colors.text,
      marginLeft: -14,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: Platform.OS === 'ios' ? -Dimensions.get('window').width * 0.5 : -15,
      backgroundColor: Colors.backgroundColor,
      height: '100%',
      width: Dimensions.get('screen').width,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
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
      flex: 1,
    },
    titleContainer: {
      flex: 1,
    },
  });

export default Header;
