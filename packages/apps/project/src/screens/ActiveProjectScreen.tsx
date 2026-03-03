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

import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  fetchActiveUser,
  useDispatch,
  useIsFocused,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Label, Screen} from '@axelor/aos-mobile-ui';
import ProjectDetailsScreen from './ProjectDetailsScreen';

const ActiveProjectScreen = ({}) => {
  const I18n = useTranslator();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);

  useEffect(() => {
    if (isFocused) {
      dispatch((fetchActiveUser as any)(user?.id));
    }
  }, [dispatch, isFocused, user.id]);

  if (user.activeProject?.id) {
    return <ProjectDetailsScreen projectId={user.activeProject?.id} />;
  } else {
    return (
      <Screen removeSpaceOnTop={true}>
        <Label
          style={styles.label}
          message={I18n.t('Project_NoActiveProject')}
          type="info"
        />
      </Screen>
    );
  }
};

const styles = StyleSheet.create({
  label: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default ActiveProjectScreen;
