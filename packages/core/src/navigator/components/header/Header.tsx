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

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {Text, useConfig, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {
  HeaderBandHelper,
  HeaderOptions,
  headerActionsProvider,
  useHeaderActions,
  useHeaderBand,
} from '../../../header';
import HeaderButton from './HeaderButton';
import HeaderOptionMenu from './HeaderOptionMenu';

const TIME_BEFORE_RETRY = 500;
const SMALL_SCREEN_LIMIT = 360;

interface HeaderProps {
  mainScreen?: boolean;
  title: string;
  actionID?: string;
  shadedHeader?: boolean;
}

const Header = ({
  mainScreen = false,
  title,
  actionID,
  shadedHeader = true,
}: HeaderProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  let timeOutRequestCall = useRef<number>(null);

  const {setHeaderHeight} = useConfig();
  const {allBands} = useHeaderBand();
  const {headers, genericHeaders} = useHeaderActions(actionID);

  const [options, setOptions] = useState<HeaderOptions>();
  const [containerHeight, setContainerHeight] = useState<number>();

  const visibleBands = useMemo(
    () => HeaderBandHelper.filterBands(allBands)?.length ?? 0,
    [allBands],
  );

  useEffect(() => {
    const height = containerHeight + visibleBands * HeaderBandHelper.bandHeight;

    if (!isNaN(height)) {
      setHeaderHeight(height);
    }
  }, [visibleBands, containerHeight, setHeaderHeight]);

  useEffect(() => {
    setOptions(headers);
  }, [headers]);

  useEffect(() => {
    const id = setTimeout(
      () => setOptions(headerActionsProvider.getHeaderOptions(actionID)),
      TIME_BEFORE_RETRY,
    );
    timeOutRequestCall.current = id;

    return () => clearTimeout(timeOutRequestCall.current);
  }, [actionID]);

  const styles = useMemo(() => getHeaderStyles(Colors), [Colors]);

  return (
    <View
      onLayout={event => {
        const {height} = event.nativeEvent.layout;
        setContainerHeight(height);
      }}
      style={[styles.header, shadedHeader ? styles.shadedHeader : null]}>
      <View style={styles.options}>
        <HeaderButton isRoot={mainScreen} />
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
      {options && (
        <HeaderOptionMenu {...options} genericActions={genericHeaders} />
      )}
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
      width: Dimensions.get('window').width,
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
