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
import {
  clipboardProvider,
  SearchListView,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {InterventionDetailCard, InterventionHeader} from '../../molecules';
import {fetchIntervention} from '../../../features/interventionSlice';

const HistoryView = ({}) => {
  const I18n = useTranslator();
  const {Intervention} = useTypes();

  const {user} = useSelector(state => state.user);
  const {loading, moreLoading, isListEnd, interventionList, intervention} =
    useSelector((state: any) => state.intervention_intervention);

  const sliceFunctionData = useMemo(
    () => ({
      deliveredPartnerId: intervention.deliveredPartner?.id,
      statusList: [Intervention?.statusSelect.Finished],
      companyId: user.activeCompany?.id,
    }),
    [
      Intervention?.statusSelect.Finished,
      intervention.deliveredPartner?.id,
      user.activeCompany?.id,
    ],
  );

  return (
    <SearchListView
      list={interventionList}
      loading={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      sliceFunction={fetchIntervention}
      sliceFunctionData={sliceFunctionData}
      searchPlaceholder={I18n.t('Base_Search')}
      headerTopChildren={<InterventionHeader intervention={intervention} />}
      renderListItem={({item}) => (
        <InterventionDetailCard
          intervention={item}
          isCopyCard={true}
          onPress={() => clipboardProvider.copyToClipboard(item.sequence)}
        />
      )}
    />
  );
};

export default HistoryView;
