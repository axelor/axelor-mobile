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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ActionCard,
  checkNullString,
  ObjectCard,
  Text,
} from '@axelor/aos-mobile-ui';
import {
  AnomalyBubble,
  useTranslator,
  useSelector,
  usePermitted,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';

interface ExpenseCardProps {
  statusSelect: number;
  expenseId: number;
  expenseSeq: string;
  onPress: () => void;
  onValidate: () => void;
  onSend: () => void;
  periodeCode?: string;
  inTaxTotal?: string;
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
  employeeManagerId,
  employeeName,
}: ExpenseCardProps) => {
  const I18n = useTranslator();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.Expense',
  });
  const {Expense} = useTypes();
  const {getItemColor} = useTypeHelpers();

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

  const borderStyle = useMemo(() => {
    return getBorderStyle(
      getItemColor(Expense?.statusSelect, statusSelect)?.background,
    ).border;
  }, [Expense?.statusSelect, getItemColor, statusSelect]);

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
      <ObjectCard
        onPress={onPress}
        style={borderStyle}
        leftContainerFlex={2}
        iconLeftMargin={10}
        upperTexts={{
          items: [
            {
              customComponent: (
                <View style={styles.titleContainer}>
                  <AnomalyBubble
                    objectName="expense"
                    objectId={expenseId}
                    isIndicationDisabled
                  />
                  <Text writingType="title" style={styles.titleText}>
                    {expenseSeq}
                  </Text>
                </View>
              ),
            },
            {
              displayText: `${I18n.t('Hr_Period')} : ${periodeCode}`,
              hideIf: checkNullString(periodeCode),
            },
            {
              iconName: 'person-fill',
              indicatorText: employeeName,
              hideIfNull: true,
            },
          ],
        }}
        sideBadges={{
          items: [
            {
              customComponent: !checkNullString(inTaxTotal) && (
                <Text style={styles.price}>{`${inTaxTotal} ${
                  user?.activeCompany?.currency?.symbol != null
                    ? user?.activeCompany?.currency?.symbol
                    : user?.activeCompany?.currency?.code
                }`}</Text>
              ),
            },
          ],
        }}
      />
    </ActionCard>
  );
};

const getBorderStyle = (color: string) =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
      marginHorizontal: 0,
      marginVertical: 2,
    },
  });

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
  },
  titleText: {
    alignSelf: 'center',
    marginLeft: 5,
  },
  price: {
    textAlign: 'right',
  },
});

export default ExpenseCard;
