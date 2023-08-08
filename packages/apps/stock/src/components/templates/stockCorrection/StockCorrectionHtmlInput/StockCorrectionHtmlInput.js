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

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {FormHtmlInput} from '@axelor/aos-mobile-ui';
import StockCorrection from '../../../../types/stock-corrrection';

const StockCorrectionHtmlInput = ({
  stockCorrection,
  setComments,
  setSaveStatus = () => {},
}) => {
  const I18n = useTranslator();

  const handleCommentsChange = comments => {
    setComments(comments);
    setSaveStatus(false);
  };

  return (
    <View style={styles.content}>
      <FormHtmlInput
        title={I18n.t('Base_Validate')}
        defaultValue={stockCorrection?.comments}
        onChange={handleCommentsChange}
        style={styles.input}
        readonly={
          stockCorrection?.statusSelect === StockCorrection.status.Validated
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignSelf: 'center',
  },

  input: {width: '100%'},
});

export default StockCorrectionHtmlInput;
