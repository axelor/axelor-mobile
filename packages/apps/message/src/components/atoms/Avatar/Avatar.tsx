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

import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useSelector} from '@axelor/aos-mobile-core';
import {Image, ThemeColors, useThemeColor} from '@axelor/aos-mobile-ui';

interface AvatarProps {
  style?: any;
  avatar: string;
}

const Avatar = ({style, avatar}: AvatarProps) => {
  const Colors = useThemeColor();
  const {baseUrl} = useSelector(state => state.auth);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={[styles.avatarContainer, style]}>
      <Image
        generalStyle={styles.avatar}
        defaultIconSize={25}
        resizeMode="contain"
        source={{uri: baseUrl + avatar}}
      />
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    avatarContainer: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    avatar: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.backgroundColor,
      borderRadius: Dimensions.get('window').width * 0.12,
      width: Dimensions.get('window').width * 0.12,
      height: Dimensions.get('window').width * 0.12,
    },
  });

export default Avatar;
