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

import React, {useCallback} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useSelector} from '@axelor/aos-mobile-core';
import {Button, Picker} from '@axelor/aos-mobile-ui';

const BUTTON_SIZE = 40;
const ARROW_TYPE = {
  Previous: 0,
  Next: 1,
};

interface SurveyRangeNavigationProps {
  selectedRangeId: number;
  onChangeRangeId: (rangeId: number) => void;
}

const SurveyRangeNavigation = ({
  selectedRangeId,
  onChangeRangeId,
}: SurveyRangeNavigationProps) => {
  const {rangeList} = useSelector((state: any) => state.intervention_question);

  const isArrowDisabled = useCallback(
    arrowType => {
      if (!Array.isArray(rangeList) || rangeList.length === 0) {
        return true;
      } else if (selectedRangeId == null) {
        return true;
      }

      const index =
        arrowType === ARROW_TYPE.Previous ? 0 : rangeList.length - 1;

      return (
        rangeList.findIndex(range => range.id === selectedRangeId) === index
      );
    },
    [rangeList, selectedRangeId],
  );

  const displayValue = item =>
    item?.equipment
      ? `${item?.equipment.name} - ${item.rangeVal?.title}`
      : item.rangeVal?.title;

  const handleChangeRange = (arrowType: number) => {
    const selectedRangeIdx = rangeList.findIndex(
      range => range.id === selectedRangeId,
    );

    let newRange = rangeList[0];
    if (arrowType === ARROW_TYPE.Previous) {
      newRange = rangeList[selectedRangeIdx - 1];
    } else {
      newRange = rangeList[selectedRangeIdx + 1];
    }
    onChangeRangeId(newRange.id);
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        iconName="chevron-left"
        onPress={() => handleChangeRange(ARROW_TYPE.Previous)}
        disabled={isArrowDisabled(ARROW_TYPE.Previous)}
      />
      <Picker
        style={styles.picker}
        listItems={rangeList}
        displayValue={displayValue}
        valueField="id"
        defaultValue={selectedRangeId}
        onValueChange={onChangeRangeId}
      />
      <Button
        style={styles.button}
        iconName="chevron-right"
        onPress={() => handleChangeRange(ARROW_TYPE.Next)}
        disabled={isArrowDisabled(ARROW_TYPE.Next)}
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
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    marginVertical: 0,
  },
  picker: {
    width: Dimensions.get('window').width * 0.9 - (2 * BUTTON_SIZE + 10),
  },
});

export default SurveyRangeNavigation;
