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

import React, {ReactNode, useCallback, useMemo} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {
  DropdownCard,
  HorizontalRule,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../../i18n';
import {
  DEFAULT_COLSPAN,
  DisplayField,
  DisplayPanel,
  getColSpanWidth,
  getZIndexStyle,
} from '../../../../forms';

interface PanelProps {
  renderItem: (
    item: DisplayPanel | DisplayField,
    readonly?: boolean,
  ) => ReactNode;
  _panel: DisplayPanel;
  object: any;
  storeState: any;
  parentReadonly?: boolean;
  zIndex: number;
}

const Panel = ({
  renderItem,
  _panel,
  object,
  storeState,
  parentReadonly = false,
  zIndex,
}: PanelProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const isHidden = useMemo(
    () => _panel.hideIf?.({objectState: object, storeState}) ?? false,
    [_panel, object, storeState],
  );

  const isReadonly = useMemo(
    () =>
      parentReadonly ||
      _panel.readonly ||
      _panel.readonlyIf?.({objectState: object, storeState}),
    [_panel, object, parentReadonly, storeState],
  );

  const panelStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      alignItems: 'center',
      flexDirection: _panel.direction ?? 'row',
      width: `${
        _panel.colSpan! > 0 && _panel.colSpan! < 12
          ? (Math.min(_panel.colSpan!, DEFAULT_COLSPAN) / DEFAULT_COLSPAN) * 100
          : _panel.parent == null
            ? 100
            : 90
      }%`,
      paddingHorizontal: _panel.parent != null ? null : 17,
      paddingLeft: _panel.parent != null ? 5 : null,
      paddingRight: _panel.parent != null ? 5 : null,
      gap: 2,
    }),
    [_panel],
  );

  const contentStyle: StyleProp<ViewStyle> = useMemo(() => {
    const flexDirection = _panel.direction ?? 'row';

    return {
      flexDirection,
      flexWrap: flexDirection === 'row' ? 'wrap' : 'nowrap',
    };
  }, [_panel.direction]);

  const collapsibleStyle: StyleProp<ViewStyle> = useMemo(() => {
    const colSpanWidth = getColSpanWidth(_panel.colSpan);

    return colSpanWidth == null
      ? {marginHorizontal: 'auto'}
      : {width: colSpanWidth};
  }, [_panel.colSpan]);

  const renderContent = useCallback(() => {
    return _panel.content?.map(_i => renderItem(_i, isReadonly));
  }, [_panel.content, isReadonly, renderItem]);

  if (isHidden) return null;

  if (!Array.isArray(_panel.content) || _panel.content.length === 0) {
    return <View key={_panel.key} style={panelStyle} />;
  }

  if (_panel.isCollapsible) {
    return (
      <DropdownCard
        key={_panel.key}
        title={I18n.t(_panel.titleKey!)}
        style={[collapsibleStyle, getZIndexStyle(zIndex)]}>
        <View
          style={[styles.content, contentStyle, getZIndexStyle(zIndex + 1)]}>
          {renderContent()}
        </View>
      </DropdownCard>
    );
  }

  if (_panel.titleKey != null) {
    return (
      <View
        key={_panel.key}
        style={[panelStyle, styles.container, getZIndexStyle(zIndex)]}>
        <Text writingType="important" style={styles.title}>
          {I18n.t(_panel.titleKey)}
        </Text>
        <HorizontalRule
          style={styles.line}
          color={Colors.secondaryColor.background_light}
        />
        <View
          style={[styles.content, contentStyle, getZIndexStyle(zIndex + 1)]}>
          {renderContent()}
        </View>
      </View>
    );
  }

  return (
    <View
      key={_panel.key}
      style={[panelStyle, contentStyle, getZIndexStyle(zIndex)]}>
      {renderContent()}
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
