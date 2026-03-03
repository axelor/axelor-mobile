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
import {UserSearchBar, useSelector} from '@axelor/aos-mobile-core';
import {ToggleButton} from '@axelor/aos-mobile-ui';

interface AuthorFilterProps {
  author: any;
  setAuthor: (author: any) => void;
}

const AuthorFilter = ({author, setAuthor}: AuthorFilterProps) => {
  const {user} = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <ToggleButton
        isActive={author?.id === user?.id}
        onPress={() =>
          setAuthor(current => (current?.id === user?.id ? null : user))
        }
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
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

export default AuthorFilter;
