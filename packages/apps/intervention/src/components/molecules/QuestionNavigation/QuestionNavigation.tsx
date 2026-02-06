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
import {StyleSheet, View} from 'react-native';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';

interface QuestionNavigationProps {
  handleNavigatePrevious: () => void;
  handleNavigateNext: () => void;
  previousQuestionId: number;
  nextQuestionId: number;
}

const QuestionNavigation = ({
  handleNavigatePrevious,
  handleNavigateNext,
  previousQuestionId,
  nextQuestionId,
}: QuestionNavigationProps) => {
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        iconName="chevron-left"
        onPress={handleNavigatePrevious}
        color={Colors.infoColor}
        disabled={previousQuestionId == null}
      />
      <Button
        style={styles.button}
        iconName="chevron-right"
        onPress={handleNavigateNext}
        color={Colors.infoColor}
        disabled={nextQuestionId == null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%',
    gap: 10,
  },
  button: {
    height: 40,
    flex: 1,
    marginVertical: 5,
  },
});

export default QuestionNavigation;
