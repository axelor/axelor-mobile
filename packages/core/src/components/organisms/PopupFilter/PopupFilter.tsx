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

import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Alert, RadioSelect} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';

interface PopupFilterProps {
  visible: boolean;
  onClose: () => void;
  model: string;
  savedFilters: any;
}

const PopupFilter = ({
  visible = false,
  onClose,
  savedFilters,
}: PopupFilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const I18n = useTranslator();

  const handleConfirm = () => {
    if (selectedFilter) {
      console.log('Filtre sélectionné:', selectedFilter);
      onClose();
    }
  };

  return (
    <Alert
      visible={visible}
      title={I18n.t('Base_SelectFilter')}
      cancelButtonConfig={{onPress: onClose}}
      confirmButtonConfig={{onPress: handleConfirm}}
      translator={I18n.t}>
      <View style={styles.container}>
        <RadioSelect
          items={savedFilters.map(filter => ({
            id: filter.name,
            title: filter.title,
          }))}
          onChange={setSelectedFilter}
          direction="column"
          radioButtonStyle={styles.radioButtonStyle}
        />
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
  },
  radioButtonStyle: {
    flex: null,
  },
});

export default PopupFilter;
