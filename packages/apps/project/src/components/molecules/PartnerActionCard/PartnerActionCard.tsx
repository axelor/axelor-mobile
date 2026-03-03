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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {isEmpty, linkingProvider, useTranslator} from '@axelor/aos-mobile-core';
import {PartnerCard} from '../../atoms';

interface PartnerProps {
  id: number;
  picture: any;
  simpleFullName: string;
  name: string;
  partnerSeq: string;
  jobTitleFunction?: any;
  mainAddress?: any;
  fixedPhone?: string;
  mobilePhone?: string;
}

interface PartnerActionCardProps {
  style?: any;
  partner: PartnerProps;
  isContact?: boolean;
}

const PartnerActionCard = ({
  style,
  partner,
  isContact = false,
}: PartnerActionCardProps) => {
  const I18n = useTranslator();

  const actionList = useMemo(
    () => [
      {
        iconName: 'telephone-fill',
        helper: I18n.t('Project_Call'),
        hidden:
          !isContact ||
          (partner?.mobilePhone == null && partner?.fixedPhone == null),
        onPress: () =>
          linkingProvider.openCallApp(
            partner.mobilePhone ?? partner.fixedPhone,
          ),
      },
      {
        iconName: 'geo-alt-fill',
        helper: I18n.t('Project_OpenMap'),
        hidden: partner?.mainAddress == null,
        onPress: () => linkingProvider.openMapApp(partner.mainAddress.fullName),
      },
    ],
    [I18n, isContact, partner],
  );

  if (isEmpty(partner)) {
    return null;
  }

  return (
    <ActionCard
      style={[styles.container, style]}
      actionList={actionList}
      translator={I18n.t}>
      <PartnerCard
        picture={partner.picture}
        name={isContact ? partner.simpleFullName : partner.name}
        code={partner.partnerSeq}
        jobName={partner.jobTitleFunction?.name}
        id={partner.id}
        isContact={isContact}
      />
    </ActionCard>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
});

export default PartnerActionCard;
