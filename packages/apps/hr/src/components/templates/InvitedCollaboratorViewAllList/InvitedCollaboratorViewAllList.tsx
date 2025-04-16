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

import React, {useCallback, useState} from 'react';
import {useTranslator} from '@axelor/aos-mobile-core';
import {ViewAllEditList} from '@axelor/aos-mobile-ui';
import EmployeeSearchBar from '../EmployeeSearchBar/EmployeeSearchBar';

const InvitedCollaboratorViewAllListAux = ({
  title = 'Hr_Invitedcollaborators',
  defaultValue = null,
  onChange,
  readonly = false,
}) => {
  const I18n = useTranslator();

  const [lines, setLines] = useState(defaultValue != null ? defaultValue : []);
  const [newLine, setNewLine] = useState(null);

  const handleAddEmployee = useCallback(
    employee => {
      const alreadyExists = lines.some(line => line.id === employee.id);
      if (!alreadyExists) {
        const updatedLines = [...lines, employee];
        setLines(updatedLines);
        onChange(updatedLines);
      }
      setNewLine(null);
    },
    [lines, onChange],
  );

  return (
    <>
      <ViewAllEditList
        title={I18n.t(title)}
        lines={lines}
        currentLineId={readonly ? null : newLine?.id}
        setLines={setLines}
        translator={I18n.t}
      />
      {!newLine && (
        <EmployeeSearchBar
          showTitle={false}
          defaultValue={newLine}
          onChange={employee => {
            if (employee) {
              handleAddEmployee({
                id: employee.id,
                name: employee.name,
              });
            }
          }}
        />
      )}
    </>
  );
};

const InvitedCollaboratorViewAllList = ({
  title,
  defaultValue,
  onChange,
  readonly,
}) => {
  return (
    <InvitedCollaboratorViewAllListAux
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
    />
  );
};

export default InvitedCollaboratorViewAllList;
