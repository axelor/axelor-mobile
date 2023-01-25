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

import React from 'react';
import {useThemeColor} from '../../../theme/ThemeContext';
import ReactNativeRenderHTML, {
  HTMLContentModel,
  HTMLElementModel,
} from 'react-native-render-html';

const PERCENTAGE_WIDTH_NOTES = 0.95;

interface RenderHtmlProps {
  data: string;
  widthNotes: number;
}

const RenderHtml = ({data, widthNotes}: RenderHtmlProps) => {
  const Colors = useThemeColor();

  if (data == null || data === '') {
    return null;
  }

  const fontElementModel = HTMLElementModel.fromCustomModel({
    tagName: 'font',
    contentModel: HTMLContentModel.mixed,
    getUADerivedStyleFromAttributes({face, color, size}) {
      let style = {fontFamily: '', color: '', fontSize: ''};
      if (face) {
        style.fontFamily = face;
      }
      if (color) {
        style.color = color;
      }
      if (size) {
        style.fontSize = size;
      }
      return style;
    },
  });

  const customHTMLElementModels = {font: fontElementModel};

  return (
    <ReactNativeRenderHTML
      source={{
        html: data,
      }}
      customHTMLElementModels={customHTMLElementModels}
      contentWidth={
        widthNotes != null ? widthNotes * PERCENTAGE_WIDTH_NOTES : 100
      }
      baseStyle={{color: Colors.text}}
    />
  );
};

export default RenderHtml;
