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

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, ProgressBar} from '@axelor/aos-mobile-ui';
import {useSelector, useTypes} from '@axelor/aos-mobile-core';
import {searchControlEntrySampleApi} from '../../../api';
import {ControlEntryHeader} from '../../atoms';
import {FillingMethodAlert} from '../../molecules';

const ControlEntryDetailsHeader = ({}) => {
  const [numberSampleFilled, setNumberSampleFilled] = useState<number>(0);
  const [showAlert, setShowAlert] = useState(false);
  const {ControlEntrySample} = useTypes();

  const {controlEntry} = useSelector((state: any) => state.controlEntry);

  useEffect(() => {
    searchControlEntrySampleApi({controlEntryId: controlEntry?.id})
      .then(response => {
        if (Array.isArray(response?.data?.data)) {
          const controlEntrySampleList: any[] = response.data.data;
          const total = controlEntrySampleList.length;
          const notControlled = controlEntrySampleList.filter(
            sample =>
              sample.resultSelect ===
              ControlEntrySample?.resultSelect.NotControlled,
          ).length;

          setNumberSampleFilled(100 - (notControlled / total) * 100);
        } else {
          setNumberSampleFilled(0);
        }
      })
      .catch(() => setNumberSampleFilled(0));
  }, [ControlEntrySample?.resultSelect, controlEntry]);

  return (
    <View style={styles.container}>
      <ControlEntryHeader />
      <View style={styles.row}>
        <ProgressBar
          value={numberSampleFilled}
          style={styles.progressBar}
          height={38}
        />
        <Button
          isNeutralBackground={true}
          iconName="clipboard2-fill"
          width="10%"
          style={styles.button}
          onPress={() => setShowAlert(true)}
        />
      </View>
      <FillingMethodAlert visible={showAlert} setVisible={setShowAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    width: '88%',
  },
  button: {
    height: 40,
    borderWidth: 1,
  },
});

export default ControlEntryDetailsHeader;
