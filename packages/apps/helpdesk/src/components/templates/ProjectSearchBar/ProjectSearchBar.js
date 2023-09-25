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
import {
  AutoCompleteSearch,
  FormInput,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {searchProject} from '../../../features/projectSlice';
import {displayItemFullname} from '../../../utils/displayers';

const ProjectSearchBar = ({
  style = null,
  title = 'Helpdesk_Project',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {projectList, loadingProject, moreLoading, isListEnd} = useSelector(
    state => state.project,
  );

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const searchProjectAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchProject({page, searchValue}));
    },
    [dispatch],
  );

  if (readonly) {
    return (
      <FormInput
        style={style}
        title={I18n.t(title)}
        readOnly={true}
        defaultValue={defaultValue?.name}
      />
    );
  }

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null]}>
      <Text style={[styles.title]}>{I18n.t(title)}</Text>
      <AutoCompleteSearch
        style={[
          required && defaultValue == null ? styles.requiredBorder : null,
        ]}
        objectList={projectList}
        value={defaultValue}
        onChangeValue={onChange}
        fetchData={searchProjectAPI}
        displayValue={displayItemFullname}
        placeholder={I18n.t(title)}
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
    container: {
      zIndex: 41,
    },
    title: {
      marginHorizontal: 30,
    },
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
  });

export default ProjectSearchBar;
