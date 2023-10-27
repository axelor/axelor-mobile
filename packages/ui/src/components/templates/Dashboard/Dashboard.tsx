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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BarCharDashboard, PieChartDashboard} from '../../molecules';
import {ScrollView} from '../../atoms';

/*interface Data {
  value: number;
  color?: string;
  label: string;
}

interface Dataset {
  data: Data[];
}

interface Graph {
  type: 'pie' | 'bar' | 'ligne';
  dataList: Dataset;
}

interface Ligne {
  graph: Graph[];
}*/

interface DashboardProps {
  style?: any;
  //ligne: Ligne[];
}

const Dashboard = ({style}: DashboardProps) => {
  return (
    <ScrollView style={styles.container}>
      <PieChartDashboard
        datasets={[
          {
            data: [
              {
                value: 25,
                color: '#FFDF00',
                label: 'Draft',
              },
              {
                value: 3,
                color: '#ffa500',
                label: 'Waiting',
              },
              {
                value: 1,
                color: '#008000',
                label: 'Validate',
              },
              {
                value: 1,
                color: '#ff0000',
                label: 'Refused',
              },
            ],
          },
        ]}
      />
      <PieChartDashboard
        datasets={[
          {
            data: [
              {
                value: 25,
                color: '#FFDF00',
                label: 'Draft',
              },
              {
                value: 3,
                color: '#ffa500',
                label: 'Waiting',
              },
              {
                value: 1,
                color: '#008000',
                label: 'Validate',
              },
              {
                value: 1,
                color: '#ff0000',
                label: 'Refused',
              },
            ],
          },
        ]}
      />
      <PieChartDashboard
        datasets={[
          {
            data: [
              {
                value: 25,
                color: '#FFDF00',
                label: 'Draft',
              },
              {
                value: 3,
                color: '#ffa500',
                label: 'Waiting',
              },
              {
                value: 1,
                color: '#008000',
                label: 'Validate',
              },
              {
                value: 1,
                color: '#ff0000',
                label: 'Refused',
              },
            ],
          },
        ]}
      />
      <PieChartDashboard
        datasets={[
          {
            data: [
              {
                value: 25,
                color: '#FFDF00',
                label: 'Draft',
              },
              {
                value: 3,
                color: '#ffa500',
                label: 'Waiting',
              },
              {
                value: 1,
                color: '#008000',
                label: 'Validate',
              },
              {
                value: 1,
                color: '#ff0000',
                label: 'Refused',
              },
            ],
          },
        ]}
      />
      <PieChartDashboard
        datasets={[
          {
            data: [
              {
                value: 25,
                color: '#FFDF00',
                label: 'Draft',
              },
              {
                value: 3,
                color: '#ffa500',
                label: 'Waiting',
              },
              {
                value: 1,
                color: '#008000',
                label: 'Validate',
              },
              {
                value: 1,
                color: '#ff0000',
                label: 'Refused',
              },
            ],
          },
        ]}
      />
      <BarCharDashboard
        datasets={[
          {
            data: [
              {value: 25, label: 'Draft', color: '#ff0000'},
              {value: 3, label: 'Waiting'},
              {value: 1, label: 'Validate'},
              {value: 1, color: '#ff0000', label: 'Refused'},
            ],
          },
        ]}
      />
      <BarCharDashboard
        datasets={[
          {
            data: [
              {value: 25, label: 'Draft', color: '#ff0000'},
              {value: 3, label: 'Waiting'},
              {value: 1, label: 'Validate'},
              {value: 1, color: '#ff0000', label: 'Refused'},
            ],
          },
        ]}
      />
      <BarCharDashboard
        datasets={[
          {
            data: [
              {value: 25, label: 'Draft', color: '#ff0000'},
              {value: 3, label: 'Waiting'},
              {value: 1, label: 'Validate'},
              {value: 1, color: '#ff0000', label: 'Refused'},
            ],
          },
        ]}
      />
      <BarCharDashboard
        datasets={[
          {
            data: [
              {value: 25, label: 'Draft', color: '#ff0000'},
              {value: 3, label: 'Waiting'},
              {value: 1, label: 'Validate'},
              {value: 1, color: '#ff0000', label: 'Refused'},
            ],
          },
        ]}
      />
      <BarCharDashboard
        datasets={[
          {
            data: [
              {value: 25, label: 'Draft', color: '#ff0000'},
              {value: 3, label: 'Waiting'},
              {value: 1, label: 'Validate'},
              {value: 1, color: '#ff0000', label: 'Refused'},
            ],
          },
        ]}
      />
      <BarCharDashboard
        datasets={[
          {
            data: [
              {value: 25, label: 'Draft', color: '#ff0000'},
              {value: 3, label: 'Waiting'},
              {value: 1, label: 'Validate'},
              {value: 1, color: '#ff0000', label: 'Refused'},
            ],
          },
        ]}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: null,
  },
});

export default Dashboard;
