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
import {StyleSheet, View} from 'react-native';
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
import {ChipSelect, Picker} from '@axelor/aos-mobile-ui';
import {PartnerSearchBar, StockLocationSearchBar} from '../../templates';

const fromLocationScanKey = 'stock-from-location_stock-move-planning';
const toLocationScanKey = 'stock-to-location_stock-move-planning';

interface StockMovePlanningFiltersProps {
  selectedType?: number;
  onChangeType: (value: number) => void;
  selectedStatus: any[];
  onChangeStatus: (value: any[]) => void;
  fromStockLocation?: any;
  onChangeFromStockLocation: (value: any) => void;
  toStockLocation?: any;
  onChangeToStockLocation: (value: any) => void;
  partner?: any;
  onChangePartner: (value: any) => void;
}

const StockMovePlanningFilters = ({
  selectedType,
  onChangeType,
  selectedStatus,
  onChangeStatus,
  fromStockLocation,
  onChangeFromStockLocation,
  toStockLocation,
  onChangeToStockLocation,
  partner,
  onChangePartner,
}: StockMovePlanningFiltersProps) => {
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const typeList = useMemo(
    () => getSelectionItems(StockMove?.typeSelect),
    [StockMove?.typeSelect, getSelectionItems],
  );

  const isInternal = useMemo(
    () => selectedType === StockMove?.typeSelect.internal,
    [StockMove?.typeSelect.internal, selectedType],
  );

  const isOutgoing = useMemo(
    () => selectedType === StockMove?.typeSelect.outgoing,
    [StockMove?.typeSelect.outgoing, selectedType],
  );

  const isIncoming = useMemo(
    () => selectedType === StockMove?.typeSelect.incoming,
    [StockMove?.typeSelect.incoming, selectedType],
  );

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        placeholder={I18n.t('Stock_MoveType')}
        listItems={typeList}
        defaultValue={selectedType}
        valueField="key"
        labelField="title"
        onValueChange={onChangeType}
      />
      {selectedType != null && (
        <View style={styles.row}>
          <StockLocationSearchBar
            style={styles.halfRow}
            placeholderKey={isIncoming ? 'Stock_Destination' : 'Stock_Source'}
            defaultValue={isIncoming ? toStockLocation : fromStockLocation}
            onChange={
              isIncoming ? onChangeToStockLocation : onChangeFromStockLocation
            }
            scanKey={isIncoming ? toLocationScanKey : fromLocationScanKey}
          />
          {isInternal ? (
            <StockLocationSearchBar
              style={styles.halfRow}
              placeholderKey="Stock_Destination"
              defaultValue={toStockLocation}
              onChange={onChangeToStockLocation}
              scanKey={toLocationScanKey}
              secondFilter={true}
            />
          ) : (
            <PartnerSearchBar
              style={styles.halfRow}
              defaultValue={partner}
              onChange={onChangePartner}
              title={isOutgoing ? 'Stock_Customer' : 'Stock_Supplier'}
              partnerType={isIncoming ? 'supplier' : undefined}
            />
          )}
        </View>
      )}
      <ChipSelect
        mode="multi"
        chipNumberOfLines={1}
        onChangeValue={onChangeStatus}
        selectionItems={getSelectionItems(
          StockMove?.statusSelect,
          selectedStatus,
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  picker: {
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    width: '90%',
    gap: 5,
  },
  halfRow: {
    flex: 1,
  },
});

export default StockMovePlanningFilters;
