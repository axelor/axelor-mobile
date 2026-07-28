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

import React from 'react';
import {StyleSheet} from 'react-native';
import {DropdownCardSwitch, NotesCard} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {LogisticalFormDropdownGeneralView} from '../../atoms';

interface LogisticalFormDropdownCardsProps {
  logisticalForm: any;
}

const LogisticalFormDropdownCards = ({
  logisticalForm,
}: LogisticalFormDropdownCardsProps) => {
  const I18n = useTranslator();

  return (
    <DropdownCardSwitch
      dropdownItems={[
        {
          key: 1,
          title: I18n.t('Stock_General'),
          iconName: 'info-circle',
          isDefaultVisible: true,
          childrenComp: (
            <LogisticalFormDropdownGeneralView {...logisticalForm} />
          ),
        },
        {
          key: 2,
          title: I18n.t('Stock_Notes'),
          iconName: 'journals',
          childrenComp: (
            <>
              <NotesCard
                style={styles.notes}
                title={I18n.t('Stock_InternalDeliveryComment')}
                data={logisticalForm.internalDeliveryComment}
              />
              <NotesCard
                style={styles.notes}
                title={I18n.t('Stock_ExternalDeliveryComment')}
                data={logisticalForm.externalDeliveryComment}
              />
            </>
          ),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  notes: {
    width: '100%',
  },
});

export default LogisticalFormDropdownCards;
