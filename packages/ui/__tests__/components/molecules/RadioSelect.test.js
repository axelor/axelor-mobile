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
import {RadioSelect} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('RadioSelect Component', () => {
  const setupRadioSelect = overrideProps =>
    setup({
      Component: RadioSelect,
      baseProps: {
        items: [
          {id: '1', title: 'Option 1'},
          {id: '2', title: 'Option 2'},
          {id: '3', title: 'Option 3'},
        ],
        question: 'Test Question',
        onChange: jest.fn(),
        direction: 'column',
      },
      overrideProps,
    });

  it('should display the question when provided', () => {
    const {getByText, props} = setupRadioSelect();

    expect(getByText(props.question)).toBeTruthy();
  });

  it('should render the correct number of RadioButton components', () => {
    const {getAllByRole, props} = setupRadioSelect();

    expect(getAllByRole('button')).toHaveLength(props.items.length);
  });

  it('selects radio item when pressed and triggers onChange', () => {
    const {getAllByRole, props} = setupRadioSelect({onChange: jest.fn()});

    const radioButtons = getAllByRole('button');

    props.items.forEach((_i, idx) => {
      fireEvent.press(radioButtons[idx]);

      expect(props.onChange).toHaveBeenNthCalledWith(idx + 1, _i.id);
    });
  });

  it('does not trigger onChange in readonly mode', () => {
    const {getAllByRole, props} = setupRadioSelect({
      onChange: jest.fn(),
      readonly: true,
    });

    const radioButtons = getAllByRole('button');

    props.items.forEach((_i, idx) => {
      fireEvent.press(radioButtons[idx]);

      expect(props.onChange).not.toHaveBeenCalled();
    });
  });

  it('renders items in column direction when specified', () => {
    const {getByTestId, props} = setupRadioSelect({direction: 'column'});

    expect(getByTestId('radioSelectButtonContainer')).toHaveStyle(
      props.direction,
    );
  });

  it('applies custom style when provided', () => {
    const {getByTestId, props} = setupRadioSelect({style: {width: 200}});

    expect(getByTestId('radioSelectContainer')).toHaveStyle(props.style);
  });

  it('applies custom item style when provided', () => {
    const {getByTestId, props} = setupRadioSelect({itemStyle: {width: 200}});

    expect(getByTestId('radioSelectButtonContainer')).toHaveStyle(
      props.itemStyle,
    );
  });

  it('applies custom question style when provided', () => {
    const {getByText, props} = setupRadioSelect({questionStyle: {width: 200}});

    expect(getByText(props.question)).toHaveStyle(props.questionStyle);
  });

  it('applies custom radioButton style to every items when provided', () => {
    const {getAllByRole, props} = setupRadioSelect({
      radioButtonStyle: {width: 200},
    });

    getAllByRole('button').forEach(_i => {
      expect(_i).toHaveStyle(props.radioButtonStyle);
    });
  });
});
