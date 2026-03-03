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

import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {useTranslator, useSelector, useDispatch} from '@axelor/aos-mobile-core';
import {
  DropdownContactView,
  DropdownEventView,
  DropdownGeneralView,
} from '../../../organisms';
import {fetchLeadById} from '../../../../features/leadSlice';
import {searchEventById} from '../../../../features/eventSlice';

const LeadDropdownCards = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {lead} = useSelector(state => state.lead);
  const {listEventById} = useSelector(state => state.event);

  useEffect(() => {
    if (lead.eventList?.length > 0) {
      const idList = lead.eventList?.map(item => item.id);
      dispatch(searchEventById(idList));
    }
  }, [dispatch, lead.eventList]);

  return (
    <View style={styles.container}>
      <DropdownCardSwitch
        styleTitle={styles.textTitle}
        dropdownItems={[
          {
            title: I18n.t('Crm_Contact'),
            key: 1,
            childrenComp: (
              <DropdownContactView
                contact={lead}
                isLead
                refreshContactInfos={() =>
                  dispatch(fetchLeadById({leadId: lead.id}))
                }
              />
            ),
            isDefaultVisible: true,
          },
          {
            title: I18n.t('Crm_GeneralInformation'),
            key: 2,
            childrenComp: (
              <DropdownGeneralView
                assignedUser={lead.user?.fullName}
                category={lead.type?.name}
                industrySector={lead.industrySector?.name}
              />
            ),
          },
          {
            title: I18n.t('Crm_Events'),
            key: 3,
            childrenComp: <DropdownEventView eventList={listEventById} />,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default LeadDropdownCards;
