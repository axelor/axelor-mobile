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
import {MultiValuePicker} from '@axelor/aos-mobile-ui';
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';

type SetterFunction<T> = (value: T | ((_current: T) => T)) => void;

const TeamTaskFilters = ({
  setSelectedStatus,
  setSelectedPriority,
}: {
  setSelectedStatus: SetterFunction<any[]>;
  setSelectedPriority: SetterFunction<any[]>;
}) => {
  const I18n = useTranslator();
  const {TeamTask} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const statusSet = useMemo(
    () => getSelectionItems(TeamTask?.status),
    [TeamTask?.status, getSelectionItems],
  );
  const prioritySet = useMemo(
    () => getSelectionItems(TeamTask?.priority),
    [TeamTask?.priority, getSelectionItems],
  );

  return (
    <View style={styles.rowWrapper}>
      <MultiValuePicker
        style={styles.flex}
        listItems={statusSet}
        onValueChange={setSelectedStatus}
        placeholder={I18n.t('Team_Status')}
      />
      <MultiValuePicker
        style={styles.flex}
        listItems={prioritySet}
        onValueChange={setSelectedPriority}
        placeholder={I18n.t('Team_Priority')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    zIndex: 1,
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 5,
  },
  flex: {
    flex: 1,
  },
});

export default TeamTaskFilters;
