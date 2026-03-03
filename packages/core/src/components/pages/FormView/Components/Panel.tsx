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

import React, {ReactNode, useMemo} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {DropdownCard, HorizontalRule, Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../../i18n';
import {
  DEFAULT_COLSPAN,
  DisplayField,
  DisplayPanel,
  getZIndex,
  getZIndexStyle,
} from '../../../../forms';

interface PanelProps {
  renderItem: (item: DisplayPanel | DisplayField) => ReactNode;
  formContent: (DisplayPanel | DisplayField)[];
  _panel: DisplayPanel;
}

const Panel = ({renderItem, formContent, _panel}: PanelProps) => {
  const I18n = useTranslator();

  const zIndex: number = useMemo(() => {
    return getZIndex(formContent, _panel.key);
  }, [_panel.key, formContent]);

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

  if (_panel.isCollapsible) {
    return (
      <DropdownCard
        key={_panel.key}
        title={I18n.t(_panel.titleKey)}
        styleContainer={getZIndexStyle(zIndex)}>
        <View
          style={[
            styles.content,
            {
              flexDirection: panelStyle.flexDirection,
            },
            getZIndexStyle(zIndex + 1),
          ]}>
          {_panel.content.map(renderItem)}
        </View>
      </DropdownCard>
    );
  }

  if (_panel.titleKey != null) {
    return (
      <View
        key={_panel.key}
        style={[panelStyle, styles.container, getZIndexStyle(zIndex)]}>
        <Text style={styles.title}>{I18n.t(_panel.titleKey)}</Text>
        <HorizontalRule style={styles.line} />
        <View
          style={[
            styles.content,
            {
              flexDirection: panelStyle.flexDirection,
            },
            getZIndexStyle(zIndex + 1),
          ]}>
          {_panel.content.map(renderItem)}
        </View>
      </View>
    );
  }

  return (
    <View key={_panel.key} style={[panelStyle, getZIndexStyle(zIndex)]}>
      {_panel.content.map(renderItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  title: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    marginVertical: 4,
    width: '100%',
    alignSelf: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
});

export default Panel;
