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

import {fireEvent} from '@testing-library/react-native';
import {Text} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('Text Component', () => {
  const setupText = overrideProps =>
    setup({
      Component: Text,
      baseProps: {children: 'Hello, World!'},
      overrideProps,
    });

  it('renders text correctly', () => {
    const {getByText, props} = setupText();

    expect(getByText(props.children)).toBeTruthy();
  });

  it('applies custom styles correctly', () => {
    const {getByText, props} = setupText({style: {color: 'red', fontSize: 20}});

    expect(getByText(props.children)).toHaveStyle(props.style);
  });

  it('applies the specified number of lines', () => {
    const {getByText, props} = setupText({numberOfLines: 2});

    expect(getByText(props.children).props.numberOfLines).toBe(
      props.numberOfLines,
    );
  });

  it('adjusts font size to fit when enabled', () => {
    const {getByText, props} = setupText({adjustsFontSizeToFit: true});

    expect(getByText(props.children).props.adjustsFontSizeToFit).toBe(true);
  });

  it('invokes onTextLayout callback', () => {
    const {getByText, props} = setupText({onTextLayout: jest.fn()});

    const layoutEvent = {nativeEvent: {layout: {height: 100}}};
    fireEvent(getByText(props.children), 'textLayout', layoutEvent);

    expect(props.onTextLayout).toHaveBeenCalledTimes(1);
    expect(props.onTextLayout).toHaveBeenCalledWith(layoutEvent);
  });
});
