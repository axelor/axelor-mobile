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

import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Label, useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchAnomalies} from '../../../api/anomaly-api';
import {Anomaly} from '../../../types';

interface AnomalyListProps {
  objectName: string;
  objectId: number;
  style?: any;
}

const AnomalyList = ({objectName, objectId, style}: AnomalyListProps) => {
  const Colors = useThemeColor();

  const [anomalyList, setAnomalyList] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetchAnomalies({objectName, objectId})
      .then(response => {
        if (response?.data?.object?.checks) {
          const checks = response?.data?.object?.checks;

          if (isMounted) {
            setAnomalyList(Anomaly.sortType(checks));
          }
        }
      })
      .catch(() => setAnomalyList([]));

    return () => {
      isMounted = false;
    };
  }, [objectName, objectId]);

  if (!Array.isArray(anomalyList) || anomalyList.length === 0) {
    return null;
  }

  return (
    <FlatList
      style={[styles.container, style]}
      data={anomalyList}
      renderItem={({item}) => (
        <Label
          style={styles.label}
          message={item?.message}
          iconName="exclamation-triangle-fill"
          color={Anomaly.getTypeColor(item?.checkType, Colors)}
          showClose
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    paddingTop: 5,
  },
  label: {
    width: '96%',
    alignSelf: 'center',
    marginVertical: 5,
  },
});

export default AnomalyList;
