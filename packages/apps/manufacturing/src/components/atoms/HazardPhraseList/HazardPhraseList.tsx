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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {checkNullString, Text, UnorderedList} from '@axelor/aos-mobile-ui';

interface HazardPhraseListProps {
  data: any[];
  scrollEnabled?: boolean;
}

const HazardPhraseList = ({data, scrollEnabled}: HazardPhraseListProps) => {
  const renderItem = useCallback(({item}: any) => {
    if (!item) return null;

    return (
      <View style={styles.container}>
        <Text>{`${item.phrase} (${item.phraseCode})`}</Text>
        {!checkNullString(item.clpDesignation) && (
          <Text writingType="details">{item.clpDesignation}</Text>
        )}
      </View>
    );
  }, []);

  return (
    <UnorderedList
      data={data}
      renderItem={renderItem}
      style={styles.list}
      scrollEnabled={scrollEnabled}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  container: {
    padding: 5,
  },
});

export default HazardPhraseList;
