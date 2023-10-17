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

import React, {useCallback, useMemo} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  useDispatch,
  useSelector,
  useTranslator,
  displayItemFullname,
  isEmpty,
} from '@axelor/aos-mobile-core';
import {
  FormIncrementInput,
  FormInput,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

const DistanceIncrementAux = ({
  style = null,
  title = 'Helpdesk_Project',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {distance} = useSelector(state => state.distance);

  console.log('distance', distance);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const value = useMemo(() => {
    if (!isEmpty(distance)) {
      return Number(distance?.distance);
    } else {
      return defaultValue;
    }
  }, [defaultValue, distance]);

  if (readonly) {
    return (
      <FormInput
        style={style}
        title={I18n.t(title)}
        readOnly={true}
        defaultValue={displayItemFullname(defaultValue)}
      />
    );
  }

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null]}>
      <Text style={[styles.title]}>{I18n.t(title)}</Text>
      <FormIncrementInput
        title={title}
        onChange={onChange}
        defaultValue={value}
      />
    </View>
  );
};

const DistanceIncrement = ({
  style,
  title,
  defaultValue,
  onChange,
  readOnly,
  required,
}) => {
  return (
    <DistanceIncrementAux
      defaultValue={defaultValue}
      onChange={onChange}
      style={style}
      title={title}
      readonly={readOnly}
    />
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      zIndex: 41,
    },
    title: {
      marginHorizontal: 30,
    },
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
  });

export default DistanceIncrement;
