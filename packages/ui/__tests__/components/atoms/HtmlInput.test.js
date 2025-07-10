/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {HtmlInput} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

jest.mock('react-native-pell-rich-editor', () => {
  const {View} = require('react-native');

  return {
    RichEditor: jest
      .fn()
      .mockImplementation(() => <View testID="richEditor" />),
  };
});

describe('HtmlInput Component', () => {
  const setupHtmlInput = overrideProps =>
    setup({Component: HtmlInput, overrideProps});

  it('renders without crashing', () => {
    const {getByTestId} = setupHtmlInput();

    expect(getByTestId('htmlInputScrollView')).toBeTruthy();
    expect(getByTestId('htmlInputInnerScroll')).toBeTruthy();
    expect(getByTestId('richEditor')).toBeTruthy();
  });

  it('renders with a title if provided', () => {
    const {getByText, props} = setupHtmlInput({title: 'Test Title'});

    expect(getByText(props.title)).toBeTruthy();
  });

  it('applies custom container and content styles correctly', () => {
    const {getByTestId, props} = setupHtmlInput({
      style: {width: 200},
      containerStyle: {flex: 1},
    });

    expect(
      getByTestId('htmlInputScrollView').props.contentContainerStyle,
    ).toMatchObject(props.containerStyle);
    expect(getByTestId('htmlInputInnerScroll')).toHaveStyle(props.style);
  });
});
