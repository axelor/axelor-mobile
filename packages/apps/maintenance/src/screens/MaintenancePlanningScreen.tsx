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
import {fetchPlannedMaintenanceRequests} from '../features/maintenanceRequestSlice';
import {
  MaintenancePlanningFilters,
  PlanningMaintenanceRequestCard,
} from '../components';

function MaintenancePlanningScreen() {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {planningList, loadingPlanning} = useSelector(
    state => state.maintenance_maintenanceRequest,
  );

  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<any>(null);

  const filteredList = useMemo(() => {
    if (planningList == null || planningList.length === 0) return [];
    const withTime = (date: string, time: string): string =>
      date.includes('T') ? date : `${date}T${time}`;

    return filterChip(planningList, selectedStatus, 'statusSelect')
      .filter((_r: any) => _r.requestDate != null)
      .map((_r: any) => ({
        id: _r.id,
        startDate: withTime(_r.requestDate, '00:00:00'),
        endDate: withTime(_r.doneOn ?? _r.expectedDate, '23:59:59'),
        data: {
          id: _r.id,
          equipementCode: _r.equipementMaintenance?.code,
          machineName: _r.machine?.name,
          requestBy: _r.requestBy?.fullName,
          actionSelect: _r.actionSelect,
          statusSelect: _r.statusSelect,
          userId: _r.requestBy?.id,
        },
      }));
  }, [planningList, selectedStatus]);

  const fetchItemsByMonth = useCallback(
    ({date, isAssigned}: any) => {
      dispatch(
        (fetchPlannedMaintenanceRequests as any)({
          date,
          isAssigned,
          userId: user.id,
          machineId: selectedMachine?.id,
        }),
      );
    },
    [dispatch, selectedMachine?.id, user.id],
  );

  const renderItem = useCallback(({id, data: request}: any) => {
    if (request == null) return null;

    return (
      <PlanningMaintenanceRequestCard
        key={id}
        statusSelect={request.statusSelect}
        equipementCode={request.equipementCode}
        machineName={request.machineName}
        requestBy={request.requestBy}
        actionSelect={request.actionSelect}
      />
    );
  }, []);

  const renderFullDayItem = useCallback(({id, data: request}: any) => {
    if (request == null) return null;

    return (
      <PlanningMaintenanceRequestCard
        key={id}
        statusSelect={request.statusSelect}
        equipementCode={request.equipementCode}
        machineName={request.machineName}
      />
    );
  }, []);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <MaintenancePlanningFilters
            selectedStatus={selectedStatus}
            onChangeStatus={setSelectedStatus}
            selectedMachine={selectedMachine}
            onChangeMachine={setSelectedMachine}
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

export default MaintenancePlanningScreen;
