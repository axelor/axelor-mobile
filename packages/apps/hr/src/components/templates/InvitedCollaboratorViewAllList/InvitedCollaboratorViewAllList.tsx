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

interface InvitedCollaboratorViewAllListProps {
  title?: string;
  defaultValue?: any[] | null;
  onChange: (employees: any[]) => void;
  readonly?: boolean;
}

const InvitedCollaboratorViewAllListAux = ({
  title = 'Hr_InvitedCollaborators',
  defaultValue = null,
  onChange,
  readonly = false,
}: InvitedCollaboratorViewAllListProps) => {
  const I18n = useTranslator();
  const [lines, setLines] = useState(defaultValue ?? []);

  const handleAddEmployee = useCallback(
    employee => {
      setLines(currentLines => {
        const alreadyExists = currentLines.some(
          line => line.id === employee.id,
        );
        if (alreadyExists) return currentLines;

        const updatedLines = [...currentLines, employee];
        onChange(updatedLines);
        return updatedLines;
      });
    },
    [onChange],
  );

  return (
    <>
      <ViewAllEditList
        currentLineId={null}
        title={I18n.t(title)}
        lines={lines}
        setLines={updated => {
          setLines(updated);
          onChange(updated);
        }}
        translator={I18n.t}
      />
      {!readonly && (
        <EmployeeSearchBar
          showTitle={false}
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
}: InvitedCollaboratorViewAllListProps) => {
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
