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

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NumberBubble, useThemeColor} from '@axelor/aos-mobile-ui';
import {DateDisplay, useSelector} from '@axelor/aos-mobile-core';

interface DateSeparatorProps {
  title: string;
  isFirstItem: boolean;
  fetchNumberOfItems: ({
    date,
    userId,
  }: {
    date: string;
    userId: number;
  }) => Promise<any>;
}

const DateSeparator = ({
  title: date,
  fetchNumberOfItems,
  isFirstItem,
}: DateSeparatorProps) => {
  const Colors = useThemeColor();
  const isMounted = useRef(true);

  const [numberItems, setNumberItems] = useState(0);

  const styles = useMemo(() => getSeparatorStyles(isFirstItem), [isFirstItem]);
  const {userId} = useSelector((state: any) => state.auth);

  useEffect(() => {
    isMounted.current = true;

    fetchNumberOfItems({
      date: date,
      userId: userId,
    })
      .then(({data}) => {
        if (isMounted.current) {
          if (data?.total != null) {
            setNumberItems(data?.total);
          } else {
            setNumberItems(0);
          }
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setNumberItems(0);
        }
      });

    return () => {
      isMounted.current = false;
    };
  }, [date, fetchNumberOfItems, userId]);

  return (
    <View style={styles.separatorContainer}>
      <DateDisplay date={date} />
      <NumberBubble
        style={styles.number}
        number={numberItems}
        color={Colors.inverseColor}
        isNeutralBackground={true}
      />
    </View>
  );
};

const getSeparatorStyles = isFirstItem =>
  StyleSheet.create({
    separatorContainer: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: isFirstItem ? 5 : 15,
      marginBottom: 2,
    },
    number: {
      marginLeft: 10,
    },
  });

export default DateSeparator;
