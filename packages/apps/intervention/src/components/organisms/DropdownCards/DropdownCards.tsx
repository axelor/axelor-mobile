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

import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {DropdownContactView} from '@axelor/aos-mobile-crm';
import {DropdownGeneralView} from '../../molecules';
import {fetchInterventionById} from '../../../features/interventionSlice';

interface DropdownCardsProps {
  intervention: any;
}

const DropdownCards = ({intervention}: DropdownCardsProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  return (
    <DropdownCardSwitch
      styleTitle={styles.dropdownTitle}
      dropdownItems={[
        {
          title: I18n.t('Crm_Contact'),
          childrenComp: (
            <DropdownContactView
              contact={{
                ...intervention.contact,
                version: intervention.contact?.$version,
                address: intervention.address,
              }}
              refreshContactInfos={() =>
                dispatch(
                  (fetchInterventionById as any)({
                    interventionId: intervention.id,
                  }),
                )
              }
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
