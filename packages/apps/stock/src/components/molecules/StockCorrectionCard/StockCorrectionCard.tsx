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
  useNavigation,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';

interface StockCorrectionCardProps {
  style?: any;
  id: number;
  statusSelect: number;
  product: any;
  stockLocation: any;
  createdOn: string;
  validationDateT: string;
}

const StockCorrectionCard = ({
  style,
  id,
  statusSelect,
  product,
  stockLocation,
  createdOn,
  validationDateT,
}: StockCorrectionCardProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {StockCorrection} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const _formatDate = useMemo(() => {
    const date =
      statusSelect === StockCorrection?.statusSelect.Draft
        ? createdOn
        : validationDateT;

    if (date == null) return undefined;

    const _date = formatDate(date, I18n.t('Base_DateFormat'));

    if (statusSelect === StockCorrection?.statusSelect.Draft) {
      return `${I18n.t('Base_CreatedOn')} ${_date}`;
    }

    return `${I18n.t('Base_ValidatedOn')} ${_date}`;
  }, [
    statusSelect,
    StockCorrection?.statusSelect.Draft,
    createdOn,
    validationDateT,
    I18n,
  ]);

  return (
    <ObjectCard
      onPress={() =>
        navigation.navigate('StockCorrectionDetailsScreen', {
          stockCorrectionId: id,
        })
      }
      showArrow={true}
      borderLeftColor={
        getItemColor(StockCorrection?.statusSelect, statusSelect)?.background
      }
      style={style}
      lowerTexts={{
        items: [
          {displayText: product?.fullName, isTitle: true},
          {displayText: stockLocation?.name},
          {
            displayText: _formatDate,
            hideIfNull: true,
            style:
              statusSelect === StockCorrection?.statusSelect.Draft
                ? styles.creationDate
                : null,
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  creationDate: {
    fontStyle: 'italic',
  },
});

export default StockCorrectionCard;
