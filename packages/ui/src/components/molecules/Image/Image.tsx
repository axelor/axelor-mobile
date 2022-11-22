import React, {useState} from 'react';
import {
  Image as ReactNativeImage,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon} from '../../atoms';

interface ImageProps {
  imageSize: StyleProp<ImageStyle>;
  generalStyle: StyleProp<ImageStyle>;
  resizeMode: ImageResizeMode;
  source: ImageSourcePropType;
  defaultIconSize: number;
}

const Image = ({
  imageSize,
  generalStyle,
  resizeMode,
  source,
  defaultIconSize = 60,
}: ImageProps) => {
  const Colors = useThemeColor();
  const [isValid, setValid] = useState(true);

  const handleURIError = () => {
    if (isValid) {
      setValid(false);
    }
  };

  if (source == null || isValid === false) {
    return (
      <Icon
        name="camera"
        size={defaultIconSize}
        color={Colors.secondaryColor.background_light}
        style={generalStyle}
      />
    );
  }

  return (
    <ReactNativeImage
      onError={handleURIError}
      resizeMode={resizeMode}
      source={source}
      style={[imageSize, generalStyle]}
    />
  );
};

export default Image;
