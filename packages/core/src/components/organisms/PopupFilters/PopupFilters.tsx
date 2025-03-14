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

import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Alert, RadioSelect} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';

interface PopupFiltersProps {
  visible: boolean;
  onClose: () => void;
  savedFilters: any[];
  userFilters: any[];
}

const PopupFilters = ({
  visible = false,
  onClose,
  savedFilters = [],
  userFilters = [],
}: PopupFiltersProps) => {
  const I18n = useTranslator();

  const [selectedSavedFilter, setSelectedSavedFilter] = useState<string | null>(
    null,
  );
  const [selectedUserFilter, setSelectedUserFilter] = useState<string | null>(
    null,
  );

  const handleConfirm = useCallback(() => {
    const selectedFilter = selectedSavedFilter ?? selectedUserFilter;
    if (selectedFilter) {
      console.log('selectedFilter', selectedFilter);
    }
    onClose();
  }, [onClose, selectedSavedFilter, selectedUserFilter]);

  const handleSavedFilterSelection = useCallback((filterId: string) => {
    setSelectedSavedFilter(filterId);
    setSelectedUserFilter(null);
  }, []);

  const handleUserFilterSelection = useCallback((filterId: string) => {
    setSelectedUserFilter(filterId);
    setSelectedSavedFilter(null);
  }, []);

  const renderRadioSelect = (
    filters: any[],
    titleKey: string,
    selectedFilter: string | null,
    onSelect: (filterId: string) => void,
  ) => {
    if (filters?.length === 0) return null;

    return (
      <View style={styles.container}>
        <RadioSelect
          question={I18n.t(titleKey)}
          items={filters.map(filter => ({
            id: filter.id || filter.name,
            title: filter.title || filter.name,
          }))}
          onChange={onSelect}
          defaultValue={selectedFilter}
          direction="column"
          radioButtonStyle={styles.radioButtonStyle}
        />
      </View>
    );
  };

  return (
    <Alert
      visible={visible}
      title={I18n.t('Base_SelectFilter')}
      cancelButtonConfig={{onPress: onClose}}
      confirmButtonConfig={{onPress: handleConfirm}}
      translator={I18n.t}>
      {renderRadioSelect(
        savedFilters,
        'Base_Filters',
        selectedSavedFilter,
        handleSavedFilterSelection,
      )}
      {renderRadioSelect(
        userFilters,
        'Base_MyFilters',
        selectedUserFilter,
        handleUserFilterSelection,
      )}
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

export default PopupFilters;
