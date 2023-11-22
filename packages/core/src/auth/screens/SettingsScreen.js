/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {Dashboard} from '@axelor/aos-mobile-ui';

const DemoResponse = {
  version: 2,
  name: 'Partner',
  dashboardLineList: [
    {
      name: 'Line 0',
      chartList: [
        {
          chartName: 'Number of SO by status',
          mobileChartValueResponseList: [
            {
              label: 'Canceled',
              value: 0,
            },
            {
              label: 'Draft quotation',
              value: 1,
            },
            {
              label: 'Finalized quotation',
              value: 3,
            },
            {
              label: 'Order completed',
              value: 0,
            },
            {
              label: 'Order confirmed',
              value: 9,
            },
          ],
        },
        {
          chartName: 'Sale order count by partner',
          mobileChartValueResponseList: [
            {
              label: 'T0001 - APOLLO',
              value: 1,
            },
            {
              label: 'T0002 - MICHEL Loic',
              value: 0,
            },
            {
              label: 'T0003 - GARCIA Daniel',
              value: 0,
            },
            {
              label: 'T0004 - DAVID Laurent',
              value: 0,
            },
            {
              label: 'T0005 - BLUEBERRY TELECOM',
              value: 1,
            },
            {
              label: 'T0006 - ROUSSEAU Élisabeth',
              value: 0,
            },
          ],
        },
      ],
    },
    {
      name: 'Line 1',
      chartList: [
        {
          chartName: 'Number of SO by status',
          mobileChartValueResponseList: [
            {
              label: 'Canceled',
              value: 0,
            },
            {
              label: 'Draft quotation',
              value: 1,
            },
            {
              label: 'Finalized quotation',
              value: 3,
            },
            {
              label: 'Order completed',
              value: 0,
            },
            {
              label: 'Order confirmed',
              value: 9,
            },
          ],
        },
        {
          chartName: 'Sale order count by partner',
          mobileChartValueResponseList: [
            {
              label: 'T0001 - APOLLO',
              value: 1,
            },
            {
              label: 'T0002 - MICHEL Loic',
              value: 0,
            },
            {
              label: 'T0003 - GARCIA Daniel',
              value: 0,
            },
            {
              label: 'T0004 - DAVID Laurent',
              value: 0,
            },
            {
              label: 'T0005 - BLUEBERRY TELECOM',
              value: 1,
            },
            {
              label: 'T0006 - ROUSSEAU Élisabeth',
              value: 0,
            },
          ],
        },
      ],
    },
    {
      name: 'Line 2',
      chartList: [
        {
          chartName: 'Number of SO by status',
          mobileChartValueResponseList: [
            {
              label: 'Canceled',
              value: 0,
            },
            {
              label: 'Draft quotation',
              value: 1,
            },
            {
              label: 'Finalized quotation',
              value: 3,
            },
            {
              label: 'Order completed',
              value: 0,
            },
            {
              label: 'Order confirmed',
              value: 9,
            },
          ],
        },

        {
          chartName: 'Sale order count by partner',
          mobileChartValueResponseList: [
            {
              label: 'T0001 - APOLLO',
              value: 1,
            },
            {
              label: 'T0002 - MICHEL Loic',
              value: 0,
            },
            {
              label: 'T0003 - GARCIA Daniel',
              value: 0,
            },
            {
              label: 'T0004 - DAVID Laurent',
              value: 0,
            },
            {
              label: 'T0005 - BLUEBERRY TELECOM',
              value: 1,
            },
            {
              label: 'T0006 - ROUSSEAU Élisabeth',
              value: 0,
            },
          ],
        },
        {
          chartName: 'Sale order count by partner',
          mobileChartValueResponseList: [
            {
              label: 'T0001 - APOLLO',
              value: 1,
            },
            {
              label: 'T0002 - MICHEL Loic',
              value: 0,
            },
            {
              label: 'T0003 - GARCIA Daniel',
              value: 0,
            },
            {
              label: 'T0004 - DAVID Laurent',
              value: 0,
            },
            {
              label: 'T0005 - BLUEBERRY TELECOM',
              value: 1,
            },
            {
              label: 'T0006 - ROUSSEAU Élisabeth',
              value: 0,
            },
          ],
        },
      ],
    },
    {
      name: 'Line 2',
      chartList: [
        {
          chartName: 'Sale order count by partner',
          mobileChartValueResponseList: [
            {
              label: 'T0001 - APOLLO',
              value: 1,
            },
            {
              label: 'T0002 - MICHEL Loic',
              value: 0,
            },
            {
              label: 'T0003 - GARCIA Daniel',
              value: 0,
            },
            {
              label: 'T0004 - DAVID Laurent',
              value: 0,
            },
            {
              label: 'T0005 - BLUEBERRY TELECOM',
              value: 1,
            },
            {
              label: 'T0006 - ROUSSEAU Élisabeth',
              value: 0,
            },
          ],
        },
      ],
    },
  ],
};

const SettingsScreen = ({children}) => {
  const demoRefactor = useMemo(() => {
    const lineList = DemoResponse.dashboardLineList.map(elt => {
      const dataList = elt.chartList.map((ch, index) => {
        if (index === 0) {
          return {
            type: 'line',
            dataList: [
              [
                {
                  label: 'Canceled',
                  value: 0,
                },
                {
                  label: 'Draft quotation',
                  value: 1,
                },
                {
                  label: 'Finalized quotation',
                  value: 3,
                },
                {
                  label: 'Order completed',
                  value: 0,
                },
                {
                  label: 'Order confirmed',
                  value: 9,
                },
              ],
              [
                {
                  label: 'Canceled',
                  value: 1,
                },
                {
                  label: 'Draft quotation',
                  value: 2,
                },
                {
                  label: 'Finalized quotation',
                  value: 3,
                },
                {
                  label: 'Order completed',
                  value: 4,
                },
                {
                  label: 'Order confirmed',
                  value: 9,
                },
              ],
            ],
            title: ch?.chartName,
          };
        } else {
          return {
            type: 'pie',
            dataList: [ch.mobileChartValueResponseList],
            title: ch?.chartName,
          };
        }
      });
      return {graphList: dataList};
    });

    return lineList;
  }, []);

  return <Dashboard lineList={demoRefactor} />;
};

export default SettingsScreen;
