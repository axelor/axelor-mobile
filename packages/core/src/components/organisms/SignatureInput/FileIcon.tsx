import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {useThemeColor, Icon} from '@axelor/aos-mobile-ui';

interface FileIconProps {
  disabled?: boolean;
  onChange: (any: any) => void;
}

const FileIcon = ({disabled = false, onChange}: FileIconProps) => {
  const Colors = useThemeColor();

  const handleDocumentSelection = useCallback(async () => {
    try {
      const document = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: false,
        type: 'image/*',
      }).then(documentList => {
        if (documentList == null || documentList.length === 0) {
          return null;
        }
        return documentList[0];
      });

      if (document == null) {
        return onChange(null);
      }
      const fileData = await RNFS.readFile(document.uri, 'base64');
      onChange(`data:${document.type};base64,${fileData}`);
    } catch (err) {
      console.warn(err);
    }
  }, [onChange]);

  return (
    <Icon
      name="plus-circle"
      color={Colors.primaryColor.background}
      size={25}
      style={styles.icon}
      touchable={!disabled}
      onPress={handleDocumentSelection}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    margin: 5,
  },
});

export default FileIcon;
