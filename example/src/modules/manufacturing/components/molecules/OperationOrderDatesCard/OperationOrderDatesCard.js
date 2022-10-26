import React from 'react';
import {FromTo, TitledValue} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import OperationOrder from '@/modules/manufacturing/types/operation-order';

function OperationOrderDatesCard({status, startDate, endDate}) {
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
