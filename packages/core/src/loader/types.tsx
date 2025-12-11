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

export type ProcessOption = {
  name: string;
  disabled: boolean;
  process: () => Promise<any>;
  onSuccess: (response?: any) => void;
  onError: (error?: any) => void;
};

export enum ProcessStatus {
  InProgress = 0,
  Success = 1,
  Failed = 2,
}

export type CallBack = (...args) => void;

export type Event = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [e in ProcessStatus]: CallBack[];
};

export type ProcessItem = ProcessOption & {
  key: string;
  loading: boolean;
  notifyMe: boolean;
  response: string;
  status: number;
  executed: boolean;
  startedDate: string;
  endDate: string;
};
