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
import {
  useMetafileUri,
  useTranslator,
  clipboardProvider,
} from '@axelor/aos-mobile-core';
import {
  ObjectCard,
  TextUnit,
  useDigitFormat,
  usePriceFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

interface ComplementaryProductCardProps {
  style?: any;
  optional: boolean;
  picture: any;
  name: string;
  code: string;
  qty: number;
  price: number;
  currency: string;
}

const ComplementaryProductCard = ({
  style,
  optional,
  picture,
  name,
  code,
  qty,
  price,
  currency,
}: ComplementaryProductCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const formatMetaFile = useMetafileUri();
  const formatNumber = useDigitFormat();
  const formatPrice = usePriceFormat();

  const styles = useMemo(() => {
    const color = optional ? Colors.secondaryColor : Colors.primaryColor;
    return getStyles(color.background);
  }, [Colors, optional]);

  return (
    <View style={style}>
      <ObjectCard
        style={styles.container}
        leftContainerFlex={2}
        showArrow={false}
        onPress={() => clipboardProvider.copyToClipboard(code)}
        image={{
          generalStyle: styles.imageSize,
          imageSize: styles.imageSize,
          resizeMode: 'contain',
          defaultIconSize: 50,
          source: formatMetaFile(picture?.id),
        }}
        upperTexts={{
          items: [
            {
              displayText: name,
              isTitle: true,
            },
            {
              displayText: code,
            },
          ],
        }}
        lowerTexts={{
          items: [
            {
              indicatorText: I18n.t('Sale_Quantity'),
              displayText: formatNumber(qty),
            },
          ],
        }}
        sideBadges={{
          items: [
            {
              customComponent: (
                <TextUnit value={formatPrice(price)} unit={currency} />
              ),
            },
          ],
        }}
      />
    </View>
  );
};

const getStyles = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '96%',
      alignSelf: 'center',
      marginVertical: 3,
      paddingRight: 5,
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
    imageSize: {
      height: 50,
      width: 50,
    },
  });

export default ComplementaryProductCard;
