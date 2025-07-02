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
import {render} from '@testing-library/react-native';
import {HtmlInput} from '@axelor/aos-mobile-ui';

describe('HtmlInput Component', () => {
  it('renders without crashing', () => {
    const {getByTestId} = render(<HtmlInput />);
    expect(getByTestId('htmlInputScrollView')).toBeTruthy();
  });

  it('renders the title when provided', () => {
    const title = 'Test Title';
    const {getByText} = render(<HtmlInput title={title} />);
    expect(getByText(title)).toBeTruthy();
  });

  it('applies custom styles correctly', () => {
    const customStyle = {width: 200};
    const customToolbarStyle = {backgroundColor: 'red'};
    const customContainerStyle = {flex: 1};

    const {getByTestId, queryByTestId} = render(
      <HtmlInput
        style={customStyle}
        styleToolbar={customToolbarStyle}
        containerStyle={customContainerStyle}
        readonly={false}
        defaultInput="test"
      />,
    );

    const container = getByTestId('htmlInputScrollView');
    expect(container.props.contentContainerStyle).toMatchObject(
      customContainerStyle,
    );

    const contentScroll = getByTestId('htmlInputInnerScroll');
    expect(contentScroll.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );

    expect(queryByTestId('htmlInputToolbar')).toBeNull();
  });
});
