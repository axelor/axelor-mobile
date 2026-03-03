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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LabelText, Text} from '@axelor/aos-mobile-ui';
import {AOSImage, checkNullString} from '@axelor/aos-mobile-core';
import {ProductCardDetails} from '../../../molecules';

interface ProductCardInfoProps {
  name: string;
  code: string;
  picture: any;
  trackingNumber?: string;
  locker?: string;
  onPress: () => void;
}

const ProductCardInfo = ({
  name,
  code,
  picture = null,
  trackingNumber = null,
  locker = null,
  onPress = () => {},
}: ProductCardInfoProps) => {
  return (
    <View style={styles.container}>
      <AOSImage
        generalStyle={styles.imageStyle}
        imageSize={styles.imageSize}
        resizeMode="contain"
        metaFile={picture}
        defaultIconSize={60}
      />
      <ProductCardDetails style={styles.textContainer} onPress={onPress}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.code}>{code}</Text>
        {!checkNullString(trackingNumber) && (
          <LabelText iconName="qr-code" size={15} title={trackingNumber} />
        )}
        {!checkNullString(locker) && (
          <LabelText iconName="geo-alt-fill" size={15} title={locker} />
        )}
      </ProductCardDetails>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  imageSize: {
    height: 60,
    width: 60,
  },
  imageStyle: {
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  code: {
    fontSize: 14,
  },
});

export default ProductCardInfo;
