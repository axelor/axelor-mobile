/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {fireEvent} from '@testing-library/react-native';
import {EditableHtmlInput} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

jest.mock('../../../lib/components/atoms/HtmlInput/HtmlInput', () => {
  const {View} = require('react-native');

  return props => <View testID="mocked_htmlInput" {...props} />;
});

describe('EditableHtmlInput Component', () => {
  const setupEditableHtmlInput = overrideProps =>
    setup({
      Component: EditableHtmlInput,
      baseProps: {
        placeholder: 'Enter text',
        onValidate: jest.fn(),
        defaultValue: 'Initial value',
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupEditableHtmlInput();

    expect(getByTestId('mocked_htmlInput')).toBeTruthy();
  });

  it('should render with pencil icon and readonly HtmlInput by default', () => {
    const {getByTestId} = setupEditableHtmlInput();

    expect(getByTestId('icon-pencil-fill')).toBeTruthy();

    const _htmlElt = getByTestId('mocked_htmlInput');
    expect(_htmlElt).toBeTruthy();
    expect(_htmlElt.props.readonly).toBe(true);
  });

  it('toggles to editable mode and calls onValidate when confirmed', () => {
    const {getByTestId, props} = setupEditableHtmlInput({
      onValidate: jest.fn(),
    });

    fireEvent.press(getByTestId('iconTouchable'));
    expect(getByTestId('icon-check-lg')).toBeTruthy();

    fireEvent.press(getByTestId('iconTouchable'));

    expect(getByTestId('icon-pencil-fill')).toBeTruthy();
    expect(props.onValidate).toHaveBeenCalledWith(props.defaultValue);
  });
});
