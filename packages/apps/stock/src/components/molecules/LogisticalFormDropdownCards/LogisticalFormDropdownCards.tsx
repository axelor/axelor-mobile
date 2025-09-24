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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {LogisticalFormDropdownGeneralView} from '../../atoms';

interface LogisticalFormDropdownCardsProps {
  logisticalForm?: any;
}

const LogisticalFormDropdownCards = ({
  logisticalForm,
}: LogisticalFormDropdownCardsProps) => {
  const I18n = useTranslator();

  const dropdownItems = useMemo(
    () => [
      {
        key: 1,
        title: I18n.t('Stock_General'),
        isDefaultVisible: true,
        childrenComp: (
          <LogisticalFormDropdownGeneralView
            accountSelectionToCarrierSelect={
              logisticalForm?.accountSelectionToCarrierSelect
            }
            customerAccountNumberToCarrier={
              logisticalForm?.customerAccountNumberToCarrier
            }
            forwarderPartner={logisticalForm?.forwarderPartner}
            incoterm={logisticalForm?.incoterm}
            tracking={logisticalForm?.tracking}
            totalGrossMass={logisticalForm?.totalGrossMass}
            totalNetMass={logisticalForm?.totalNetMass}
            totalVolume={logisticalForm?.totalVolume}
          />
        ),
      },
    ],
    [
      I18n,
      logisticalForm?.accountSelectionToCarrierSelect,
      logisticalForm?.customerAccountNumberToCarrier,
      logisticalForm?.forwarderPartner,
      logisticalForm?.incoterm,
      logisticalForm?.tracking,
      logisticalForm?.totalGrossMass,
      logisticalForm?.totalNetMass,
      logisticalForm?.totalVolume,
    ],
  );

  if (logisticalForm == null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <DropdownCardSwitch
        styleTitle={styles.textTitle}
        style={styles.dropdown}
        dropdownItems={dropdownItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
  },
  dropdown: {
    marginBottom: 0,
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default LogisticalFormDropdownCards;
