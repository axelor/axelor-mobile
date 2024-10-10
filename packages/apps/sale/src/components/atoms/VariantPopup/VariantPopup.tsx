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
import {FlatList, StyleSheet, View} from 'react-native';
import {Alert, SingleSelectScrollList, Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface VariantPopupProps {
  alertVisible: boolean;
  handleConfirm: any;
  setAlertVisible: any;
  variantAttributes: any;
  setSelectedVariants: any;
}

const VariantPopup = ({
  alertVisible,
  handleConfirm,
  setAlertVisible,
  variantAttributes,
  setSelectedVariants,
}: VariantPopupProps) => {
  const I18n = useTranslator();

  return (
    <Alert
      visible={alertVisible}
      title={I18n.t('Sale_ChooseVariant')}
      confirmButtonConfig={{
        onPress: handleConfirm,
        title: I18n.t('Base_OK'),
      }}
      cancelButtonConfig={{
        onPress: () => setAlertVisible(false),
        title: I18n.t('Base_Cancel'),
      }}
      style={styles.popup}>
      <FlatList
        style={styles.flalist}
        data={variantAttributes.filter(
          attr => attr.attribute && attr.values.length > 0,
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text>{item.attribute.name}</Text>
            <SingleSelectScrollList
              fetchData={() => {}}
              loadingList={false}
              moreLoading={false}
              rowStyle={styles.select}
              isListEnd={true}
              data={item.values}
              defaultSelected={item.defaultValue}
              onChange={value => {
                setSelectedVariants(prev => {
                  const attributeIndex = variantAttributes.findIndex(
                    attr => attr.attribute.code === item.attribute.code,
                  );

                  return {
                    ...prev,
                    [`productVariantValue${attributeIndex + 1}`]: value,
                  };
                });
              }}
              renderItem={({item: a}) => <Text>{a.name}</Text>}
            />
          </View>
        )}
      />
    </Alert>
  );
};

const styles = StyleSheet.create({
  popup: {
    alignItems: 'flex-start',
  },
  flalist: {
    width: '100%',
  },
  container: {
    marginBottom: 20,
  },
  select: {
    minHeight: 40,
  },
});

export default VariantPopup;
