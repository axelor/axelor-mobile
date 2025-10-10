/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActionCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import ConsumedProductCard from '../ConsumedProductCard/ConsumedProductCard';

interface ConsumedProductGlobalCardProps {
  productName: string;
  plannedQty: number;
  consumedQty?: number;
  missingQty?: number;
  availableQty?: number;
  unitName?: string;
  trackingNumber?: string;
  onPress: () => void;
  onMorePress: (qty: number) => void;
  disableMore: boolean;
  onLocationPress: () => void;
  onSubOfPress: () => void;
  isSubOF: boolean;
  stockMoveLineId: number;
}

const TIME_DISPLAY_INCREMENT = 2000;

const ConsumedProductGlobalCard = ({
  productName,
  plannedQty,
  consumedQty,
  missingQty,
  availableQty,
  unitName,
  trackingNumber = null,
  onPress,
  onMorePress,
  disableMore = false,
  onLocationPress,
  onSubOfPress,
  isSubOF = false,
  stockMoveLineId,
}: ConsumedProductGlobalCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [addedQty, setAddedQty] = useState(0);
  const [incrementVisible, setIncrementVisible] = useState(false);
  let timeOutIncrement = useRef<number>(null);

  const handleIncrement = () => {
    setIncrementVisible(true);
    setAddedQty(addedQty + 1);
  };

  const handleTimeOut = useCallback(() => {
    if (addedQty > 0) {
      onMorePress(addedQty);
      setIncrementVisible(false);
      setAddedQty(0);
    }
  }, [addedQty, onMorePress]);

  useEffect(() => {
    if (incrementVisible && addedQty > 0) {
      const id = setTimeout(handleTimeOut, TIME_DISPLAY_INCREMENT);
      timeOutIncrement.current = id;

      return () => {
        clearTimeout(timeOutIncrement.current);
      };
    }
  }, [handleTimeOut, incrementVisible, addedQty]);

  return (
    <ActionCard
      translator={I18n.t}
      actionList={[
        {
          iconName: 'geo-alt-fill',
          onPress: onLocationPress,
          large: !isSubOF,
          helper: I18n.t('Manufacturing_SeeAvailability'),
        },
        {
          iconName: 'diagram-3-fill',
          onPress: onSubOfPress,
          hidden: !isSubOF,
          helper: I18n.t('Manufacturing_SeeSubMO'),
        },
        {
          iconName: 'plus-lg',
          onPress: handleIncrement,
          hidden: disableMore,
          iconColor: Colors.primaryColor.background,
          large: true,
          helper: I18n.t('Manufacturing_IncrementQuantity'),
        },
      ]}
      forceActionsDisplay>
      <ConsumedProductCard
        productName={productName}
        plannedQty={plannedQty}
        consumedQty={consumedQty}
        missingQty={missingQty}
        availableQty={availableQty}
        unitName={unitName}
        trackingNumber={trackingNumber}
        onPress={onPress}
        increment={{addedQty, incrementVisible}}
        stockMoveLineId={stockMoveLineId}
      />
    </ActionCard>
  );
};

export default ConsumedProductGlobalCard;
