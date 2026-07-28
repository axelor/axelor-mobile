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
import {NumberBubble, useThemeColor} from '@axelor/aos-mobile-ui';

const BADGE_SIZE = 30;

interface IndicatorProps {
  style?: any;
  indicator: number;
}

export const Indicator = ({style, indicator}: IndicatorProps) => {
  const Colors = useThemeColor();

  if (indicator == null) {
    return null;
  }

  return (
    <NumberBubble
      style={style}
      number={indicator}
      size={BADGE_SIZE}
      color={{
        background_light: Colors.backgroundColor,
        foreground: Colors.text,
        background: Colors.primaryColor.background,
      }}
      isNeutralBackground
    />
  );
};
