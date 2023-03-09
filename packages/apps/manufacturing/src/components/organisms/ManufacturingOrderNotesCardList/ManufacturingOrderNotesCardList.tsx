import React from 'react';
import {NotesCard} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface ManufacturingOrderNotesCardListProps {
  manufOrder: any;
}

const ManufacturingOrderNotesCardList = ({
  manufOrder,
}: ManufacturingOrderNotesCardListProps) => {
  const I18n = useTranslator();

  return (
    <>
      <NotesCard title={I18n.t('Manufacturing_Notes')} data={manufOrder.note} />
      <NotesCard
        title={I18n.t('Manufacturing_Notes')}
        data={manufOrder.moCommentFromSaleOrder}
      />
      <NotesCard
        title={I18n.t('Manufacturing_Notes')}
        data={manufOrder.moCommentFromSaleOrderLine}
      />
    </>
  );
};

export default ManufacturingOrderNotesCardList;
