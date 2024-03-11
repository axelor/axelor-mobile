import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useThemeColor, Icon} from '@axelor/aos-mobile-ui';
import {useDispatch} from 'react-redux';
import enableCamera, {
  useCameraScannerValueByKey,
} from '../../../features/cameraScannerSlice';

interface PictureIconProps {
  cameraKey: string;
  disabled?: boolean;
  onChange: (any: any) => void;
}

const PictureIcon = ({
  cameraKey,
  disabled = false,
  onChange,
}: PictureIconProps) => {
  const Colors = useThemeColor();
  const photo = useCameraScannerValueByKey(cameraKey);
  const dispatch = useDispatch();

  useEffect(() => {
    if (photo) {
      onChange(`data:image/jpeg;base64,${photo}`);
    }
  }, [onChange, photo]);

  return (
    <Icon
      name="camera"
      color={Colors.primaryColor.background}
      size={25}
      style={styles.icon}
      touchable={!disabled}
      onPress={() => {
        dispatch((enableCamera as any)(cameraKey));
      }}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    margin: 5,
  },
});

export default PictureIcon;
