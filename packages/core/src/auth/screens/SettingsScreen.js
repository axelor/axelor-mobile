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
import {BarChart} from 'react-native-gifted-charts';

const DemoResponse = {
  version: 2,
  name: 'Partner',
  dashboardLineList: [
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
            {
              label: 'T0007 - BLANC Bernard',
              value: 0,
            },
            {
              label: 'T0008 - MASSON SA',
              value: 0,
            },
            {
              label: 'T0009 - MASSON Xavier',
              value: 0,
            },
            {
              label: 'T0010 - SANCHEZ Catherine',
              value: 0,
            },
            {
              label: 'T0011 - GERARD Solutions',
              value: 2,
            },
            {
              label: 'T0012 - GERARD Fabrice',
              value: 0,
            },
            {
              label: 'T0013 - NGUYEN Xavier',
              value: 0,
            },
            {
              label: 'T0014 - 123 Services',
              value: 2,
            },
            {
              label: 'T0015 - ROGER Jean Marc',
              value: 0,
            },
            {
              label: 'T0016 - ROCHE Dominique',
              value: 0,
            },
            {
              label: 'T0017 - ROY Thierry',
              value: 0,
            },
            {
              label: 'T0018 - BOURGEOIS INDUSTRIE',
              value: 2,
            },
            {
              label: 'T0019 - BOURGEOIS Luc',
              value: 0,
            },
            {
              label: 'T0020 - ARAFI Zohra',
              value: 0,
            },
            {
              label: 'T0021 - CHARLES Jeannot',
              value: 0,
            },
            {
              label: 'T0022 - ESL Banking',
              value: 1,
            },
            {
              label: 'T0023 - GUILLOT Kévin',
              value: 0,
            },
            {
              label: 'T0024 - NOEL Jean Nicolas',
              value: 0,
            },
            {
              label: 'T0025 - MEUNIER Paul',
              value: 0,
            },
            {
              label: 'T0026 - TOP Components',
              value: 0,
            },
            {
              label: 'T0027 - ZHANG Annie',
              value: 0,
            },
            {
              label: 'T0028 - SILVER Electronics',
              value: 0,
            },
            {
              label: 'T0029 - LI Yang',
              value: 0,
            },
            {
              label: 'T0030 - SASAKI Components',
              value: 1,
            },
            {
              label: 'T0031 - SASAKI Amaya',
              value: 0,
            },
            {
              label: 'T0032 - DE KIMPE Engineering',
              value: 0,
            },
            {
              label: 'T0033 - DE KIMPE Joos',
              value: 0,
            },
            {
              label: 'T0034 - DG Technologies',
              value: 0,
            },
            {
              label: 'T0035 - DE GROOT Matthijs',
              value: 0,
            },
            {
              label: 'T0036 - AZ Inno',
              value: 1,
            },
            {
              label: 'T0037 - MULLER Jan',
              value: 0,
            },
            {
              label: 'T0038 - WM Cinetics',
              value: 1,
            },
            {
              label: 'T0039 - WILSON Charles',
              value: 0,
            },
            {
              label: 'T0040 - TGM Consulting',
              value: 0,
            },
            {
              label: 'T0041 - THOMPSON Kenneth',
              value: 0,
            },
            {
              label: 'T0042 - GARCIA Steven',
              value: 0,
            },
            {
              label: 'T0043 - MARTINEZ Edward',
              value: 0,
            },
            {
              label: 'T0044 - PICARD Anna',
              value: 1,
            },
            {
              label: 'T0045 - MEYER Philippe',
              value: 0,
            },
            {
              label: 'T0046 - MITCHELL Sandra',
              value: 0,
            },
            {
              label: 'T0047 - PARKER Laura',
              value: 0,
            },
            {
              label: 'T0048 - Axelor',
              value: 0,
            },
            {
              label: 'T0049 - MARQUES Yoann',
              value: 0,
            },
            {
              label: 'T0050 - ROBERT Lucy',
              value: 0,
            },
            {
              label: 'T0051 - RICHARD Lucas',
              value: 0,
            },
            {
              label: 'T0052 - SILVA Daniel',
              value: 0,
            },
            {
              label: 'T0053 - MARTIN Charles',
              value: 0,
            },
            {
              label: 'T0054 - DEMOERP Kevin',
              value: 0,
            },
            {
              label: 'T0055 - DEMOCRM Charles',
              value: 0,
            },
            {
              label: 'T0056 - RAYMOND Tony',
              value: 0,
            },
            {
              label: 'T0057 - LAMY Thomas',
              value: 0,
            },
            {
              label: 'T0058 - GIRAULT Anne',
              value: 0,
            },
            {
              label: 'T0059 - GEOFFROY Dimitri',
              value: 0,
            },
            {
              label: 'T0060 - DAVID Alex',
              value: 0,
            },
            {
              label: 'T0061 - ANDRE William',
              value: 0,
            },
            {
              label: 'T0062 - MAURIN David',
              value: 0,
            },
            {
              label: 'T0063 - MARCHAL Cyril',
              value: 0,
            },
            {
              label: 'T0064 - COSTA Robin',
              value: 0,
            },
            {
              label: 'T0065 - COLIN Romane',
              value: 0,
            },
            {
              label: 'T0066 - LOUIS Victoria',
              value: 0,
            },
            {
              label: 'T0067 - Admin',
              value: 0,
            },
            {
              label: 'T0068 - Demo',
              value: 0,
            },
            {
              label: 'T0069 - IFactor IFactor',
              value: 0,
            },
            {
              label: 'T0070 - admin-fr',
              value: 0,
            },
            {
              label: 'T0071 - TNT',
              value: 0,
            },
            {
              label: 'T0072 - La Poste',
              value: 0,
            },
            {
              label: 'T0073 - Mondial Relay',
              value: 0,
            },
            {
              label: 'T0074 - UPS',
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
      const dataList = elt.chartList.map(ch => {
        return {type: 'line', dataList: [ch.mobileChartValueResponseList]};
      });
      return {graph: dataList};
    });

    return lineList;
  }, []);

  return <Dashboard line={demoRefactor} />;
};

export default SettingsScreen;
