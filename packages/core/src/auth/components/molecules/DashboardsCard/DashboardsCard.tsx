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

import React, {useCallback, useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Card} from '@axelor/aos-mobile-ui';
import {DashboardView} from '../../../../dashboards';
import {useSelector} from '../../../../index';

const DashboardsCard = ({style}: {style?: any}) => {
  const {mobileSettings} = useSelector(state => state.appConfig);

  const dashboardIds = useMemo(
    () => mobileSettings?.dashboardIdList,
    [mobileSettings?.dashboardIdList],
  );

  const renderDashboards = useCallback(
    () =>
      dashboardIds.map((dashboardId: number, index: number) => (
        <DashboardView
          dashboardId={dashboardId}
          hideCardBackground
          chartWidth={Dimensions.get('window').width * 0.85}
          key={index}
        />
      )),
    [dashboardIds],
  );

  if (!Array.isArray(dashboardIds) || dashboardIds.length === 0) return null;

  return <Card style={[styles.card, style]}>{renderDashboards()}</Card>;
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingRight: 0,
    zIndex: 1,
  },
});

export default DashboardsCard;
