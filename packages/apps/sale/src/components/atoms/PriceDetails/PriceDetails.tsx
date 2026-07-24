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
import {StyleSheet, View} from 'react-native';
import {
  Card,
  getCommonStyles,
  HorizontalRule,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

interface Line {
  title: string;
  value: number | string;
  unit: string;
  size?: number;
  showLine?: boolean;
  hideIf?: boolean;
}

export interface PriceDetailsProps {
  style?: any;
  lineList: Line[];
  topChildren?: any;
  bottomChildren?: any;
  isFormWrapper?: boolean;
}

const PriceDetails = ({
  style,
  lineList,
  topChildren,
  bottomChildren,
  isFormWrapper = false,
}: PriceDetailsProps) => {
  const Colors = useThemeColor();

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const _lineList = useMemo(
    () =>
      Array.isArray(lineList) && lineList.length > 0
        ? lineList.filter(line => !line.hideIf)
        : [],
    [lineList],
  );

  const Container = useMemo(
    () => (isFormWrapper ? View : Card),
    [isFormWrapper],
  );

  if (_lineList.length === 0) return null;

  return (
    <Container
      style={[
        isFormWrapper ? commonStyles.filter : undefined,
        styles.container,
        style,
      ]}>
      {topChildren}
      {_lineList.map((line, index) => (
        <View key={index}>
          {line.showLine && <HorizontalRule style={styles.rule} />}
          <View style={styles.line} key={index}>
            <Text fontSize={line.size}>{line.title}</Text>
            <Text fontSize={line.size}>{`${line.value} ${line.unit}`}</Text>
          </View>
        </View>
      ))}
      {bottomChildren}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingRight: 16,
    paddingVertical: 8,
  },
  rule: {
    marginVertical: 2,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
});

export default PriceDetails;
