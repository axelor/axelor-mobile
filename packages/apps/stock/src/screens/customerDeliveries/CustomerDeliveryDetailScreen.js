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

import React, {useCallback, useEffect, useMemo} from 'react';
import {
  Screen,
  KeyboardAvoidingScrollView,
  HeaderContainer,
  NotesCard,
  DropdownCardSwitch,
} from '@axelor/aos-mobile-ui';
import {
  useContextRegister,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  CustomerDeliveryHeader,
  CustomerDeliverySearchLineContainer,
  CustomerDeliveryMovementIndicationCard,
  CustomerDeliveryRealizeButton,
  CustomerDeliveryNotes,
  FreightCarrierCard,
} from '../../components';
import {fetchCustomerDelivery} from '../../features/customerDeliverySlice';

const CustomerDeliveryDetailScreen = ({route}) => {
  const customerDeliveryId = route.params.customerDeliveryId;
  const I18n = useTranslator();
  const dispatch = useDispatch();
  useContextRegister({
    models: [
      {model: 'com.axelor.apps.stock.db.StockMove', id: customerDeliveryId},
    ],
  });

  const {loading, customerDelivery} = useSelector(
    state => state.customerDelivery,
  );

  const getCustomerDelivery = useCallback(() => {
    dispatch(fetchCustomerDelivery({customerDeliveryId: customerDeliveryId}));
  }, [customerDeliveryId, dispatch]);

  useEffect(() => {
    getCustomerDelivery();
  }, [getCustomerDelivery]);

  const dropdownItems = useMemo(() => {
    const _dropdownItems = [
      {
        title: I18n.t('Stock_FreightCarrier'),
        key: 1,
        childrenComp: (
          <FreightCarrierCard
            freightCarrier={customerDelivery?.freightCarrierMode}
            incoterm={customerDelivery?.incoterm?.fullname}
            trackingNumber={customerDelivery?.trackingNumber}
            modeOfTransport={customerDelivery?.modeOfTransport}
            numOfPalettes={customerDelivery?.numOfPalettes}
            numOfPackages={customerDelivery?.numOfPackages}
            grossMass={customerDelivery?.grossMass}
            signatoryUser={customerDelivery?.signatoryUser?.fullName}
            forwarderPartner={customerDelivery?.forwarderPartner?.fullName}
            isConformityCertifSigned={
              customerDelivery?.isConformityCertifSigned
            }
            isNeedingConformityCertificate={
              customerDelivery?.isNeedingConformityCertificate
            }
            isIspmRequired={customerDelivery?.isIspmRequired}
          />
        ),
      },
    ];

    return _dropdownItems;
  }, [
    I18n,
    customerDelivery?.forwarderPartner?.fullName,
    customerDelivery?.freightCarrierMode,
    customerDelivery?.grossMass,
    customerDelivery?.incoterm?.fullname,
    customerDelivery?.isConformityCertifSigned,
    customerDelivery?.isIspmRequired,
    customerDelivery?.isNeedingConformityCertificate,
    customerDelivery?.modeOfTransport,
    customerDelivery?.numOfPackages,
    customerDelivery?.numOfPalettes,
    customerDelivery?.signatoryUser?.fullName,
    customerDelivery?.trackingNumber,
  ]);

  if (customerDelivery?.id !== customerDeliveryId) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <CustomerDeliveryRealizeButton customerDelivery={customerDelivery} />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <CustomerDeliveryHeader customerDelivery={customerDelivery} />
        }
      />
      <KeyboardAvoidingScrollView
        refresh={{loading, fetcher: getCustomerDelivery}}>
        <CustomerDeliveryMovementIndicationCard
          customerDelivery={customerDelivery}
        />
        <CustomerDeliverySearchLineContainer />
        <CustomerDeliveryNotes notes={customerDelivery?.note} />
        <NotesCard
          title={I18n.t('Stock_PickingOrderComments')}
          data={customerDelivery?.pickingOrderComments}
        />
        <NotesCard
          title={I18n.t('Stock_DeliveryCondition')}
          data={customerDelivery?.deliveryCondition}
        />
        <DropdownCardSwitch dropdownItems={dropdownItems} multiSelection />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

export default CustomerDeliveryDetailScreen;
