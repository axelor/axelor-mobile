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
import {
  ImageResizeMode,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import {Image} from '@axelor/aos-mobile-ui';
import {useSelector} from 'react-redux';
import {openFileInExternalApp} from '../../../tools/FileViewer';
import useTranslator from '../../../i18n/hooks/use-translator';

interface MetaFileProps {
  id: number;
  fileName: string;
}

interface AOSImageProps {
  imageSize: StyleProp<ImageStyle>;
  generalStyle?: StyleProp<ImageStyle>;
  resizeMode: ImageResizeMode;
  metaFile: MetaFileProps;
  defaultIconSize: number;
  enableImageViewer?: boolean;
}

const AOSImage = ({
  imageSize,
  generalStyle,
  resizeMode,
  metaFile,
  defaultIconSize = 60,
  enableImageViewer = false,
}: AOSImageProps) => {
  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);
  const I18n = useTranslator();

  const handleShowFile = async () => {
    await openFileInExternalApp(
      {fileName: metaFile?.fileName, id: metaFile?.id, isMetaFile: true},
      {baseUrl: baseUrl, token: token, jsessionId: jsessionId},
      I18n,
    );
  };

  return (
    <TouchableOpacity
      disabled={
        !enableImageViewer || metaFile?.id == null || metaFile?.fileName == null
      }
      onPress={handleShowFile}>
      <Image
        imageSize={imageSize}
        generalStyle={generalStyle}
        resizeMode={resizeMode}
        source={{
          uri: `${baseUrl}ws/rest/com.axelor.meta.db.MetaFile/${metaFile?.id}/content/download`,
        }}
        defaultIconSize={defaultIconSize}
      />
    </TouchableOpacity>
  );
};

export default AOSImage;
