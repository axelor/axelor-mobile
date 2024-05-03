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

import React from 'react';
import {StyleSheet} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {DropdownContactView} from '@axelor/aos-mobile-crm';
import {DropdownGeneralView} from '../../molecules';

interface DropdownCardsProps {
  intervention: any;
}

const DropdownCards = ({intervention}: DropdownCardsProps) => {
  const I18n = useTranslator();

  return (
    <DropdownCardSwitch
      styleTitle={styles.dropdownTitle}
      dropdownItems={[
        {
          title: I18n.t('Crm_Contact'),
          childrenComp: (
            <DropdownContactView
              address={intervention.address.fullName}
              fixedPhone={intervention.contact?.fixedPhone}
              mobilePhone={intervention.contact?.mobilePhone}
              emailAddress={intervention.contact?.emailAddress?.address}
            />
          ),
          key: 1,
        },
        {
          title: I18n.t('Crm_GeneralInformation'),
          childrenComp: (
            <DropdownGeneralView
              assignedToName={intervention.assignedTo?.fullName}
              interventionTypeName={intervention.interventionType?.name}
              description={intervention.description}
              onCallManagement={intervention.customerRequest?.onCallManagement}
            />
          ),
          key: 2,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  dropdownTitle: {
    fontWeight: 'bold',
  },
});

export default DropdownCards;
