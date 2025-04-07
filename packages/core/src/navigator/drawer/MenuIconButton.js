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
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, InfoBubble, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../i18n';
import {getCompatibilityError, isMenuIncompatible} from '../menu.helper';

const WIDTH = 54;
const HEIGHT = 54;
const DEFAULT_RADIUS = 8;
const ROUNDED_RADIUS = WIDTH / 2;

const MenuIconButton = ({
  style,
  icon,
  onPress,
  color,
  subtitle,
  rounded = false,
  disabled = false,
  compatibility,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const compatibilityError = useMemo(
    () => isMenuIncompatible(compatibility),
    [compatibility],
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || compatibilityError}
      activeOpacity={0.95}>
      <View
        style={[
          styles.container,
          {borderRadius: rounded ? ROUNDED_RADIUS : DEFAULT_RADIUS},
          {
            backgroundColor: disabled
              ? Colors.secondaryColor.background_light
              : color
              ? color
              : Colors.backgroundColor,
          },
          style,
        ]}>
        <Icon
          size={32}
          name={icon}
          color={
            disabled
              ? Colors.secondaryColor.background
              : Colors.secondaryColor_dark.background
          }
        />
        {compatibilityError && (
          <InfoBubble
            style={styles.infoBubble}
            usePopup={true}
            iconName="exclamation-triangle-fill"
            badgeColor={Colors.errorColor}
            textIndicationStyle={styles.textIndicationStyle}
            indication={getCompatibilityError(compatibility, I18n)}
          />
        )}
      </View>
      {subtitle && (
        <Text style={styles.moduleSubtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      width: WIDTH,
      height: HEIGHT,
      flexDirection: 'row',
      justifyContent: 'center',
      elevation: 2,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
      zIndex: 10,
    },
    moduleSubtitle: {
      fontSize: 10,
      maxWidth: 54,
      alignSelf: 'center',
    },
    infoBubble: {
      position: 'absolute',
      bottom: -10,
      right: -10,
    },
    textIndicationStyle: {
      width: Dimensions.get('window').width * 0.6,
      top: 0,
    },
  });

export default MenuIconButton;
