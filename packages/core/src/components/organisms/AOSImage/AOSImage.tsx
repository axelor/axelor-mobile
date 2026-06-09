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

import React, {useCallback} from 'react';
import {
  ImageResizeMode,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import {Image} from '@axelor/aos-mobile-ui';
import {useFileApi} from '../../../apiProviders';
import {useMetafileUri} from '../../../utils';

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
  const fileApi = useFileApi();
  const formatMetaFileUri = useMetafileUri();

  const handleShowFile = useCallback(async () => {
    await fileApi.openInExternalApp({
      id: metaFile?.id,
      fileName: metaFile?.fileName,
    });
  }, [fileApi, metaFile?.fileName, metaFile?.id]);

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
        source={formatMetaFileUri(metaFile?.id)}
        defaultIconSize={defaultIconSize}
      />
    </TouchableOpacity>
  );
};

export default AOSImage;
