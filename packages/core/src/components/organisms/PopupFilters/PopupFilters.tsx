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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Alert, RadioSelect} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {useActiveFilter} from '../../../hooks/use-active-filter';
import {filterProvider} from '../../../header/FilterProvider';

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
  const {activeFilter} = useActiveFilter();

  const [selectedFilter, setSelectedFilter] = useState(activeFilter);

  useEffect(() => {
    if (visible) {
      setSelectedFilter(activeFilter);
    }
  }, [activeFilter, visible]);

  const handleConfirm = useCallback(() => {
    filterProvider.setActiveFilter(selectedFilter);
    onClose();
  }, [onClose, selectedFilter]);

  const handleFilterSelection = (filterId: string) => {
    setSelectedFilter(prevFilter =>
      prevFilter === filterId ? null : filterId,
    );
  };

  const renderRadioSelect = (filters: any[], titleKey: string) => {
    if (filters.length === 0) return null;

    return (
      <RadioSelect
        style={styles.container}
        question={I18n.t(titleKey)}
        items={filters.map(filter => ({
          id: filter.id || filter.name,
          title: filter.title || filter.name,
        }))}
        onChange={handleFilterSelection}
        defaultValue={selectedFilter}
        direction="column"
        radioButtonStyle={styles.radioButtonStyle}
      />
    );
  };

  return (
    <Alert
      visible={visible}
      title={I18n.t('Base_SelectFilter')}
      cancelButtonConfig={{onPress: onClose}}
      confirmButtonConfig={{onPress: handleConfirm}}
      translator={I18n.t}>
      {renderRadioSelect(savedFilters, 'Base_Filters')}
      {renderRadioSelect(userFilters, 'Base_MyFilters')}
    </Alert>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  radioButtonStyle: {
    flex: null,
  },
});

export default PopupFilters;
