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

import React, {useState, useEffect, useMemo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Label, useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchAnomalies} from '../../../api/anomaly-api';
import {filterAnomaly} from '../../../utils';

interface AnomalyListProps {
  objectName: string;
  objectId: number;
  style?: any;
}

const AnomalyList = ({objectName, objectId, style}: AnomalyListProps) => {
  const Colors = useThemeColor();

  const [anomalyList, setAnomalyList] = useState([]);

  useEffect(() => {
    fetchAnomalies({objectName, objectId}).then(response => {
      if (response?.data?.object?.checks) {
        const checks = response?.data?.object?.checks;
        setAnomalyList(checks);
      }
    });
  }, [objectName, objectId]);

  const filteredAnomalyList = useMemo(
    () => filterAnomaly(anomalyList),
    [anomalyList],
  );

  if (filteredAnomalyList.length === 0) {
    return null;
  }

  return (
    <FlatList
      style={style}
      data={filteredAnomalyList}
      renderItem={({item}) => (
        <Label
          style={styles.label}
          message={item?.message}
          iconName="exclamation-triangle"
          color={
            item?.checkType === 'error'
              ? Colors.errorColor
              : Colors.warningColor
          }
          showClose
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
  },
});

export default AnomalyList;
