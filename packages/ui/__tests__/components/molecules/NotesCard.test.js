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
import {act, fireEvent} from '@testing-library/react-native';
import {NotesCard} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

jest.mock('../../../lib/components/atoms/HtmlInput/HtmlInput', () => {
  const {View} = require('react-native');

  return props => <View testID="mocked_htmlInput" {...props} />;
});

describe('NotesCard Component', () => {
  const setupNotesCard = overrideProps =>
    setup({
      Component: NotesCard,
      baseProps: {title: 'Title', data: 'TEST'},
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupNotesCard();

    expect(getByTestId('notesCardContainer')).toBeTruthy();
  });

  it('renders title and html content', () => {
    const {getByText, getByTestId, props} = setupNotesCard();

    expect(getByText(props.title)).toBeTruthy();
    expect(getByTestId('mocked_htmlInput')).toBeTruthy();
    expect(getByTestId('mocked_htmlInput').props.defaultInput).toBe(props.data);
  });

  it('returns null when data is empty', () => {
    const {queryByText, queryByTestId, props} = setupNotesCard({data: ''});

    expect(queryByText(props.title)).toBeFalsy();
    expect(queryByTestId('mocked_htmlInput')).toBeFalsy();
  });

  it('renders chevron when content exceeds maximum height and toggles on press', () => {
    const {queryByTestId} = setupNotesCard();

    const _mockChangeHeight =
      queryByTestId('mocked_htmlInput').props.onHeightChange;

    act(() => _mockChangeHeight(150));

    expect(queryByTestId('icon-chevron-down')).toBeTruthy();
    expect(queryByTestId('icon-chevron-up')).toBeFalsy();

    fireEvent.press(queryByTestId('notesCardTouchable'));

    expect(queryByTestId('icon-chevron-up')).toBeTruthy();
    expect(queryByTestId('icon-chevron-down')).toBeFalsy();

    act(() => _mockChangeHeight(50));

    expect(queryByTestId('icon-chevron-up')).toBeFalsy();
    expect(queryByTestId('icon-chevron-down')).toBeFalsy();
  });

  it('applies custom container style', () => {
    const {getByTestId, props} = setupNotesCard({style: {width: 200}});

    expect(getByTestId('notesCardContainer')).toHaveStyle(props.style);
  });
});
