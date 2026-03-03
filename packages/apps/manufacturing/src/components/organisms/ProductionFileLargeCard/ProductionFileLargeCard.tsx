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
import {AOSImage, useTranslator} from '@axelor/aos-mobile-core';
import {HtmlInput, Text, useThemeColor} from '@axelor/aos-mobile-ui';

interface MetaFileProps {
  id: number;
  fileName: string;
}

interface ProductionFileLargeCardProps {
  image?: MetaFileProps;
  description: string;
}

function ProductionFileLargeCard({
  image,
  description,
}: ProductionFileLargeCardProps) {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <AOSImage
          metaFile={image}
          defaultIconSize={Dimensions.get('window').width * 0.4}
          imageSize={styles.imageStyle}
          resizeMode="contain"
          enableImageViewer={true}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.text}>{I18n.t('Base_Description')}</Text>
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
    marginVertical: 10,
    marginHorizontal: 20,
  },
  descriptionContainer: {
    padding: 10,
    maxHeight: Dimensions.get('window').width * 0.4,
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
  },
  text: {
    textTransform: 'uppercase',
  },
});

export default ProductionFileLargeCard;
