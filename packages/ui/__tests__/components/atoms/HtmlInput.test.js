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

import {HtmlInput} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('HtmlInput Component', () => {
  const setupHtmlInput = overrideProps =>
    setup({
      Component: HtmlInput,
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupHtmlInput();
    expect(getByTestId('htmlInputScrollView')).toBeTruthy();
  });

  it('renders the title when provided', () => {
    const title = 'Test Title';
    const {getByText} = setupHtmlInput({title});
    expect(getByText(title)).toBeTruthy();
  });

  it('applies custom container and content styles correctly', () => {
    const customStyle = {width: 200};
    const customContainerStyle = {flex: 1};
    const {getByTestId} = setupHtmlInput({
      style: customStyle,
      containerStyle: customContainerStyle,
    });

    expect(
      getByTestId('htmlInputScrollView').props.contentContainerStyle,
    ).toMatchObject(customContainerStyle);
    expect(getByTestId('htmlInputInnerScroll')).toHaveStyle(customStyle);
  });

  it('does not render toolbar when showToolbar is false', () => {
    const {queryByTestId} = setupHtmlInput({showToolbar: false});
    expect(queryByTestId('htmlInputToolbar')).toBeNull();
  });
});
