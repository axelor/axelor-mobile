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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  createOpportunity,
  updateOpportunity,
} from '../../../../features/opportunitySlice';

const OpportunityValidateButton = ({_opportunity, idOpportunity, disabled}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {company} = useSelector(state => state.crm_company);

  const createOpportinityAPI = useCallback(() => {
    dispatch(
      createOpportunity({
        opportunity: {
          ..._opportunity,
          user: {id: user.id},
          partner: {id: _opportunity.partner?.id},
          contact: {id: _opportunity.contact?.id},
          name: _opportunity.partner?.fullName,
          amount: _opportunity.amount,
          recurrentAmount: _opportunity.recurrentAmount,
          company: user.activeCompany,
          team: user.activeTeam,
          opportunityStatus: _opportunity.opportunityStatus,
          currency: company?.currency,
        },
      }),
    );

    navigation.navigate('OpportunityListScreen');
  }, [dispatch, _opportunity, user, navigation, company]);

  const updateOpportunityAPI = useCallback(() => {
    dispatch(
      updateOpportunity({
        opportunity: {
          ..._opportunity,
          id: _opportunity.id,
          name: _opportunity.partner?.fullName,
          version: _opportunity.version,
          partner: {id: _opportunity.partner?.id},
          contact: {id: _opportunity.contact?.id},
        },
      }),
    );

    navigation.navigate('OpportunityDetailsScreen', {
      opportunityId: _opportunity.id,
    });
  }, [dispatch, _opportunity, navigation]);

  return (
    <View style={styles.button_container}>
      <Button
        title={I18n.t('Base_Save')}
        onPress={
          idOpportunity != null ? updateOpportunityAPI : createOpportinityAPI
        }
        disabled={disabled}
        color={disabled ? Colors.secondaryColor : Colors.primaryColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button_container: {
    marginVertical: '1%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default OpportunityValidateButton;
