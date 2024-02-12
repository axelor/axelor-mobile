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

import React, {useState, useEffect, useMemo} from 'react';
import {InfoBubble, useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchAnomalies} from '../../../api/anomaly-api';
import {Anomaly} from '../../../types';

interface AnomalyBubbleProps {
  objectName: string;
  objectId: number;
  isIndicationDisabled?: boolean;
  indicatorPosition?: 'left' | 'right';
  size?: number;
  style?: any;
  textIndicationStyle?: any;
}

const AnomalyBubble = ({
  objectName,
  objectId,
  isIndicationDisabled = false,
  indicatorPosition,
  size,
  style,
  textIndicationStyle,
}: AnomalyBubbleProps) => {
  const Colors = useThemeColor();

  const [anomalyList, setAnomalyList] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetchAnomalies({objectName, objectId})
      .then(response => {
        let checks = [];
        let otherChecks = [];

        if (response?.data?.object?.checks) {
          checks = response?.data?.object?.checks;
        }
        if (response?.data?.object?.otherChecks) {
          otherChecks = response?.data?.object?.otherChecks?.flatMap(
            otherCheck => otherCheck.checks,
          );
        }

        if (isMounted) {
          setAnomalyList(Anomaly.sortType([...checks, ...otherChecks]));
        }
      })
      .catch(() => setAnomalyList([]));

    return () => {
      isMounted = false;
      setAnomalyList([]);
    };
  }, [objectName, objectId]);

  const displayAnomaly = useMemo(() => {
    if (Array.isArray(anomalyList) && anomalyList.length !== 0) {
      return anomalyList[0];
    } else {
      return null;
    }
  }, [anomalyList]);

  if (!displayAnomaly) {
    return null;
  }

  return (
    <InfoBubble
      style={style}
      textIndicationStyle={textIndicationStyle}
      iconName="exclamation-triangle-fill"
      badgeColor={Anomaly.getTypeColor(displayAnomaly.checkType, Colors)}
      indication={isIndicationDisabled ? null : displayAnomaly.message}
      size={size}
      position={indicatorPosition}
      coloredBubble={false}
    />
  );
};

export default AnomalyBubble;
