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

import React, {useCallback, useMemo, useState} from 'react';
import {useTranslator} from '@axelor/aos-mobile-core';
import {ViewAllEditList} from '@axelor/aos-mobile-ui';
import {EmployeeSearchBar} from '../../templates';

interface InvitedCollaboratorViewAllListProps {
  title?: string;
  defaultValue?: any[];
  objectState?: any;
  onChange: (employees: any[]) => void;
  readonly?: boolean;
}

const InvitedCollaboratorViewAllListAux = ({
  title = 'Hr_InvitedCollaborators',
  defaultValue,
  objectState,
  onChange,
  readonly = false,
}: InvitedCollaboratorViewAllListProps) => {
  const I18n = useTranslator();

  const [lines, setLines] = useState(defaultValue ?? []);

  const handleChange = useCallback(
    (updated: any[]) => {
      setLines(updated);
      onChange(updated);
    },
    [onChange],
  );

  const handleAddEmployee = useCallback(
    (employee: any) => {
      if (employee != null) {
        setLines(currentLines => {
          const updatedLines = [...currentLines, employee].filter(
            ({id}, idx, self) => self.findIndex(_e => _e.id === id) === idx,
          );

          onChange(updatedLines);
          return updatedLines;
        });
      }
    },
    [onChange],
  );

  const employeeFilters = useMemo(
    () => ({hireDate: objectState?.expenseDate}),
    [objectState?.expenseDate],
  );

  return (
    <>
      <ViewAllEditList
        currentLineId={null}
        title={I18n.t(title)}
        lines={lines}
        setLines={handleChange}
        translator={I18n.t}
      />
      {!readonly && (
        <EmployeeSearchBar
          placeholderKey="Hr_AddCollaborator"
          showTitle={false}
          additionnalFilters={employeeFilters}
          onChange={handleAddEmployee}
        />
      )}
    </>
  );
};

const InvitedCollaboratorViewAllList = (
  props: InvitedCollaboratorViewAllListProps,
) => {
  return <InvitedCollaboratorViewAllListAux {...props} />;
};

export default InvitedCollaboratorViewAllList;
