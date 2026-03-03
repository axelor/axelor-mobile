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
import {View, StyleSheet} from 'react-native';
import {useThemeColor} from '../../../theme';

interface HorizontalRuleProps {
  style?: any;
}

const HorizontalRule = ({style}: HorizontalRuleProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  return <View testID="horizontalRule" style={[styles.line, style]} />;
};

const getStyles = Colors =>
  StyleSheet.create({
    line: {
      borderBottomColor: Colors.secondaryColor.background,
      borderBottomWidth: 1,
    },
  });

export default HorizontalRule;
