/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {UserSearchBar, useSelector} from '@axelor/aos-mobile-core';
import {ToggleButton} from '@axelor/aos-mobile-ui';

interface DocumentsFiltersProps {
  author: any;
  setAuthor: (author: any) => void;
}

const DocumentsFilters = ({author, setAuthor}: DocumentsFiltersProps) => {
  const {user} = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <ToggleButton
        isActive={author?.id === user?.id}
        onPress={() => setAuthor(user)}
        buttonConfig={{
          iconName: 'person-fill',
          style: styles.toggleButton,
        }}
      />
      <UserSearchBar
        style={styles.userSearchBar}
        defaultValue={author}
        onChange={setAuthor}
        showTitle={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    width: '10%',
    height: 40,
    marginVertical: 0,
  },
  userSearchBar: {
    width: '88%',
  },
});

export default DocumentsFilters;
