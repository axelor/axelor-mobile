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

import {LabelText} from '@axelor/aos-mobile-ui';
import {setup, getComputedStyles} from '../../tools';

describe('LabelText Component', () => {
  const baseProps = {
    title: 'Title',
    value: 'Value',
  };

  const setupLabelText = overrideProps =>
    setup({
      Component: LabelText,
      baseProps,
      overrideProps,
    });

  it('renders title and value', () => {
    const {getByText} = setupLabelText();

    expect(getByText(/Title/)).toBeTruthy();
    expect(getByText(baseProps.value)).toBeTruthy();
  });

  it('renders an icon when iconName is provided', () => {
    const {getByTestId} = setupLabelText({iconName: 'camera'});

    expect(getByTestId('icon-camera')).toBeTruthy();
  });

  it('applies custom container style', () => {
    const style = {backgroundColor: 'red'};
    const {getByTestId} = setupLabelText({style});

    expect(
      getComputedStyles(getByTestId('labelTextContainer').props?.style),
    ).toMatchObject(style);
  });

  it('applies custom icon style', () => {
    const iconStyle = {marginRight: 10};
    const {getByTestId} = setupLabelText({
      iconName: 'camera',
      iconStyle,
    });

    const iconTouchable = getByTestId('iconTouchable');

    expect(iconTouchable).toHaveStyle(iconStyle);
  });

  it('applies custom text style', () => {
    const textStyle = {fontSize: 20};
    const {getByText} = setupLabelText({textStyle});

    expect(getByText(/Title/)).toHaveStyle(textStyle);
    expect(getByText(baseProps.value)).toHaveStyle(textStyle);
  });

  it('limits text to a single line when onlyOneLine is true', () => {
    const {getByText} = setupLabelText({onlyOneLine: true});

    expect(getByText(/Title/).props.numberOfLines).toBe(1);
  });
});
