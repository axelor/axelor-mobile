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

import React, {useCallback, useMemo} from 'react';
import {FormView} from '@axelor/aos-mobile-core';
import {createCheckListItem} from '../../features/checkListSlice';

const CheckListItemFormScreen = ({navigation, route}) => {
  const {parentItem, projectId, projectTaskId} = route.params ?? {};

  const creationDefaultValue = useMemo(
    () => ({
      parentItemId: parentItem?.id,
      projectId,
      projectTaskId,
      completed: false,
      sequence: parentItem != null ? parentItem?.sequence + 1 : undefined,
    }),
    [parentItem, projectId, projectTaskId],
  );

  const handleCreateAPI = useCallback(
    (objectState: any, dispatch: any) => {
      dispatch((createCheckListItem as any)(objectState));
      navigation.pop();
    },
    [navigation],
  );

  return (
    <FormView
      formKey="project_checkListItem"
      creationDefaultValue={creationDefaultValue}
      defaultEditMode={true}
      actions={[
        {
          key: 'create-check-list-item',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({dispatch, objectState}) => {
            handleCreateAPI(objectState, dispatch);
          },
        },
      ]}
    />
  );
};

export default CheckListItemFormScreen;
