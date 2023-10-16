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

import React, {useCallback, useEffect, useMemo} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from '../../../index';
import {InfoBubble, useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchAnomalies as _fetchAnomalies} from '../../../features/anomalySlice';
import {filterAnomaly} from '../../../utils';

const AnomalyBubble = ({
  objectName,
  objectId,
  indicatorPosition,
  size,
  style,
  indicatorStyle,
}) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {anomalyList} = useSelector(state => state.anomaly);

  const filteredAnomalyList = useMemo(
    () => filterAnomaly(anomalyList),
    [anomalyList],
  );

  const fetchAnomalies = useCallback(() => {
    dispatch(_fetchAnomalies({objectName, objectId}));
  }, [dispatch, objectId, objectName]);

  useEffect(() => {
    fetchAnomalies();
  }, [fetchAnomalies]);

  if (filteredAnomalyList.length === 0) {
    return null;
  }

  return (
    <View style={style}>
      <InfoBubble
        style={indicatorStyle}
        iconName="exclamation-triangle"
        badgeColor={
          filteredAnomalyList[0].checkType === 'error'
            ? Colors.errorColor
            : Colors.warningColor
        }
        indication={filteredAnomalyList[0].message}
        size={size}
        position={indicatorPosition}
        coloredBubble={false}
      />
    </View>
  );
};

export default AnomalyBubble;
