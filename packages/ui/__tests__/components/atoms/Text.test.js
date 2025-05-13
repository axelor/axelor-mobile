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
import {fireEvent, render, screen} from '@testing-library/react-native';
import {Text} from '@axelor/aos-mobile-ui';

describe('Text Component', () => {
  it('renders text correctly', () => {
    const text = 'Hello, World!';
    render(<Text>{text}</Text>);

    expect(screen.getByText(text)).toBeTruthy();
  });

  it('applies custom styles correctly', () => {
    const text = 'Custom Text';
    const customStyle = {color: 'red', fontSize: 20};
    render(<Text style={customStyle}>{text}</Text>);

    expect(screen.getByText(text)).toHaveStyle(customStyle);
  });

  it('applies the specified number of lines', () => {
    const text = 'Custom Text';
    const numberOfLines = 2;
    render(<Text numberOfLines={numberOfLines}>{text}</Text>);

    expect(screen.getByText(text).props.numberOfLines).toBe(numberOfLines);
  });

  it('adjusts font size to fit when enabled', () => {
    const text = 'Custom Text';
    render(<Text adjustsFontSizeToFit>{text}</Text>);

    expect(screen.getByText(text).props.adjustsFontSizeToFit).toBe(true);
  });

  it('invokes onTextLayout callback', () => {
    const text = 'Custom Text';
    const onTextLayout = jest.fn();
    const layoutEvent = {nativeEvent: {layout: {height: 100}}};
    render(<Text onTextLayout={onTextLayout}>{text}</Text>);

    fireEvent(screen.getByText(text), 'textLayout', layoutEvent);

    expect(onTextLayout).toHaveBeenCalledTimes(1);
    expect(onTextLayout).toHaveBeenCalledWith(layoutEvent);
  });
});
