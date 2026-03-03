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

import {fireEvent, within} from '@testing-library/react-native';
import {BlockInteractionMessage} from '@axelor/aos-mobile-ui';
import * as configContext from '../../../lib/config/ConfigContext';
import {getDefaultThemeColors, setup} from '../../tools';

describe('BlockInteractionMessage Component', () => {
  const Colors = getDefaultThemeColors();

  const setupBlockInteractionMessage = () =>
    setup({Component: BlockInteractionMessage});

  it('renders without crashing', () => {
    const {queryByTestId} = setupBlockInteractionMessage();

    expect(queryByTestId('blockInteractionContainer')).toBeFalsy();
  });

  it('renders the informations given in context', () => {
    const mockConfig = {
      visible: true,
      message: 'Test Message',
      style: {backgroundColor: 'blue'},
      actionItems: [
        {
          iconName: 'plus-lg',
          title: 'Action 1',
          onPress: jest.fn(),
          color: Colors.amber,
        },
        {
          title: 'Action 2',
          onPress: jest.fn(),
          color: Colors.cyan,
        },
      ],
    };

    jest
      .spyOn(configContext, 'useConfig')
      .mockImplementation(() => ({blockInteractionConfig: mockConfig}));

    const {getByText, getByTestId, getAllByTestId} =
      setupBlockInteractionMessage();

    expect(getByTestId('blockInteractionContainer')).toBeTruthy();
    expect(getByText(mockConfig.message)).toBeTruthy();
    expect(getByTestId('cardContainer')).toHaveStyle(mockConfig.style);

    expect(getAllByTestId(/^blockInteractionMessageButton-idx.*/)).toHaveLength(
      mockConfig.actionItems.length,
    );

    mockConfig.actionItems.forEach((_a, idx) => {
      const _elt = getByTestId(`blockInteractionMessageButton-idx${idx}`);
      expect(_elt).toHaveStyle({
        backgroundColor: _a.color.background_light,
        borderColor: _a.color.background,
      });

      expect(within(_elt).getByText(_a.title)).toBeTruthy();

      if (_a.iconName != null) {
        expect(within(_elt).getByTestId(`icon-${_a.iconName}`)).toBeTruthy();
      }

      fireEvent.press(_elt);
      expect(_a.onPress).toHaveBeenCalled();
    });
  });
});
