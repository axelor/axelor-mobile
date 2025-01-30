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

export const SPACER = ':';
export const NB_SECONDS_IN_MINUTE = 60;
export const NB_SECONDS_IN_HOUR = 3600;

export const MAX_HOUR_REGEX = /\d{3}$/g;
export const NEED_SPACER_REGEX = /\d{4,}$/g;
export const PERFECT_REGEX = /\d{3}:\d{2}$/g;

export const formatDuration = (hours: number, minutes: number) => {
  const formattedHours = hours.toString().padStart(3, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
};

export const formatDurationFromSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / NB_SECONDS_IN_HOUR);
  const minutes = Math.floor(
    (seconds % NB_SECONDS_IN_HOUR) / NB_SECONDS_IN_MINUTE,
  );

  return formatDuration(hours, minutes);
};

export const parseDuration = (value: string) => {
  if (value == null) {
    return 0;
  }

  const [hours, minutes] = value.split(':');
  const parsedHours = parseInt(hours, 10);
  const parsedMinutes = parseInt(minutes, 10);

  if (isNaN(parsedHours) || isNaN(parsedMinutes)) {
    return 0;
  }

  const totalSeconds =
    parsedHours * NB_SECONDS_IN_HOUR + parsedMinutes * NB_SECONDS_IN_MINUTE;

  return totalSeconds;
};
