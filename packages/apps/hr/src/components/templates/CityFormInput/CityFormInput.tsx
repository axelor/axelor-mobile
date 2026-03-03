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

import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {FormInput, InfoBubble, useThemeColor} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';

interface CityFormInputProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  required?: boolean;
}

const CityFormInputAux = ({
  style,
  title,
  defaultValue,
  onChange,
  readonly = false,
  required = false,
}: CityFormInputProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {showCityError} = useSelector(state => state.distance);

  return (
    <>
      <FormInput
        style={style}
        title={title}
        defaultValue={defaultValue}
        onChange={onChange}
        readOnly={readonly}
        required={required}
      />
      {showCityError && (
        <InfoBubble
          style={styles.infoBubble}
          textIndicationStyle={styles.infoIndicator}
          iconName="exclamation-lg"
          coloredBubble={false}
          badgeColor={Colors.errorColor}
          indication={I18n.t('Hr_CityNotFound')}
          position="left"
        />
      )}
    </>
  );
};

const CityFormInput = (props: CityFormInputProps) => (
  <CityFormInputAux {...props} />
);

const styles = StyleSheet.create({
  infoBubble: {
    position: 'absolute',
    bottom: 6,
    right: 30,
  },
  infoIndicator: {
    width: Dimensions.get('window').width * 0.8,
  },
});

export default CityFormInput;
