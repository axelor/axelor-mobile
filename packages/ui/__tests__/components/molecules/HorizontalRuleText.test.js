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

import {HorizontalRuleText} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('HorizontalRuleText Component', () => {
  const Colors = getDefaultThemeColors();
  const setupHorizontalRuleText = overrideProps =>
    setup({
      Component: HorizontalRuleText,
      baseProps: {text: 'Hello'},
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupHorizontalRuleText();

    expect(getByTestId('horizontalRuleTextContainer')).toBeTruthy();
  });

  it('renders correctly with the provided title', () => {
    const defaultColor = Colors.secondaryColor.background_light;
    const {getByText, getAllByTestId, props} = setupHorizontalRuleText();

    const text = getByText(props.text);
    expect(text).toBeTruthy();
    expect(text).toHaveStyle({color: defaultColor});

    const lines = getAllByTestId('horizontalRule');
    expect(lines.length).toBe(2);
    lines.forEach(line => {
      expect(line).toHaveStyle({borderColor: defaultColor});
    });
  });

  it('renders correctly with the provided color', () => {
    const {getByText, getAllByTestId, props} = setupHorizontalRuleText({
      color: Colors.cautionColor.background_light,
    });

    expect(getByText(props.text)).toHaveStyle({color: props.color});
    getAllByTestId('horizontalRule').forEach(line => {
      expect(line).toHaveStyle({borderColor: props.color});
    });
  });

  it('applies custom style when provided', () => {
    const {getByText, getByTestId, getAllByTestId, props} =
      setupHorizontalRuleText({
        textStyle: {alignSelf: 'flex-start'},
        lineStyle: {marginHorizontal: 40},
        style: {width: '50%'},
      });

    expect(getByText(props.text)).toHaveStyle(props.textStyle);
    expect(getByTestId('horizontalRuleTextContainer')).toHaveStyle(props.style);

    getAllByTestId('horizontalRule').forEach(line => {
      expect(line).toHaveStyle(props.lineStyle);
    });
  });
});
