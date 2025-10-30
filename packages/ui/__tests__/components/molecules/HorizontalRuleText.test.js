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

import {HorizontalRuleText} from '@axelor/aos-mobile-ui';
import {setup, getDefaultThemeColors, getComputedStyles} from '../../tools';

const findParentWithStyle = (node, expectedStyle) => {
  let current = node?.parent;

  while (current) {
    const styles = getComputedStyles(current.props?.style);

    const matches =
      styles != null &&
      Object.entries(expectedStyle).every(
        ([key, value]) => styles[key] === value,
      );

    if (matches) {
      return current;
    }

    current = current.parent;
  }

  return null;
};

describe('HorizontalRuleText Component', () => {
  const baseProps = {
    text: 'Hello',
  };

  const setupHorizontalRuleText = overrideProps =>
    setup({
      Component: HorizontalRuleText,
      baseProps,
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByText, props} = setupHorizontalRuleText();

    expect(getByText(props.text)).toBeTruthy();
  });

  it('renders correctly with the provided title', () => {
    const defaultColor =
      getDefaultThemeColors().secondaryColor?.background_light;
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
    const color = getDefaultThemeColors().cautionColor?.background_light;
    const {getByText, getAllByTestId, props} = setupHorizontalRuleText({
      color,
    });

    expect(getByText(props.text)).toHaveStyle({color});
    getAllByTestId('horizontalRule').forEach(line => {
      expect(line).toHaveStyle({borderColor: color});
    });
  });

  it('applies custom style when provided', () => {
    const style = {width: '50%'};
    const lineStyle = {marginHorizontal: 40};
    const textStyle = {alignSelf: 'flex-start'};
    const {getByText, getAllByTestId} = setupHorizontalRuleText({
      textStyle,
      lineStyle,
      style,
    });

    const text = getByText(baseProps.text);
    expect(text).toHaveStyle(textStyle);

    const firstLine = getAllByTestId('horizontalRule')[0];
    const container = findParentWithStyle(firstLine, style);
    expect(container).toBeTruthy();

    getAllByTestId('horizontalRule').forEach(line => {
      expect(line).toHaveStyle(lineStyle);
    });
  });
});
