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

import React, {useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {NumberBubble, ToggleSwitch, useThemeColor} from '@axelor/aos-mobile-ui';
import {Equipment} from '../../../types';
import {
  fetchNumberClientEquipment,
  fetchNumberInterventionEquipment,
} from '../../../features/equipmentSlice';

const EquipmentModeSwitch = ({setMode}: {setMode: (data: any) => void}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {intervention} = useSelector(
    (state: any) => state.intervention_intervention,
  );
  const {totalNumberClientEquipment, totalNumberInterventionEquipment} =
    useSelector((state: any) => state.intervention_equipment);

  const idsInterventionEquipement = useMemo(
    () => intervention.equipmentSet.map(equipment => equipment.id),
    [intervention],
  );

  useEffect(() => {
    dispatch(
      (fetchNumberInterventionEquipment as any)({
        idsInterventionEquipement,
      }),
    );
    dispatch(
      (fetchNumberClientEquipment as any)({
        partnerId: intervention.deliveredPartner?.id,
      }),
    );
  }, [dispatch, idsInterventionEquipement, intervention.deliveredPartner?.id]);

  return (
    <ToggleSwitch
      leftTitle={I18n.t('Intervention_Intervention')}
      rightTitle={I18n.t('Intervention_Customer')}
      leftElement={
        <NumberBubble
          style={styles.indicator}
          number={totalNumberInterventionEquipment}
          color={Colors.primaryColor}
          isNeutralBackground={true}
        />
      }
      rigthElement={
        <NumberBubble
          style={styles.indicator}
          number={totalNumberClientEquipment}
          color={Colors.primaryColor}
          isNeutralBackground={true}
        />
      }
      onSwitch={() =>
        setMode(_mode =>
          _mode === Equipment.mode.intervention
            ? Equipment.mode.client
            : Equipment.mode.intervention,
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    right: 10,
  },
});

export default EquipmentModeSwitch;
