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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {Dashboard, WarningCard} from '@axelor/aos-mobile-ui';
import {headerActionsProvider} from '../../header';
import {useTranslator} from '../../i18n';
import {formatDateTime} from '../../utils';
import {createDashboardActionID} from '../display.helpers';
import {fetchDashboard} from '../api.helpers';
import {AOPChart} from '../component';

interface DashboardViewProps {
  dashboardId: number;
  isHeaderAction?: boolean;
  hideCardBackground?: boolean;
  displayLastUpdate?: boolean;
  chartWidth?: number;
}

export const DashboardView = ({
  dashboardId,
  isHeaderAction = false,
  hideCardBackground,
  displayLastUpdate = false,
  chartWidth,
}: DashboardViewProps) => {
  const I18n = useTranslator();

  const [dashboard, setDashboard] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const refresh = useCallback(() => {
    setLoading(true);
    fetchDashboard({id: dashboardId})
      .then(response => {
        setDashboard({...(response?.data?.object ?? {}), id: dashboardId});
        setLastUpdate(new Date());
      })
      .catch(() => setDashboard({}))
      .finally(() => setLoading(false));
  }, [dashboardId]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      refresh();
    }

    return () => {
      isMounted = false;
    };
  }, [refresh]);

  useEffect(() => {
    isHeaderAction &&
      headerActionsProvider.registerModel(
        createDashboardActionID(dashboardId),
        {
          actions: [
            {
              key: 'refreshConfig',
              order: 10,
              showInHeader: false,
              iconName: 'arrow-repeat',
              title: I18n.t('Base_Dashboard_RefreshConfig'),
              onPress: refresh,
            },
          ],
        },
      );
  }, [I18n, dashboardId, isHeaderAction, refresh]);

  const dashboardData = useMemo(() => {
    if (!Array.isArray(dashboard?.dashboardLineList)) {
      return [];
    }

    return dashboard?.dashboardLineList.map(elt => ({
      graphList: elt.chartList.map(ch => ({
        customChart: ch.metaActionName && (
          <AOPChart actionViewName={ch.metaActionName} />
        ),
        type: ch.chartType,
        dataList: [ch.valueList],
        title: ch?.chartName,
      })),
    }));
  }, [dashboard]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!Array.isArray(dashboardData) || dashboardData.length === 0) {
    return (
      <WarningCard errorMessage={I18n.t('Base_Dashboard_Misconfigured')} />
    );
  }

  return (
    <Dashboard
      lineList={dashboardData}
      hideCardBackground={hideCardBackground}
      translator={I18n.t}
      lastUpdate={formatDateTime(lastUpdate, I18n.t('Base_DateTimeFormat'))}
      displayLastUpdate={displayLastUpdate}
      chartWidth={chartWidth}
    />
  );
};
