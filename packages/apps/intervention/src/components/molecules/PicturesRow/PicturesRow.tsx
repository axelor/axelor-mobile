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
import {PictureCard} from '../../atoms';

interface PicturesRowProps {
  style?: any;
  item: any;
  handleDelete: (itemId: number) => void;
  selectedImageId: any;
  onSelectImage: (itemId: any) => void;
}

const PicturesRow = ({
  style,
  item,
  handleDelete,
  selectedImageId,
  onSelectImage,
}: PicturesRowProps) => {
  const renderImage = picture => (
    <PictureCard
      style={style}
      item={picture.pictureFile}
      handleDelete={() => handleDelete(picture.id)}
      showDeleteIcon={selectedImageId === picture.pictureFile.id}
      onSelectImage={onSelectImage}
    />
  );

  return (
    <View style={styles.rowContainer}>
      {item.item1 && renderImage(item.item1)}
      {item.item2 && renderImage(item.item2)}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default PicturesRow;
