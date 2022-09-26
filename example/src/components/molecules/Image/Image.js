import React, {useState} from 'react';
import {Image as ReactNativeImage} from 'react-native';
import {useSelector} from 'react-redux';
import {useThemeColor} from '@aos-mobile/ui';
import {Icon} from '@/components/atoms';

const Image = ({
  imageSize,
  generalStyle,
  resizeMode,
  source,
  pictureId,
  defaultIconSize = 60,
}) => {
  const Colors = useThemeColor();
  const [isValid, setValid] = useState(true);
  const {baseUrl} = useSelector(state => state.auth);

  const handleURIError = () => {
    if (isValid) {
      setValid(false);
    }
  };

  if ((pictureId == null && source == null) || isValid === false) {
    return (
      <Icon
        name="camera"
        size={defaultIconSize}
        color={Colors.secondaryColor_light}
        style={generalStyle}
      />
    );
  }

  return (
    <ReactNativeImage
      onError={handleURIError}
      resizeMode={resizeMode}
      source={
        pictureId != null
          ? {
              uri: `${baseUrl}ws/rest/com.axelor.meta.db.MetaFile/${pictureId}/content/download`,
            }
          : source
      }
      style={[imageSize, generalStyle]}
    />
  );
};

export default Image;
