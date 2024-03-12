/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
