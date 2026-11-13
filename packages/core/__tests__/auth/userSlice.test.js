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

import {fetchActiveUser, userReducer} from '../../src/auth/features/userSlice';

// Only the reducer is tested: the API calls of the slice are not needed.
jest.mock('../../src/apiProviders/utils', () => ({handlerApiCall: jest.fn()}));
jest.mock('../../src/auth/api/user-api', () => ({
  getLoggedUser: jest.fn(),
  postUser: jest.fn(),
}));
jest.mock('../../src/config', () => ({userProvider: {setUser: jest.fn()}}));

const loadedUser = {id: 1, name: 'Admin', companySet: [{id: 1}, {id: 2}]};

const fetchedUser = (payload, userId) => ({
  type: fetchActiveUser.fulfilled.type,
  payload,
  meta: {arg: userId},
});

describe('user slice', () => {
  const sessionWithUser = userReducer(undefined, fetchedUser(loadedUser, 1));

  it('stores the user fetched for the session', () => {
    expect(sessionWithUser.user).toEqual(loadedUser);
    expect(sessionWithUser.isUser).toBe(true);
    expect(sessionWithUser.canModifyCompany).toBe(true);
  });

  it('keeps the user of the session when nothing comes back for it', () => {
    const state = userReducer(sessionWithUser, fetchedUser(undefined, 1));

    expect(state.user).toEqual(loadedUser);
    expect(state.isUser).toBe(true);
    expect(state.loadingUser).toBe(false);
  });

  it('does not keep the user of another session', () => {
    const state = userReducer(sessionWithUser, fetchedUser(null, 2));

    expect(state.user).toEqual({});
    expect(state.isUser).toBe(false);
  });

  it('reports a missing user when it was never loaded', () => {
    const state = userReducer(undefined, fetchedUser(null, 1));

    expect(state.user).toEqual({});
    expect(state.isUser).toBe(false);
  });
});
