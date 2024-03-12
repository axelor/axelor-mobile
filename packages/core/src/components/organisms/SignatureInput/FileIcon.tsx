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

import React from 'react';
import {StyleSheet} from 'react-native';
import {useThemeColor, Icon} from '@axelor/aos-mobile-ui';
import {handleDocumentSelection} from '../../../tools';

interface FileIconProps {
  disabled?: boolean;
  onChange: (any: any) => void;
}

const FileIcon = ({disabled = false, onChange}: FileIconProps) => {
  const Colors = useThemeColor();

  return (
    <Icon
      name="plus-circle"
      color={Colors.primaryColor.background}
      size={25}
      style={styles.icon}
      touchable={!disabled}
      onPress={() => handleDocumentSelection(onChange)}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    margin: 5,
  },
});

export default FileIcon;
