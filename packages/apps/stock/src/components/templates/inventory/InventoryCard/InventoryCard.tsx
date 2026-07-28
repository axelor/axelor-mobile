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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {ObjectCard} from '@axelor/aos-mobile-ui';
import {
  formatDate,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Inventory as InventoryType} from '../../../../types';

interface InventoryCardProps {
  style?: any;
  inventorySeq: string;
  statusSelect: number;
  stockLocation?: any;
  [key: string]: any;
  onPress: () => void;
}

const InventoryCard = ({
  style,
  inventorySeq,
  statusSelect,
  stockLocation,
  onPress,
  ...props
}: InventoryCardProps) => {
  const I18n = useTranslator();
  const {Inventory} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const _formatDate = useMemo(() => {
    const date = InventoryType.getDate({...props, statusSelect});
    if (date == null) return undefined;
    const _date = formatDate(date, I18n.t('Base_DateFormat'));

    if (statusSelect === Inventory?.statusSelect.Planned) {
      return `${I18n.t('Base_PlannedFor')} ${_date}`;
    }

    if (statusSelect === Inventory?.statusSelect.InProgress) {
      return `${I18n.t('Base_StartedOn')} ${_date}`;
    }

    if (statusSelect === Inventory?.statusSelect.Completed) {
      return `${I18n.t('Base_CompletedOn')} ${_date}`;
    }

    return `${I18n.t('Base_ValidatedOn')} ${_date}`;
  }, [
    I18n,
    Inventory?.statusSelect.Completed,
    Inventory?.statusSelect.InProgress,
    Inventory?.statusSelect.Planned,
    props,
    statusSelect,
  ]);

  return (
    <ObjectCard
      style={style}
      onPress={onPress}
      showArrow={false}
      leftContainerFlex={2}
      borderLeftColor={
        getItemColor(Inventory?.statusSelect, statusSelect)?.background
      }
      lowerTexts={{
        items: [
          {displayText: inventorySeq, isTitle: true},
          {
            displayText: stockLocation?.name,
            iconName: 'house',
            hideIfNull: true,
          },
          {
            displayText: _formatDate,
            style:
              statusSelect === Inventory?.statusSelect.Planned ||
              statusSelect === Inventory?.statusSelect.InProgress
                ? styles.date
                : null,
            hideIfNull: true,
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  date: {
    fontStyle: 'italic',
  },
});

export default InventoryCard;
