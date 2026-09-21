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
import {StyleSheet, View} from 'react-native';
import {DropdownCard, LabelText} from '@axelor/aos-mobile-ui';
import {ControlTypeFieldValue} from '../../../types';

interface ControlEntryReferenceValuesProps {
  style?: any;
  title?: string;
  values?: ControlTypeFieldValue[];
}

const ControlEntryReferenceValues = ({
  style,
  title,
  values = [],
}: ControlEntryReferenceValuesProps) => {
  return (
    <DropdownCard style={[styles.card, style]} title={title ?? ''}>
      <View style={styles.values}>
        {values.map(_value => (
          <LabelText
            key={_value.id}
            title={`${_value.controlTypeField?.name} :`}
            value={_value.displayValue}
          />
        ))}
      </View>
    </DropdownCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
  },
  values: {
    width: '100%',
    gap: 4,
  },
});

export default ControlEntryReferenceValues;
