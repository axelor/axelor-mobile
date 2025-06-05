/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {MultiValuePicker, ToggleButton} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {fetchQualityImprovementStatus} from '../../../features/qualityImprovementSlice';

type SetterFunction = (value: any | ((_current: any) => any)) => void;

interface QualityImprovementFilterProps {
  isAssignedToMe: boolean;
  setIsAssignedToMe?: SetterFunction;
  setSelectedStatus?: SetterFunction;
  setSelectedGravity?: SetterFunction;
}

const QualityImprovementFilter = ({
  isAssignedToMe,
  setIsAssignedToMe,
  setSelectedStatus,
  setSelectedGravity,
}: QualityImprovementFilterProps) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const {getCustomSelectionItems, getSelectionItems} = useTypeHelpers();
  const {QualityImprovement} = useTypes();

  const {QIStatusList} = useSelector(state => state.quality_qualityImprovement);

  useEffect(() => {
    dispatch((fetchQualityImprovementStatus as any)());
  }, [dispatch]);

  const statusList = useMemo(
    () => getCustomSelectionItems(QIStatusList, 'name'),
    [QIStatusList, getCustomSelectionItems],
  );

  const gravityList = useMemo(() => {
    return getSelectionItems(QualityImprovement?.gravityTypeSelect);
  }, [QualityImprovement?.gravityTypeSelect, getSelectionItems]);

  return (
    <View style={styles.container}>
      <ToggleButton
        isActive={isAssignedToMe}
        onPress={() => setIsAssignedToMe((current: any) => !current)}
        buttonConfig={{
          iconName: 'person-fill',
          width: '10%',
          style: styles.toggleButton,
        }}
      />
      <MultiValuePicker
        style={styles.flexOne}
        listItems={statusList}
        onValueChange={setSelectedStatus}
        placeholder={I18n.t('Quality_Status')}
      />
      <MultiValuePicker
        style={styles.flexOne}
        listItems={gravityList}
        onValueChange={setSelectedGravity}
        placeholder={I18n.t('Quality_Gravity')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 5,
  },
  toggleButton: {
    height: 40,
    marginVertical: 0,
  },
  flexOne: {
    flex: 1,
  },
});

export default QualityImprovementFilter;
