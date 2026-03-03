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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator, useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';
import {Picker} from '@axelor/aos-mobile-ui';

const PICKER_MODE = {
  startOn: 1,
  endOn: 2,
};

interface LeaveStartEndOnProps {
  startOn: number;
  endOn: number;
  onStartOnChange: (value: number) => void;
  onEndOnChange: (value: number) => void;
}

const LeaveStartEndOn = ({
  startOn,
  endOn,
  onStartOnChange,
  onEndOnChange,
}: LeaveStartEndOnProps) => {
  const I18n = useTranslator();
  const {LeaveRequest} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const leaveStartOnList = useMemo(
    () => getSelectionItems(LeaveRequest?.startOnSelect),
    [getSelectionItems, LeaveRequest?.startOnSelect],
  );

  const leaveEndOnList = useMemo(
    () => getSelectionItems(LeaveRequest?.endOnSelect),
    [getSelectionItems, LeaveRequest?.endOnSelect],
  );

  const renderPicker = useCallback(
    (mode: number) => {
      const isStartOn = mode === PICKER_MODE.startOn;

      return (
        <Picker
          style={styles.picker}
          placeholder={I18n.t(isStartOn ? 'Hr_StartOn' : 'Hr_EndOn')}
          listItems={isStartOn ? leaveStartOnList : leaveEndOnList}
          defaultValue={isStartOn ? startOn : endOn}
          onValueChange={value =>
            isStartOn ? onStartOnChange(value) : onEndOnChange(value)
          }
          labelField="title"
          valueField="key"
          emptyValue={false}
        />
      );
    },
    [
      I18n,
      leaveStartOnList,
      leaveEndOnList,
      startOn,
      endOn,
      onStartOnChange,
      onEndOnChange,
    ],
  );

  return (
    <View style={styles.container}>
      {renderPicker(PICKER_MODE.startOn)}
      {renderPicker(PICKER_MODE.endOn)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    zIndex: 1,
  },
  picker: {
    width: '48%',
  },
});

export default LeaveStartEndOn;
