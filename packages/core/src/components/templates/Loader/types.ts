/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

export type callBack = (...args) => void;

export enum EventType {
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type Event = {
  [e in EventType]: callBack[];
};

export enum ProcessStatus {
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type ProcessOption = {
  disabled: boolean;
  process: () => Promise<any>;
  onSuccess: (response?: any) => void;
  onError: (error?: any) => void;
};

export type ProcessItem = ProcessOption & {
  key: string;
  loading: boolean;
  notifyMe: boolean;
  status: ProcessStatus;
  response?: any;
  completed: boolean;
};
