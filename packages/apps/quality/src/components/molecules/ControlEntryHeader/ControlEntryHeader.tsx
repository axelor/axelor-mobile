/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {
  isEmpty,
  useSelector,
  useTranslator,
  useDispatch,
  DateDisplay,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {
  Alert,
  Badge,
  ProgressBar,
  RadioSelect,
  Text,
  ToggleButton,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {ControlEntry} from '../../../types';
import {fetchControlEntryById} from '../../../features/controlEntrySlice';
import {searchControlEntrySampleApi} from '../../../api';

interface ControlEntryHeaderProps {
  controlEntryId: number;
}

const ControlEntryHeader = ({controlEntryId}: ControlEntryHeaderProps) => {
  const navigation = useNavigation();
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {controlEntry} = useSelector((state: any) => state.controlEntry);

  const [showAlert, setShowAlert] = useState(false);
  const [numberSampleFilled, setNumberSampleFilled] = useState<number>(0);
  const [selectedMode, setSelectedMode] = useState(null);

  useEffect(() => {
    dispatch((fetchControlEntryById as any)({controlEntryId: controlEntryId}));
  }, [controlEntryId, dispatch]);

  useEffect(() => {
    searchControlEntrySampleApi({controlEntryId: controlEntryId})
      .then(response => {
        if (Array.isArray(response?.data?.data)) {
          const controlEntrySampleList: any[] = response.data.data;
          const total = controlEntrySampleList.length;
          const notControlled = controlEntrySampleList.filter(
            sample =>
              sample.resultSelect === ControlEntry.sampleResult.NotControlled,
          ).length;

          setNumberSampleFilled(100 - (notControlled / total) * 100);
        } else {
          setNumberSampleFilled(0);
        }
      })
      .catch(() => setNumberSampleFilled(0));
  }, [controlEntryId]);

  if (controlEntry == null || isEmpty(controlEntry)) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text writingType="title">{controlEntry.name}</Text>
        <Badge
          color={ControlEntry.getStatusColor(controlEntry.statusSelect, Colors)}
          title={ControlEntry.getStatus(controlEntry.statusSelect, I18n)}
        />
      </View>
      <View style={styles.row}>
        <Text>{`${I18n.t('Quality_Sample')} : ${
          controlEntry.sampleCount
        }`}</Text>
        <DateDisplay date={controlEntry.entryDateTime} />
      </View>
      <Text>{`${I18n.t('Quality_ControlPlan')} : ${
        controlEntry.controlPlan?.name
      }`}</Text>
      <View style={styles.progressHeader}>
        <ProgressBar value={numberSampleFilled} style={styles.progressBar} />
        <ToggleButton
          activeColor={Colors.successColor}
          isActive={showAlert}
          onPress={() => setShowAlert(true)}
          buttonConfig={{
            iconName: 'clipboard2-fill',
            width: '10%',
            style: styles.toggleButton,
          }}
        />
      </View>
      <Alert
        visible={showAlert}
        cancelButtonConfig={{
          hide: false,
          width: '15%',
          styleTxt: {display: 'none'},
          onPress: () => {
            setShowAlert(false);
          },
        }}
        confirmButtonConfig={{
          hide: false,
          width: '15%',
          styleTxt: {display: 'none'},
          disabled: selectedMode == null,
          onPress: () => {
            setShowAlert(false);
            navigation.navigate('ControlEntryFormScreen', {
              controlEntryId: controlEntryId,
              selectedMode: selectedMode,
            });
          },
        }}>
        <RadioSelect
          direction="column"
          question="Filling method"
          itemStyle={styles.radioSelect}
          items={[
            {id: '1', title: 'By Sample'},
            {id: '2', title: 'By Characteristic'},
          ]}
          onChange={setSelectedMode}
        />
      </Alert>
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
    marginVertical: 2,
  },
  progressHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '3%',
  },
  progressBar: {
    width: '85%',
  },
  toggleButton: {
    height: 40,
    top: '-20%',
  },
  radioSelect: {
    height: 150,
  },
});

export default ControlEntryHeader;
