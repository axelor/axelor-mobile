import React from 'react';
import {ImageResizeMode, ImageStyle, StyleProp} from 'react-native';
import {Image} from '@aos-mobile/ui';
import {useSelector} from 'react-redux';

interface AOSImageProps {
  imageSize: StyleProp<ImageStyle>;
  generalStyle?: StyleProp<ImageStyle>;
  resizeMode: ImageResizeMode;
  metaFileId: number;
  defaultIconSize: number;
}

const AOSImage = ({
  imageSize,
  generalStyle,
  resizeMode,
  metaFileId,
  defaultIconSize = 60,
}: AOSImageProps) => {
  const {baseUrl} = useSelector((state: any) => state.auth);

  return (
    <Image
      imageSize={imageSize}
      generalStyle={generalStyle}
      resizeMode={resizeMode}
      source={{
        uri: `${baseUrl}ws/rest/com.axelor.meta.db.MetaFile/${metaFileId}/content/download`,
      }}
      defaultIconSize={defaultIconSize}
    />
  );
};

export default AOSImage;
