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

import {act, renderHook} from '@testing-library/react-native';
import {useMetafileUri} from '../../src/utils/image';

let mockDisplayUri;
let mockCalls;

jest.mock('../../src/apiProviders', () => ({
  getFileApi: () => ({
    getDisplayUri: async () => {
      mockCalls++;
      return mockDisplayUri;
    },
  }),
}));

const PENDING_ID = -1000000000001;
const DEVICE_URI = 'file:///device/pending.png';
const SERVER_URI = 'http://server/ws/rest/MetaFile/812/content/download';

// Lets the answers of the file provider arrive and the hook render again.
const settle = () =>
  act(async () => {
    await new Promise(resolve => setTimeout(resolve, 20));
  });

describe('useMetafileUri', () => {
  // The answers come from promises: fake timers would never let them settle.
  beforeAll(() => jest.useRealTimers());

  afterAll(() => jest.useFakeTimers());

  beforeEach(() => {
    mockCalls = 0;
    mockDisplayUri = DEVICE_URI;
  });

  it('shows the device copy, then the server file once uploaded', async () => {
    const {result, rerender} = renderHook(() => useMetafileUri());

    result.current(PENDING_ID);
    await settle();
    expect(result.current(PENDING_ID)).toEqual({uri: DEVICE_URI});
    // Reading a device answer asks again; let that check finish first.
    await settle();

    mockDisplayUri = SERVER_URI;
    rerender({});
    result.current(PENDING_ID);
    await settle();
    expect(result.current(PENDING_ID)).toEqual({uri: SERVER_URI});
  });

  it('does not ask again once the answer is a server file', async () => {
    mockDisplayUri = SERVER_URI;
    const {result} = renderHook(() => useMetafileUri());

    result.current(PENDING_ID);
    await settle();
    result.current(PENDING_ID);
    result.current(PENDING_ID);
    await settle();

    expect(result.current(PENDING_ID)).toEqual({uri: SERVER_URI});
    expect(mockCalls).toBe(1);
  });

  it('does not ask again for a real id kept on the device', async () => {
    const {result} = renderHook(() => useMetafileUri());

    result.current(812);
    await settle();
    result.current(812);
    result.current(812);
    await settle();

    expect(result.current(812)).toEqual({uri: DEVICE_URI});
    expect(mockCalls).toBe(1);
  });

  it('stops asking while a device copy gives the same answer', async () => {
    const {result} = renderHook(() => useMetafileUri());

    result.current(PENDING_ID);
    await settle();
    const callsAfterFirstAnswer = mockCalls;
    await settle();
    await settle();

    expect(mockCalls).toBe(callsAfterFirstAnswer);
  });
});
