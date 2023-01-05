import React from 'react';
import {FromTo, TitledValue} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import OperationOrder from '../../../types/operation-order';

interface OperationOrderDatesCardProps {
  status: number;
  startDate: string;
  endDate: string;
}

function OperationOrderDatesCard({
  status,
  startDate,
  endDate,
}: OperationOrderDatesCardProps) {
  const I18n = useTranslator();

  return (
    <FromTo
      fromComponent={
        <TitledValue
          title={
            status === OperationOrder.status.Draft ||
            status === OperationOrder.status.Planned
              ? I18n.t('Base_Estimated')
              : I18n.t('Base_Real')
          }
          value={startDate}
        />
      }
      toComponent={
        <TitledValue
          title={
            status === OperationOrder.status.Finished
              ? I18n.t('Base_Real')
              : I18n.t('Base_Estimated')
          }
          value={endDate}
        />
      }
    />
  );
}

export default OperationOrderDatesCard;
