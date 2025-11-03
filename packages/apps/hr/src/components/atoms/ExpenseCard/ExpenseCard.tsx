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

import React, {useMemo} from 'react';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useSelector,
  usePermitted,
  useTypes,
} from '@axelor/aos-mobile-core';
import LiteExpenseCard from './LiteExpenceCard';

interface ExpenseCardProps {
  statusSelect: number;
  expenseId: number;
  expenseSeq: string;
  onPress: () => void;
  onValidate: () => void;
  onSend: () => void;
  periodeCode?: string;
  inTaxTotal?: string;
  companyInTaxTotal?: string;
  currency?: any;
  employeeManagerId?: number;
  employeeName?: string;
}

const ExpenseCard = ({
  onPress,
  onValidate = () => {},
  onSend = () => {},
  statusSelect,
  expenseId,
  expenseSeq,
  periodeCode,
  inTaxTotal,
  companyInTaxTotal,
  currency,
  employeeManagerId,
  employeeName,
}: ExpenseCardProps) => {
  const I18n = useTranslator();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.Expense',
  });
  const {Expense} = useTypes();

  const {user} = useSelector((state: any) => state.user);

  const userCanValidate = useMemo(() => {
    if (
      (user?.employee?.hrManager || employeeManagerId === user.id) &&
      statusSelect === Expense?.statusSelect.WaitingValidation
    ) {
      return true;
    }
    return false;
  }, [
    Expense?.statusSelect,
    employeeManagerId,
    statusSelect,
    user?.employee?.hrManager,
    user.id,
  ]);

  const isDefaultDisplay = useMemo(() => {
    return (
      readonly ||
      ((statusSelect !== Expense?.statusSelect.WaitingValidation ||
        !userCanValidate) &&
        statusSelect !== Expense?.statusSelect.Draft)
    );
  }, [Expense?.statusSelect, readonly, statusSelect, userCanValidate]);

  return (
    <ActionCard
      translator={I18n.t}
      actionList={
        !isDefaultDisplay && [
          {
            iconName: 'send-fill',
            helper: I18n.t('Hr_Send'),
            onPress: onSend,
            hidden: statusSelect !== Expense?.statusSelect.Draft,
          },
          {
            iconName: 'check-lg',
            helper: I18n.t('Hr_Validate'),
            onPress: onValidate,
            hidden: statusSelect === Expense?.statusSelect.Draft,
          },
        ]
      }>
      <LiteExpenseCard
        onPress={onPress}
        statusSelect={statusSelect}
        expenseId={expenseId}
        expenseSeq={expenseSeq}
        periodeCode={periodeCode}
        inTaxTotal={inTaxTotal}
        companyInTaxTotal={companyInTaxTotal}
        currency={currency}
        employeeName={employeeName}
      />
    </ActionCard>
  );
};

export default ExpenseCard;
