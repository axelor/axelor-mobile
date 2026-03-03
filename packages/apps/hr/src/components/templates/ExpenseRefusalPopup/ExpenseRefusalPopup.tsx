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

import React, {useCallback} from 'react';
import {useDispatch} from '@axelor/aos-mobile-core';
import {refuseExpense} from '../../../features/expenseSlice';
import {RefusalPopup} from '../../molecules';

interface ExpenseRefusalPopupProps {
  isOpen: boolean;
  expense?: any;
  expenseMode?: string;
  onCancel: () => void;
}

const ExpenseRefusalPopup = ({
  isOpen,
  expense,
  expenseMode,
  onCancel,
}: ExpenseRefusalPopupProps) => {
  const dispatch = useDispatch();

  const refuseAPI = useCallback(
    (refusalMessage: string) => {
      dispatch(
        (refuseExpense as any)({
          expenseId: expense.id,
          version: expense.version,
          groundForRefusal: refusalMessage,
          mode: expenseMode,
        }),
      );
    },
    [dispatch, expense, expenseMode],
  );

  return (
    <RefusalPopup isOpen={isOpen} onCancel={onCancel} onValidate={refuseAPI} />
  );
};

export default ExpenseRefusalPopup;
