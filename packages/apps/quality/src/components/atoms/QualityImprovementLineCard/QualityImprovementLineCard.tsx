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

import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  HtmlInput,
  Icon,
  ObjectCard,
  Text,
  useDigitFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {QualityImprovementLine} from '../../../types';

/* About five lines of rich text (same cap as the standard ExpandableText). */
const DESCRIPTION_MAX_HEIGHT = 150;

export type QualityImprovementLineType = 'defect' | 'decision';

interface QualityImprovementLineCardProps {
  style?: StyleProp<ViewStyle>;
  type: QualityImprovementLineType;
  line: QualityImprovementLine;
}

const QualityImprovementLineCard = ({
  style,
  type,
  line,
}: QualityImprovementLineCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const formatNumber = useDigitFormat();

  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const title = {
    displayText:
      type === 'defect' ? line?.qiDefault?.name : line?.qiDecision?.name,
    isTitle: true,
    hideIfNull: true,
  };
  const name = {
    indicatorText: `${I18n.t('Quality_Name')} :`,
    displayText: line?.name,
    hideIfNull: true,
  };
  const quantity = {
    indicatorText: `${I18n.t('Quality_Quantity')} :`,
    displayText: line?.quantity != null ? formatNumber(line.quantity) : null,
    hideIfNull: true,
  };
  /* Rich text (HTML): read-only HtmlInput like the standard SaleOrderLineCard,
     hidden when empty once the tags are removed (`<div></div>`), collapsed
     with a chevron to expand like the standard NotesCard. */
  const descriptionText = (line?.description ?? '')
    .replace(/<[^>]*>|&nbsp;/g, '')
    .trim();
  const isDescriptionLong = contentHeight > DESCRIPTION_MAX_HEIGHT;
  const description = {
    displayText: line?.description,
    hideIf: descriptionText === '',
    customComponent: (
      <View style={styles.description}>
        <Text style={styles.descriptionTitle}>
          {`${I18n.t('Base_Description')} :`}
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          disabled={!isDescriptionLong}
          onPress={() => setExpanded(current => !current)}>
          <HtmlInput
            defaultInput={line?.description}
            readonly={true}
            onHeightChange={setContentHeight}
            style={!expanded && styles.descriptionCollapsed}
          />
          {isDescriptionLong && (
            <Icon
              name={expanded ? 'chevron-up' : 'chevron-down'}
              color={Colors.primaryColor.background}
              style={styles.chevron}
            />
          )}
        </TouchableOpacity>
      </View>
    ),
  };
  const responsible = {
    indicatorText: `${I18n.t('Quality_ResponsibleName')} :`,
    displayText: line?.responsiblePartner?.fullName,
    hideIfNull: true,
  };

  return (
    <ObjectCard
      touchable={false}
      showArrow={false}
      style={[styles.card, style]}
      upperTexts={{
        items:
          type === 'defect'
            ? [title, name, quantity, description]
            : [title, quantity, description, responsible],
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 0,
    marginVertical: 4,
  },
  description: {
    /* Full width, or the editor's WebView is 0 px wide in the card column. */
    width: '100%',
    /* The editor has an inner margin: realign its text with the card. */
    marginLeft: -10,
  },
  descriptionTitle: {
    marginLeft: 10,
  },
  descriptionCollapsed: {
    maxHeight: DESCRIPTION_MAX_HEIGHT,
  },
  chevron: {
    alignSelf: 'center',
  },
});

export default QualityImprovementLineCard;
