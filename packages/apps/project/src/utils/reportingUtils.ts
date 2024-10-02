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

export const getReportingConfiguration = (allowedReportingTypes, project) => {
  const isNoneOnly =
    allowedReportingTypes.length === 1 &&
    allowedReportingTypes.includes('none');
  const showActivities = allowedReportingTypes.includes('activities');
  const showReporting =
    allowedReportingTypes.includes('indicators') && project?.isBusinessProject;

  return {
    isNoneOnly,
    showActivities,
    showReporting,
    showReportingOrActivities: showActivities || showReporting,
  };
};
