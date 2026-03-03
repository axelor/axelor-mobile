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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Badge, Color, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

type StateBadgeType = 'done' | 'partially' | 'not';

type TypeConfig = {
  title: string;
  color: Color;
};

const StateBadge = ({
  style,
  title,
  type = 'not',
}: {
  style?: any;
  title: string;
  type?: StateBadgeType;
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const typeConfig: TypeConfig = useMemo(() => {
    const lowerCaseTitle = title.toLowerCase();

    switch (type) {
      case 'done':
        return {title, color: Colors.successColor};
      case 'partially':
        return {
          title: I18n.t('Sale_PartiallyState', {state: lowerCaseTitle}),
          color: Colors.cautionColor,
        };
      case 'not':
        return {
          title: I18n.t('Sale_NotState', {state: lowerCaseTitle}),
          color: Colors.errorColor,
        };
    }
  }, [Colors, I18n, title, type]);

  return (
    <Badge
      style={[styles.badge, style]}
      title={typeConfig.title}
      color={typeConfig.color}
    />
  );
};

const styles = StyleSheet.create({
  badge: {
    width: null,
    height: null,
    margin: null,
    paddingHorizontal: 5,
  },
});

export default StateBadge;
