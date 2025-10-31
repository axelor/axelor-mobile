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
import {setup} from '../../tools';

describe('LabelText Component', () => {
  const setupLabelText = overrideProps =>
    setup({
      Component: LabelText,
      baseProps: {title: 'Title', value: 'Value'},
      overrideProps,
    });

  function getTitleElt(getter, title) {
    return getter(new RegExp(title, 'i'));
  }

  it('should render without crashing', () => {
    const {getByTestId} = setupLabelText();

    expect(getByTestId('labelTextContainer')).toBeTruthy();
  });

  it('renders title and value', () => {
    const {getByText, props} = setupLabelText();

    expect(getTitleElt(getByText, props.title)).toBeTruthy();
    expect(getByText(props.value)).toBeTruthy();
  });

  it('renders an icon when iconName is provided', () => {
    const {getByTestId, props} = setupLabelText({iconName: 'camera'});

    expect(getByTestId(`icon-${props.iconName}`)).toBeTruthy();
  });

  it('applies custom container style', () => {
    const {getByTestId, props} = setupLabelText({
      style: {backgroundColor: 'red'},
    });

    expect(getByTestId('labelTextContainer')).toHaveStyle(props.style);
  });

  it('applies custom icon style', () => {
    const {getByTestId, props} = setupLabelText({
      iconName: 'camera',
      iconStyle: {marginRight: 10},
    });

    expect(getByTestId('iconTouchable')).toHaveStyle(props.iconStyle);
  });

  it('applies custom text style', () => {
    const {getByText, props} = setupLabelText({textStyle: {fontSize: 20}});

    expect(getTitleElt(getByText, props.title)).toHaveStyle(props.textStyle);
    expect(getByText(props.value)).toHaveStyle(props.textStyle);
  });

  it('limits text to a single line when onlyOneLine is true', () => {
    const {getByText, props} = setupLabelText({onlyOneLine: true});

    expect(getTitleElt(getByText, props.title).props.numberOfLines).toBe(1);
  });
});
