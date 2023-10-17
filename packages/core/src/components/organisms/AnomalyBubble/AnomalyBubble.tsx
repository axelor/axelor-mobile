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
import {View} from 'react-native';
import {InfoBubble, useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchAnomalies} from '../../../api/anomaly-api';
import {filterAnomaly} from '../../../utils';

interface AnomalyBubbleProps {
  objectName: string;
  objectId: number;
  isIndicationDisabled?: boolean;
  indicatorPosition?: 'left' | 'right';
  size?: number;
  style?: any;
  indicatorStyle?: any;
}

const AnomalyBubble = ({
  objectName,
  objectId,
  isIndicationDisabled = false,
  indicatorPosition,
  size,
  style,
  indicatorStyle,
}: AnomalyBubbleProps) => {
  const Colors = useThemeColor();

  const [anomalyList, setAnomalyList] = useState([]);

  useEffect(() => {
    fetchAnomalies({objectName, objectId}).then(response => {
      if (response?.data?.object?.checks) {
        const checks = response?.data?.object?.checks;
        const otherChecks = response?.data?.object?.otherChecks?.flatMap(
          otherCheck => otherCheck.checks,
        );
        setAnomalyList([...checks, ...otherChecks]);
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
    <View style={style}>
      <InfoBubble
        style={indicatorStyle}
        iconName="exclamation-triangle"
        badgeColor={
          filteredAnomalyList[0].checkType === 'error'
            ? Colors.errorColor
            : Colors.warningColor
        }
        indication={
          isIndicationDisabled ? null : filteredAnomalyList[0].message
        }
        size={size}
        position={indicatorPosition}
        coloredBubble={false}
      />
    </View>
  );
};

export default AnomalyBubble;
