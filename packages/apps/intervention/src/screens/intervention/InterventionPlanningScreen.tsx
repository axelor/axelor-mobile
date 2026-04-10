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

import React, {useCallback, useMemo, useState} from 'react';
import {Screen, HeaderContainer} from '@axelor/aos-mobile-ui';
import {
  filterChip,
  PlanningView,
  useDispatch,
  useSelector,
} from '@axelor/aos-mobile-core';
import {fetchPlannedIntervention} from '../../features/interventionSlice';
import {
  InterventionPlanningFilters,
  PlanningInterventionCard,
} from '../../components';

function InterventionPlanningScreen({navigation}: any) {
  const dispatch = useDispatch();

  const {planningList, loadingPlanning} = useSelector(
    state => state.intervention_intervention,
  );
  const {user} = useSelector(state => state.user);

  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const filteredList = useMemo(() => {
    if (planningList == null || planningList.length === 0) return [];

    return filterChip(planningList, selectedStatus, 'statusSelect').map(
      (_i: any) => ({
        id: _i.id,
        startDate: _i.planifStartDateTime,
        endDate: _i.planifEndDateTime,
        data: {
          id: _i.id,
          sequence: _i.sequence,
          deliveredPartner: _i.deliveredPartner?.fullName,
          interventionType: _i.interventionType?.name,
          assignedTo: _i.assignedTo?.fullName,
          statusSelect: _i.statusSelect,
          userId: _i.assignedTo?.id,
        },
      }),
    );
  }, [planningList, selectedStatus]);

  const fetchItemsByMonth = useCallback(
    ({date, isAssigned}: any) => {
      dispatch(
        (fetchPlannedIntervention as any)({
          date,
          isAssigned,
          userId: user.id,
          deliveredPartnerId: selectedCustomer?.id,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, selectedCustomer?.id, user.activeCompany?.id, user.id],
  );

  const navigateToIntervention = useCallback(
    (interventionId: number) => {
      if (interventionId != null) {
        navigation.navigate('InterventionDetailsScreen', {interventionId});
      }
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({id, data: intervention}: any) => {
      if (intervention == null) return null;

      return (
        <PlanningInterventionCard
          key={id}
          onPress={() => navigateToIntervention(intervention.id)}
          statusSelect={intervention.statusSelect}
          sequence={intervention.sequence}
          deliveredPartner={intervention.deliveredPartner}
          interventionType={intervention.interventionType}
          assignedTo={intervention.assignedTo}
        />
      );
    },
    [navigateToIntervention],
  );

  const renderFullDayItem = useCallback(
    ({id, data: intervention}: any) => {
      if (intervention == null) return null;

      return (
        <PlanningInterventionCard
          key={id}
          onPress={() => navigateToIntervention(intervention.id)}
          statusSelect={intervention.statusSelect}
          sequence={intervention.sequence}
          deliveredPartner={intervention.deliveredPartner}
        />
      );
    },
    [navigateToIntervention],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <InterventionPlanningFilters
            selectedStatus={selectedStatus}
            onChangeStatus={setSelectedStatus}
            selectedCustomer={selectedCustomer}
            onChangeCustomer={setSelectedCustomer}
          />
        }
      />
      <PlanningView
        loading={loadingPlanning}
        itemList={filteredList}
        renderItem={renderItem}
        renderFullDayItem={renderFullDayItem}
        fetchbyMonth={fetchItemsByMonth}
        manageAssignment
        computeAssignmentLocally={false}
      />
    </Screen>
  );
}

export default InterventionPlanningScreen;
