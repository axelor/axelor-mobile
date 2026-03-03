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

import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useMetafileUri,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {getProductStockIndicators} from '../../../../api/product-api';

interface ProductCardProps {
  style?: any;
  productId: number;
  productVersion: number;
  name: string;
  code: string;
  picture: any;
  onPress: () => void;
}

const ProductCard = ({
  style,
  productId,
  productVersion,
  name,
  code,
  picture,
  onPress,
}: ProductCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatMetaFile = useMetafileUri();
  const isMounted = useRef(true);

  const {activeCompany} = useSelector(state => state.user.user);

  const [availableStock, setAvailableStock] = useState(null);

  useEffect(() => {
    isMounted.current = true;

    if (productId != null) {
      getProductStockIndicators({
        productId: productId,
        version: productVersion,
        companyId: activeCompany?.id,
        stockLocationId: null,
      })
        .then((res: any) => {
          if (isMounted.current) {
            setAvailableStock(res?.data?.object?.availableStock);
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setAvailableStock(null);
          }
        });
    }

    return () => {
      isMounted.current = false;
    };
  }, [activeCompany?.id, productId, productVersion]);

  return (
    <ObjectCard
      showArrow={true}
      onPress={onPress}
      style={style}
      image={{
        generalStyle: styles.imageStyle,
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: 60,
        source: formatMetaFile(picture?.id),
      }}
      upperTexts={{
        items: [
          {
            displayText: name,
            isTitle: true,
          },
          {displayText: code, style: styles.code},
        ],
      }}
      sideBadges={{
        items: [
          {
            displayText:
              availableStock == null
                ? I18n.t('Stock_Calculing')
                : availableStock > 0
                  ? I18n.t('Stock_Available')
                  : I18n.t('Stock_Unavailable'),
            color:
              availableStock == null
                ? Colors.secondaryColor
                : availableStock > 0
                  ? Colors.successColor
                  : Colors.errorColor,
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  imageSize: {
    height: 60,
    width: 60,
  },
  imageStyle: {
    marginRight: 30,
  },
  code: {
    fontSize: 12,
  },
});

export default ProductCard;
