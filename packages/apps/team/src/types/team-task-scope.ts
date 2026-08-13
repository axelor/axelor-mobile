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

import {Color} from '@axelor/aos-mobile-ui';
import {Criteria} from '@axelor/aos-mobile-core';

export interface TeamTaskScopeFilter {
  criteria?: Criteria[];
  domain?: string;
  domainContext?: any;
}

export interface TeamTaskScopeContext {
  userId?: number;
}

export interface TeamTaskScopeConfig {
  key: string;
  title: string;
  color?: Color;
  isDefault?: boolean;
  getFilter?: (context: TeamTaskScopeContext) => TeamTaskScopeFilter;
}

export class TeamTaskScope {
  static scope = {
    AssignedToMe: 'assignedToMe',
    Delegated: 'delegated',
    Observed: 'observed',
  };

  static defaultScopeList: TeamTaskScopeConfig[] = [
    {
      key: TeamTaskScope.scope.AssignedToMe,
      title: 'Team_TaskScope_AssignedToMe',
      isDefault: true,
      getFilter: ({userId}) =>
        userId == null
          ? {}
          : {
              criteria: [
                {fieldName: 'assignedTo.id', operator: '=', value: userId},
              ],
            },
    },
    {
      key: TeamTaskScope.scope.Delegated,
      title: 'Team_TaskScope_Delegated',
      getFilter: ({userId}) =>
        userId == null
          ? {}
          : {
              criteria: [
                {
                  operator: 'and',
                  criteria: [
                    {fieldName: 'createdBy.id', operator: '=', value: userId},
                    {
                      operator: 'or',
                      criteria: [
                        {
                          fieldName: 'assignedTo.id',
                          operator: '!=',
                          value: userId,
                        },
                        {fieldName: 'assignedTo', operator: 'isNull'},
                      ],
                    },
                  ],
                },
              ],
            },
    },
    {
      key: TeamTaskScope.scope.Observed,
      title: 'Team_TaskScope_Observed',
      getFilter: ({userId}) =>
        userId == null
          ? {}
          : {
              domain:
                "EXISTS (SELECT 1 FROM MailFollower f WHERE f.relatedModel = 'com.axelor.team.db.TeamTask' AND f.relatedId = self.id AND f.user.id = :userId AND f.archived IS FALSE)",
              domainContext: {userId},
            },
    },
  ];

  static getDefaultScope = (scopeList: TeamTaskScopeConfig[]) => {
    if (!Array.isArray(scopeList) || scopeList.length === 0) return undefined;

    return scopeList.find(({isDefault}) => isDefault === true) ?? scopeList[0];
  };

  static getScopeFilter = (
    scopeList: TeamTaskScopeConfig[],
    scopeKey: string | undefined,
    context: TeamTaskScopeContext,
  ): TeamTaskScopeFilter => {
    const scope = scopeList?.find(({key}) => key === scopeKey);

    return scope?.getFilter?.(context) ?? {};
  };
}
