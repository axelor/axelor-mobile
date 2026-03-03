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

import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Screen} from '@axelor/aos-mobile-ui';
import {AOSImage} from '../components';
import {fetchModel} from '../api/model-api';

const BarcodeDisplayScreen = ({route}) => {
  const {model, modelId, barcodeFieldname} = route.params;

  const [object, setObject] = useState<any>(null);

  useEffect(() => {
    fetchModel({model, modelId})
      .catch(() => {
        setObject(null);
      })
      .then(data => setObject(data));
  }, [model, modelId]);

  return (
    <Screen style={styles.imageContainer}>
      <AOSImage
        generalStyle={styles.imageStyle}
        imageSize={styles.imageSize}
        resizeMode="contain"
        metaFile={object?.[barcodeFieldname]}
        defaultIconSize={Dimensions.get('window').width * 0.8}
        enableImageViewer={true}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageSize: {
    height: Dimensions.get('window').width * 0.8,
    width: Dimensions.get('window').width * 0.8,
  },
  imageStyle: {
    marginHorizontal: 20,
  },
});

export default BarcodeDisplayScreen;
