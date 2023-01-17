import React from 'react';
import {ImageBubble} from '@axelor/aos-mobile-ui';
import {useSelector} from 'react-redux';

interface AOSImageBubbleProps {
  imageSize?: number;
  style?: any;
  metaFileId: number;
  defaultIconSize?: number;
  listComponent?: any;
}

const AOSImageBubble = ({
  imageSize,
  style,
  metaFileId,
  defaultIconSize = 60,
  listComponent = [],
}: AOSImageBubbleProps) => {
  const {baseUrl} = useSelector((state: any) => state.auth);

  return (
    <ImageBubble
      style={style}
      source={
        metaFileId
          ? {
              uri: `${baseUrl}ws/rest/com.axelor.meta.db.MetaFile/${metaFileId}/content/download`,
            }
          : null
      }
      listComponent={listComponent}
      imageSize={imageSize}
      defaultIconSize={defaultIconSize}
    />
  );
};

export default AOSImageBubble;
