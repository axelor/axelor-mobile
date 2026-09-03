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
import {CircleButton} from '../../molecules';
import {HeaderContainer} from '../../organisms';

interface AgendaHeaderProps {
  filters?: React.ReactNode;
  headerLeft?: React.ReactNode;
  showNavigation: boolean;
  showTodayButton: boolean;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
}

const AgendaHeader = ({
  filters,
  headerLeft,
  showNavigation,
  showTodayButton,
  onPreviousWeek,
  onNextWeek,
  onToday,
}: AgendaHeaderProps) => {
  const hasButtons = showNavigation || showTodayButton;

  if (filters == null && headerLeft == null && !hasButtons) return null;

  return (
    <HeaderContainer
      expandableFilter={false}
      fixedItems={filters}
      chipComponent={
        headerLeft == null && !hasButtons ? null : (
          <View style={styles.row}>
            {headerLeft != null && (
              <View style={styles.left}>{headerLeft}</View>
            )}
            <View style={styles.buttons}>
              {showNavigation && (
                <CircleButton
                  iconName="chevron-left"
                  size={30}
                  onPress={onPreviousWeek}
                  testID="agendaPreviousWeek"
                />
              )}
              {showTodayButton && (
                <CircleButton
                  iconName="calendar-event"
                  size={30}
                  onPress={onToday}
                  testID="agendaToday"
                />
              )}
              {showNavigation && (
                <CircleButton
                  iconName="chevron-right"
                  size={30}
                  onPress={onNextWeek}
                  testID="agendaNextWeek"
                />
              )}
            </View>
          </View>
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    paddingHorizontal: 18,
  },
  left: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

export default AgendaHeader;
