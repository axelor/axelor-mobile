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

import React, {ReactNode, useMemo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {DropdownCard} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {DEFAULT_COLSPAN, DisplayField, DisplayPanel} from '../../../forms';

interface PanelProps {
  renderItem: (item: DisplayPanel | DisplayField) => ReactNode;
  _panel: DisplayPanel;
}

const Panel = ({renderItem, _panel}: PanelProps) => {
  const I18n = useTranslator();

  const panelStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      alignItems: 'center',
      flexDirection: _panel.direction ?? 'row',
      width: `${
        _panel.colSpan > 0 && _panel.colSpan < 12
          ? (Math.min(_panel.colSpan, DEFAULT_COLSPAN) / DEFAULT_COLSPAN) * 100
          : _panel.parent == null
          ? 100
          : 90
      }%`,
      paddingHorizontal: _panel.parent != null ? null : 17,
      paddingLeft: _panel.parent != null ? 5 : null,
      paddingRight: _panel.parent != null ? 5 : null,
    }),
    [_panel],
  );

  if (!Array.isArray(_panel.content) || _panel.content.length === 0) {
    return <View key={_panel.key} style={panelStyle} />;
  }

  if (_panel.isCollaspible) {
    return (
      <DropdownCard key={_panel.key} title={I18n.t(_panel.titleKey)}>
        {_panel.content.map(renderItem)}
      </DropdownCard>
    );
  }

  return (
    <View key={_panel.key} style={panelStyle}>
      {_panel.content.map(renderItem)}
    </View>
  );
};

export default Panel;
