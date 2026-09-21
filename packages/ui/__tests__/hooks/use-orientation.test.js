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

import {renderHook} from '@testing-library/react-native';
import {useIsLandscape} from '@axelor/aos-mobile-ui';

let mockWindow = {width: 390, height: 844, scale: 2, fontScale: 1};

jest.mock('react-native/Libraries/Utilities/useWindowDimensions', () => ({
  __esModule: true,
  default: () => mockWindow,
}));

describe('useIsLandscape', () => {
  const setWindow = (width, height) => {
    mockWindow = {width, height, scale: 2, fontScale: 1};
  };

  it('reports a portrait window', () => {
    setWindow(390, 844);

    expect(renderHook(() => useIsLandscape()).result.current).toBe(false);
  });

  it('reports a landscape window', () => {
    setWindow(844, 390);

    expect(renderHook(() => useIsLandscape()).result.current).toBe(true);
  });

  it('keeps a square window on the portrait side', () => {
    setWindow(500, 500);

    expect(renderHook(() => useIsLandscape()).result.current).toBe(false);
  });

  it('follows the window when it turns', () => {
    setWindow(390, 844);

    const {result, rerender} = renderHook(() => useIsLandscape());

    expect(result.current).toBe(false);

    setWindow(844, 390);
    rerender();

    expect(result.current).toBe(true);
  });
});
