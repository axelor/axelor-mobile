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
import {Dimensions, StyleSheet, View} from 'react-native';
import {AOSImage} from '@axelor/aos-mobile-core';
import {HtmlInput, useThemeColor} from '@axelor/aos-mobile-ui';

interface MetaFileProps {
  id: number;
  fileName: string;
}

interface ProductionFileSmallCardProps {
  image?: MetaFileProps;
  description: string;
}

function ProductionFileSmallCard({
  image,
  description,
}: ProductionFileSmallCardProps) {
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      <AOSImage
        metaFile={image}
        defaultIconSize={Dimensions.get('window').width * 0.25}
        imageSize={styles.imageStyle}
        resizeMode="contain"
        enableImageViewer={true}
      />
      <View style={styles.description}>
        <HtmlInput
          defaultInput={description}
          readonly={true}
          editorBackgroundColor={Colors.screenBackgroundColor}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  imageStyle: {
    width: Dimensions.get('window').width * 0.25,
    height: Dimensions.get('window').width * 0.25,
  },
  description: {
    padding: 10,
    maxHeight: Dimensions.get('window').height * 0.12,
    width: Dimensions.get('window').width * 0.7,
  },
});

export default ProductionFileSmallCard;
