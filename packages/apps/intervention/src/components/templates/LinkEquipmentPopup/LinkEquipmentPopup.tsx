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

import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Alert, AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {linkEquipment} from '../../../features/interventionSlice';
import {searchEquipmentToLink} from '../../../features/equipmentSlice';

const LinkEquipmentPopup = ({
  style,
  visible,
  onClose,
}: {
  style?: any;
  visible: boolean;
  onClose: () => void;
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {intervention} = useSelector(
    (state: any) => state.intervention_intervention,
  );
  const {
    loadingListEquipToLink,
    moreLoadingEquipToLink,
    isListEndEquipToLink,
    equipmentToLinkList,
  } = useSelector((state: any) => state.intervention_equipment);

  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const searchEquipmentAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchEquipmentToLink as any)({
          page,
          searchValue,
          equipmentSet: intervention.equipmentSet.map(
            equipment => equipment.id,
          ),
          partnerId: intervention.deliveredPartner?.id,
        }),
      );
    },
    [dispatch, intervention],
  );

  const handleLinkEquipment = useCallback(() => {
    dispatch(
      (linkEquipment as any)({
        interventionId: intervention.id,
        interventionVersion: intervention.version,
        equipmentId: selectedEquipment?.id,
      }),
    );
    setSelectedEquipment(null);
    onClose();
  }, [
    dispatch,
    intervention.id,
    intervention.version,
    onClose,
    selectedEquipment?.id,
  ]);

  return (
    <Alert
      style={style}
      visible={visible}
      cancelButtonConfig={{onPress: onClose}}
      confirmButtonConfig={{
        title: I18n.t('Base_Add'),
        onPress: handleLinkEquipment,
        disabled: selectedEquipment == null,
      }}
      translator={I18n.t}>
      <View style={styles.container}>
        <AutoCompleteSearch
          title={I18n.t('Intervention_Equipment')}
          objectList={equipmentToLinkList}
          value={selectedEquipment}
          onChangeValue={setSelectedEquipment}
          fetchData={searchEquipmentAPI}
          displayValue={displayItemName}
          placeholder={I18n.t('Intervention_Equipment')}
          showDetailsPopup={true}
          loadingList={loadingListEquipToLink}
          moreLoading={moreLoadingEquipToLink}
          isListEnd={isListEndEquipToLink}
        />
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
});

export default LinkEquipmentPopup;
