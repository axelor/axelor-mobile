/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useCallback, useMemo} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch, useThemeColor, Text} from '@axelor/aos-mobile-ui';
import {searchProject} from '../../../features/projectSlice';

const ProjectSearchBar = ({defaultValue = null, onChange = console.log}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const Colors = useThemeColor();

  const {projectList, loadingProject, moreLoading, isListEnd} = useSelector(
    state => state.project,
  );
  const {user} = useSelector(state => state.user);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const searchProjectAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        searchProject({
          page,
          searchValue,
          activeCompanyId: user?.activeCompany?.id,
        }),
      );
    },
    [dispatch, user?.activeCompany?.id],
  );

  const displayItemFullname = item => item.fullName;

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null]}>
      <Text style={styles.title}>{I18n.t('Hr_Project')}</Text>
      <AutoCompleteSearch
        style={[defaultValue == null ? styles.requiredBorder : null]}
        objectList={projectList}
        value={defaultValue}
        onChangeValue={onChange}
        fetchData={searchProjectAPI}
        displayValue={displayItemFullname}
        placeholder={I18n.t('Hr_Project')}
        showDetailsPopup={true}
        loadingList={loadingProject}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        navigate={false}
        oneFilter={false}
        isFocus={false}
      />
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    searchBar: {
      width: '100%',
      marginLeft: 5,
    },
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
    container: {
      zIndex: 41,
    },
    title: {
      marginHorizontal: 24,
    },
  });

export default ProjectSearchBar;
