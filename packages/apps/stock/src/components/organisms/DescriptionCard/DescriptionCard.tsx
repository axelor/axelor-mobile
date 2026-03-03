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
import {Card, EditableInput, Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface DescriptionCardProps {
  isEditable?: boolean;
  description: string;
  onChange: () => void;
}

const DescriptionCard = ({
  isEditable = true,
  description,
  onChange = () => {},
}: DescriptionCardProps) => {
  const I18n = useTranslator();

  return (
    <View>
      {isEditable ? (
        <View>
          <Text style={styles.title}>{I18n.t('Base_Description')}</Text>
          <EditableInput
            defaultValue={description}
            placeholder={I18n.t('Base_Description')}
            onValidate={onChange}
            multiline={true}
            numberOfLines={5}
          />
        </View>
      ) : (
        description != null && (
          <View>
            <Text style={styles.title}>{I18n.t('Base_Description')}</Text>
            <Card>
              <Text numberOfLines={5}>{description}</Text>
            </Card>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 16,
  },
});

export default DescriptionCard;
