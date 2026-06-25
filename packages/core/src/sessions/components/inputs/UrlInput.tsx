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
import {StyleSheet} from 'react-native';
import {Icon, IconInput, LabelText, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';

interface UrlInputProps {
  style?: any;
  value?: string;
  onChange?: (_v?: string) => void;
  readOnly?: boolean;
  scanIconColor?: string;
  onScanPress?: () => void;
  onSelection?: () => void;
  onEndFocus?: () => void;
  showRequiredFields?: boolean;
  hidden?: boolean;
}

const UrlInput = ({
  style,
  value,
  onChange,
  readOnly = false,
  scanIconColor,
  onScanPress,
  onSelection,
  onEndFocus,
  showRequiredFields = false,
  hidden = false,
}: UrlInputProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  if (hidden) return null;

  if (readOnly) {
    return (
      <LabelText
        iconName="link-45deg"
        title={value}
        style={styles.labText}
        size={14}
      />
    );
  }

  return (
    <IconInput
      style={style}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={showRequiredFields}
      onSelection={onSelection}
      onEndFocus={onEndFocus}
      placeholder={I18n.t('Base_Connection_Url')}
      leftIconsList={[<Icon name="link-45deg" size={14} />]}
      rightIconsList={[
        <Icon
          name="qr-code-scan"
          size={14}
          color={scanIconColor ?? Colors.secondaryColor_dark.background}
          touchable={true}
          onPress={onScanPress}
        />,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  labText: {
    marginVertical: 10,
    marginLeft: 5,
  },
});

export default UrlInput;
