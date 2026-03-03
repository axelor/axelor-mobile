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

import {fireEvent, waitFor} from '@testing-library/react-native';
import {FloatingButton} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('FloatingButton Component', () => {
  const Colors = getDefaultThemeColors();

  const setupFloatingButton = overrideProps =>
    setup({
      Component: FloatingButton,
      baseProps: {
        actions: [
          {
            key: 'edit',
            title: 'Edit',
            iconName: 'edit-icon',
            color: Colors.errorColor,
            onPress: jest.fn(),
            closeOnPress: true,
          },
          {
            key: 'delete',
            title: 'Delete',
            iconName: 'trash-icon',
            onPress: jest.fn(),
            closeOnPress: false,
            indicator: true,
          },
        ],
        translator: key => key,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupFloatingButton();

    expect(getByTestId('floatingButtonContainer')).toBeTruthy();
  });

  it('toggles open and close on button press', () => {
    const {getByTestId, queryByTestId, props} = setupFloatingButton();

    const mainButton = getByTestId('floatingButtonMainButton');

    fireEvent.press(mainButton);

    props.actions.forEach(_a => {
      expect(queryByTestId(`action-button-${_a.iconName}`)).toBeTruthy();
    });

    fireEvent.press(mainButton);

    props.actions.forEach(_a => {
      expect(queryByTestId(`action-button-${_a.iconName}`)).toBeNull();
    });
  });

  it('calls onGlobalPress if provided', () => {
    const {getByTestId, props} = setupFloatingButton({
      onGlobalPress: jest.fn(),
    });

    fireEvent.press(getByTestId('floatingButtonMainButton'));

    expect(props.onGlobalPress).toHaveBeenCalled();
  });

  it('renders the indicator when any action has it enabled', () => {
    const {getByTestId} = setupFloatingButton({useCircleStyle: true});

    fireEvent.press(getByTestId('floatingButtonMainButton'));
    fireEvent.press(getByTestId('icon-chevron-down')); // Collapse actions to see indicator

    expect(getByTestId('floatingButtonIndicator')).toBeTruthy();
  });

  it('expands and collapses when clicking expand icon', () => {
    const {getByTestId, queryByTestId, props} = setupFloatingButton({
      useCircleStyle: true,
    });

    fireEvent.press(getByTestId('floatingButtonMainButton'));
    props.actions.forEach(_a => {
      expect(queryByTestId(`action-button-${_a.iconName}`)).toBeTruthy();
    });

    expect(getByTestId('icon-chevron-down')).toBeTruthy();
    fireEvent.press(getByTestId('icon-chevron-down')); // Collapse actions
    props.actions.forEach(_a => {
      expect(queryByTestId(`action-button-${_a.iconName}`)).toBeNull();
    });

    expect(getByTestId('icon-chevron-up')).toBeTruthy();
    fireEvent.press(getByTestId('icon-chevron-up')); // Expand agatin actions
    props.actions.forEach(_a => {
      expect(queryByTestId(`action-button-${_a.iconName}`)).toBeTruthy();
    });
  });

  it('should always display all actions when expandable is false', () => {
    const {getByTestId, queryByTestId, props} = setupFloatingButton({
      useCircleStyle: true,
      expandable: false,
    });

    fireEvent.press(getByTestId('floatingButtonMainButton'));

    expect(queryByTestId('icon-chevron-down')).toBeNull();
    expect(queryByTestId('icon-chevron-up')).toBeNull();

    props.actions.forEach(_a => {
      expect(queryByTestId(`action-button-${_a.iconName}`)).toBeTruthy();
    });
  });

  it('executes action onPress and closes if closeOnPress is true', async () => {
    const {getByTestId, queryByTestId, props} = setupFloatingButton();

    const action = props.actions[0];

    fireEvent.press(getByTestId('floatingButtonMainButton'));
    fireEvent.press(getByTestId(`action-button-${action.iconName}`));

    await waitFor(() => {
      expect(action.onPress).toHaveBeenCalled();
      expect(queryByTestId(`action-button-${action.iconName}`)).toBeNull();
    });
  });

  it('remains open if action.closeOnPress is false', async () => {
    const {getByTestId, queryByTestId, props} = setupFloatingButton();

    const action = props.actions[1];

    fireEvent.press(getByTestId('floatingButtonMainButton'));
    fireEvent.press(getByTestId(`action-button-${action.iconName}`));

    await waitFor(() => {
      expect(action.onPress).toHaveBeenCalled();
      expect(queryByTestId(`action-button-${action.iconName}`)).toBeTruthy();
    });
  });

  it('does not render when actions list is empty', () => {
    const {queryByTestId} = setupFloatingButton({actions: []});

    expect(queryByTestId('floatingButtonContainer')).toBeNull();
  });

  it('applies custom style when provided', () => {
    const {getByTestId, props} = setupFloatingButton({style: {width: 200}});

    expect(getByTestId('floatingButtonContainer')).toHaveStyle(props.style);
  });
});
