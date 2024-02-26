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

import React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from '@axelor/aos-mobile-ui';
import {DashboardView} from '../../../../dashboards/view';
import {useSelector} from '../../../../index';

const DashboardsCard = ({style}) => {
  const {dashboardConfigs} = useSelector((state: any) => state.mobileDashboard);

  const renderDashboards = () => {
    return dashboardConfigs.map((dashboard, index) => {
      return <DashboardView dashboardId={dashboard.id} key={index} />;
    });
  };

  return <Card style={[styles.card, style]}>{renderDashboards()}</Card>;
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingRight: 16,
  },
});

export default DashboardsCard;
