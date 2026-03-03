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
import {StyleSheet} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {HorizontalRuleText} from '@axelor/aos-mobile-ui';

const HorizontalOrRuleTextAux = ({style}: {style?: any}) => {
  const I18n = useTranslator();

  return (
    <HorizontalRuleText
      text={I18n.t('Purchase_Or')}
      style={[styles.rule, style]}
    />
  );
};

const HorizontalOrRuleText = ({style}: {style?: any}) => {
  return <HorizontalOrRuleTextAux style={style} />;
};

const styles = StyleSheet.create({
  rule: {
    width: '80%',
  },
});

export default HorizontalOrRuleText;
