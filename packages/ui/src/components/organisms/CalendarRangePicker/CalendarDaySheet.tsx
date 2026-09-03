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
import {StyleSheet, View} from 'react-native';
import {formatDateString} from '../../../utils';
import {useThemeColor} from '../../../theme';
import {BottomSheet, Button} from '../../molecules';
import {Text} from '../../atoms';

interface CalendarDaySheetProps {
  dateString?: string;
  events?: any[];
  canSelect: boolean;
  translator: (key: string) => string;
  renderEvent?: (event: any, closeSheet: () => void) => React.ReactNode;
  onSelect: () => void;
  onClose: () => void;
}

const CalendarDaySheet = ({
  dateString,
  events,
  canSelect,
  translator,
  renderEvent,
  onSelect,
  onClose,
}: CalendarDaySheetProps) => {
  const Colors = useThemeColor();

  const handleSelect = useCallback(() => {
    onClose();
    onSelect();
  }, [onClose, onSelect]);

  return (
    <BottomSheet
      visible={dateString != null}
      title={formatDateString(dateString!, translator('Base_DateFormat'))}
      onClose={onClose}>
      <View style={styles.container}>
        {events?.map((event, index) => (
          <View
            key={index}
            style={styles.event}
            testID={`calendarDaySheetEvent-${index}`}>
            {renderEvent?.(event, onClose)}
          </View>
        ))}
        {canSelect ? (
          <Button
            iconName="plus-lg"
            title={translator('Base_SelectThisDay')}
            onPress={handleSelect}
            style={styles.button}
          />
        ) : (
          <Text
            style={styles.fullDay}
            writingType="details"
            textColor={Colors.placeholderTextColor}>
            {translator('Base_Calendar_FullDay')}
          </Text>
        )}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
    gap: 10,
  },
  event: {
    width: '100%',
  },
  button: {
    marginTop: 5,
  },
  fullDay: {
    textAlign: 'center',
    paddingVertical: 5,
  },
});

export default CalendarDaySheet;
