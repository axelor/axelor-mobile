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
import {HtmlInput, Icon, NotesCard} from '@axelor/aos-mobile-ui';
import {setup, getComputedStyles} from '../../tools';

describe('NotesCard Component', () => {
  const baseProps = {
    title: 'Title',
    data: 'TEST',
  };

  const setupNotesCard = overrideProps =>
    setup({
      Component: NotesCard,
      baseProps,
      overrideProps,
    });

  it('renders title and html content', () => {
    const {getByText, getByTestId} = setupNotesCard();

    expect(getByText(baseProps.title)).toBeTruthy();
    expect(getByTestId('htmlInputScrollView')).toBeTruthy();
  });

  it('returns null when data is empty', () => {
    const {queryByText, queryByTestId} = setupNotesCard({data: ''});

    expect(queryByText(baseProps.title)).toBeNull();
    expect(queryByTestId('htmlInputScrollView')).toBeNull();
  });

  const findElementByType = (element, type) => {
    if (!element || !element.props) {
      return null;
    }

    if (element.type === type) {
      return element;
    }

    const children = React.Children.toArray(element.props.children);

    for (const child of children) {
      const result = findElementByType(child, type);
      if (result) {
        return result;
      }
    }

    return null;
  };

  it('renders chevron when content exceeds maximum height and toggles on press', () => {
    const {getByTestId} = setupNotesCard();
    const htmlInput = findElementByType(
      getByTestId('notesCardTouchable'),
      HtmlInput,
    );

    expect(htmlInput).toBeTruthy();

    act(() => {
      htmlInput.props.onHeightChange(150);
    });

    let touchable = getByTestId('notesCardTouchable');
    expect(touchable.props.accessibilityState?.disabled).toBe(false);

    const iconDown = findElementByType(touchable, Icon);
    expect(iconDown).toBeTruthy();
    expect(iconDown.props.name).toBe('chevron-down');

    fireEvent.press(touchable);

    touchable = getByTestId('notesCardTouchable');
    const iconUp = findElementByType(touchable, Icon);
    expect(iconUp).toBeTruthy();
    expect(iconUp.props.name).toBe('chevron-up');

    act(() => {
      htmlInput.props.onHeightChange(50);
    });

    expect(
      findElementByType(getByTestId('notesCardTouchable'), Icon),
    ).toBeNull();
  });

  it('disables toggle when content height is below threshold', () => {
    const {getByTestId} = setupNotesCard();
    const touchable = getByTestId('notesCardTouchable');
    const htmlInput = findElementByType(touchable, HtmlInput);

    expect(htmlInput).toBeTruthy();

    act(() => {
      htmlInput.props.onHeightChange(50);
    });

    const updatedTouchable = getByTestId('notesCardTouchable');
    expect(updatedTouchable.props.accessibilityState?.disabled).toBe(true);
  });

  it('applies custom container style', () => {
    const style = {width: 200};
    const {getByTestId} = setupNotesCard({style});

    expect(
      getComputedStyles(getByTestId('notesCardContainer').props.style),
    ).toMatchObject(style);
  });
});
