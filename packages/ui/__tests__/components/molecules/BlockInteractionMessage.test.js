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

import {BlockInteractionMessage} from '@axelor/aos-mobile-ui';
import * as configContext from '../../../lib/config/ConfigContext';
import * as configIndex from '../../../lib/config';
import {getComputedStyles, getDefaultThemeColors, setup} from '../../tools';
import {fireEvent, within} from '@testing-library/react-native';

describe('BlockInteractionMessage Component', () => {
  const Colors = getDefaultThemeColors();
  const setupBlockInteractionMessage = () =>
    setup({
      Component: BlockInteractionMessage,
    });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    expect(() => setupBlockInteractionMessage()).not.toThrow();
  });

  it('should not render when blockInteractionConfig.visible is false', () => {
    const {queryByTestId} = setupBlockInteractionMessage();

    expect(queryByTestId('blockInteractionContainer')).toBeNull();
  });

  it('should render the informations provided by the config context', () => {
    const firstAction = {
      iconName: 'check',
      title: 'Action 1',
      onPress: jest.fn(),
      color: Colors.successColor,
      testID: 'action-1',
    };
    const secondAction = {
      title: 'Action 2',
      onPress: jest.fn(),
      color: Colors.cautionColor,
      testID: 'action-2',
    };
    const mockConfig = {
      headerHeight: 60,
      blockInteractionConfig: {
        visible: true,
        message: 'Test Message',
        style: {backgroundColor: 'blue'},
        actionItems: [firstAction, secondAction],
      },
    };

    jest.spyOn(configContext, 'useConfig').mockReturnValue(mockConfig);
    jest.spyOn(configIndex, 'useConfig').mockReturnValue(mockConfig);

    const {getByText, getByTestId} = setupBlockInteractionMessage();

    expect(getByText('Test Message')).toBeTruthy();

    const cardStyles = getComputedStyles(
      getByTestId('cardContainer').props.style,
    );
    expect(cardStyles).toMatchObject(mockConfig.blockInteractionConfig.style);

    const firstButton = getByTestId(firstAction.testID);
    const firstButtonStyles = getComputedStyles(firstButton?.props?.style);
    expect(firstButtonStyles).toMatchObject({
      backgroundColor: firstAction.color.background_light,
      borderColor: firstAction.color.background,
    });
    fireEvent.press(firstButton);
    expect(firstAction.onPress).toHaveBeenCalled();
    expect(
      within(firstButton).getAllByTestId('iconTouchable').length,
    ).toBeGreaterThan(0);

    const secondButton = getByTestId(secondAction.testID);
    const secondButtonStyles = getComputedStyles(secondButton?.props?.style);
    expect(secondButtonStyles).toMatchObject({
      backgroundColor: secondAction.color.background_light,
      borderColor: secondAction.color.background,
    });
    fireEvent.press(secondButton);
    expect(secondAction.onPress).toHaveBeenCalled();
    expect(within(secondButton).queryAllByTestId('iconTouchable').length).toBe(
      0,
    );
  });
});
