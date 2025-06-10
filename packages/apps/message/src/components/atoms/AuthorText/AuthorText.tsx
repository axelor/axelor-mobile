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

import React from 'react';
import {StyleSheet} from 'react-native';
import {getFromNowDate, useSelector} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';

interface AuthorTextProps {
  author: string;
  eventText: string;
  eventTime: string;
}

const AuthorText = ({author, eventText, eventTime}: AuthorTextProps) => {
  const {user} = useSelector(state => state.user);

  return (
    <Text style={styles.author} fontSize={12}>
      <Text writingType="important" fontSize={12}>
        {author}{' '}
      </Text>
      {eventText}
      {' - '}
      <Text writingType="details" fontSize={12}>
        {getFromNowDate(eventTime, user?.localization?.language?.code)}
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  author: {
    paddingLeft: 10,
  },
});

export default AuthorText;
