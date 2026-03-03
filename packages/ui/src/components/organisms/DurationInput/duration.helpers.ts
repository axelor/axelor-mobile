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

export const NB_SECONDS_IN_HOUR = 3600;
export const NB_SECONDS_IN_MINUTE = 60;

export const formatDurationSecondsToArray = (seconds: number) => {
  const hours = Math.floor(seconds / NB_SECONDS_IN_HOUR);
  const minutes = Math.floor(
    (seconds % NB_SECONDS_IN_HOUR) / NB_SECONDS_IN_MINUTE,
  );

  const formattedHours = String(hours).padStart(3, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  const formattedDuration = [];
  for (let i = 0; i < formattedHours.length; i++) {
    formattedDuration.push(Number(formattedHours[i]));
  }
  for (let i = 0; i < formattedMinutes.length; i++) {
    formattedDuration.push(Number(formattedMinutes[i]));
  }

  return formattedDuration;
};

export const formatDurationArrayToSeconds = (formattedDuration: number[]) => {
  const hours =
    String(formattedDuration[0] ?? 0) +
    String(formattedDuration[1] ?? 0) +
    String(formattedDuration[2] ?? 0);
  const minutes =
    String(formattedDuration[3] ?? 0) + String(formattedDuration[4] ?? 0);

  return (
    Number(hours) * NB_SECONDS_IN_HOUR + Number(minutes) * NB_SECONDS_IN_MINUTE
  );
};
