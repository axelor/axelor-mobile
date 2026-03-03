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
import {HeaderContainer, Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {
  clipboardProvider,
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {EquipmentDetailsHeader, InterventionDetailCard} from '../../components';
import {searchHistoryInterventionByEquipment} from '../../features/interventionSlice';

const EquipmentInterventionListScreen = ({}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const {Intervention} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {equipment} = useSelector((state: any) => state.intervention_equipment);
  const {
    loadingHistoryList,
    moreLoadingHistory,
    isListEndHistory,
    interventionHistoryList,
  } = useSelector((state: any) => state.intervention_intervention);
  const {user} = useSelector(state => state.user);

  const fetchEquipmentHistoryAPI = useCallback(
    (page = 0) => {
      dispatch(
        (searchHistoryInterventionByEquipment as any)({
          equipmentId: equipment?.id,
          statusList: getSelectionItems(Intervention?.statusSelect)?.map(
            status => status.value,
          ),
          page,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [
      Intervention?.statusSelect,
      dispatch,
      equipment?.id,
      getSelectionItems,
      user.activeCompany?.id,
    ],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<EquipmentDetailsHeader />}
      />
      <ScrollList
        loadingList={loadingHistoryList}
        data={interventionHistoryList}
        renderItem={({item}) => (
          <InterventionDetailCard
            intervention={item}
            isCopyCard={true}
            onPress={() => clipboardProvider.copyToClipboard(item.sequence)}
          />
        )}
        fetchData={fetchEquipmentHistoryAPI}
        moreLoading={moreLoadingHistory}
        isListEnd={isListEndHistory}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default EquipmentInterventionListScreen;
