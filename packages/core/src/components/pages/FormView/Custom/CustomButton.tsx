/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {useSelector} from 'react-redux';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {customComponentOptions} from '../../../../forms/types';
import {executeButtonAction} from '../../../../forms/studio/api.helpers';

interface props extends customComponentOptions {
  item: any;
  object?: any;
  style?: any;
  title?: string;
  readonly?: boolean;
}

const CustomButton = ({item, style, title, readonly}: props) => {
  const Colors = useThemeColor();

  const {object} = useSelector((state: any) => state.metaJsonField);

  const handlePress = useCallback(() => {
    executeButtonAction(item.onClick, item.uniqueModel, object);
  }, [item, object]);

  return (
    <Button
      style={style}
      onPress={handlePress}
      title={title}
      disabled={readonly}
      color={readonly ? Colors.secondaryColor : Colors.primaryColor}
    />
  );
};

export default CustomButton;
