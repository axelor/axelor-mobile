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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Badge,
  HeaderContainer,
  Label,
  LabelText,
  Screen,
  ScrollView,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  formatDateTime,
  useContextRegister,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  QualityImprovementLineCard,
  QualityImprovementLineTypeSwitch,
} from '../../components';
import {QualityImprovementLineType} from '../../components/atoms/QualityImprovementLineCard/QualityImprovementLineCard';
import {fetchQualityImprovement} from '../../features/qualityImprovementSlice';
import {
  QI_RESOLUTION_MODEL,
  QUALITY_IMPROVEMENT_MODEL,
} from '../../api/quality-improvement-api';
import {QualityImprovementLine} from '../../types';

interface IdentificationRow {
  iconName: string;
  title: string;
  value?: string | null;
}

const joinLabel = (
  prefix?: string | number | null,
  name?: string | null,
): string | null =>
  name == null ? null : [prefix, name].filter(v => v != null).join(' - ');

const QualityImprovementDetailsScreen = ({
  route,
}: {
  route: {params: {qualityImprovementId: number}};
}) => {
  const {qualityImprovementId} = route.params;
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {QualityImprovement} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();
  const dateTimeFormat = I18n.t('Base_DateTimeFormat');
  const {hidden: resolutionHidden} = usePermitted({
    modelName: QI_RESOLUTION_MODEL,
  });

  const {loadingQualityImprovement, qualityImprovement} = useSelector(
    state => state.quality_qualityImprovement,
  );

  const [mode, setMode] = useState<QualityImprovementLineType>('defect');

  useContextRegister({
    models: [{model: QUALITY_IMPROVEMENT_MODEL, id: qualityImprovementId}],
  });

  const getQualityImprovement = useCallback(() => {
    dispatch(
      fetchQualityImprovement({
        id: qualityImprovementId,
        withResolution: !resolutionHidden,
      }),
    );
  }, [dispatch, qualityImprovementId, resolutionHidden]);

  useEffect(() => {
    getQualityImprovement();
  }, [getQualityImprovement]);

  if (qualityImprovement?.id !== qualityImprovementId) {
    return null;
  }

  const identification = qualityImprovement.qiIdentification ?? {};
  const resolution = qualityImprovement.qiResolution ?? {};
  const gravityColor = getItemColor(
    QualityImprovement?.gravityTypeSelect,
    qualityImprovement.gravityTypeSelect,
  );
  const formatDate = (date?: string | null) =>
    date != null ? formatDateTime(date, dateTimeFormat) : null;

  const renderRows = (rows: IdentificationRow[]) =>
    rows
      .filter(row => !!row.value)
      .map(row => (
        <LabelText
          key={row.title}
          style={styles.label}
          iconName={row.iconName}
          size={18}
          title={`${row.title} :`}
          value={row.value}
        />
      ));

  const mainRows: IdentificationRow[] = [
    {
      iconName: 'search',
      title: I18n.t('Quality_Detection'),
      value: joinLabel(
        qualityImprovement.qiDetection?.code,
        qualityImprovement.qiDetection?.name,
      ),
    },
    {
      iconName: 'person-badge',
      title: I18n.t('Quality_DetectedBy'),
      value: identification.detectedByInternal?.fullName,
    },
    {
      iconName: 'list-ol',
      title: I18n.t('Quality_OperationLine'),
      value: joinLabel(
        identification.operationOrder?.priority,
        identification.operationOrder?.operationName,
      ),
    },
  ];

  const otherRows: IdentificationRow[] = [
    {
      iconName: 'building',
      title: I18n.t('Quality_Customer'),
      value: identification.customerPartner?.simpleFullName,
    },
    {
      iconName: 'card-checklist',
      title: I18n.t('Quality_ControlEntry'),
      value: identification.controlEntry?.name,
    },
    {
      iconName: 'calendar-event',
      title: I18n.t('Quality_WrittenOn'),
      value: formatDate(identification.writtenOn),
    },
    {
      iconName: 'gear-fill',
      title: I18n.t('Quality_ManufOrder'),
      value: identification.manufOrder?.manufOrderSeq,
    },
    {
      iconName: 'box-seam',
      title: I18n.t('Quality_Product'),
      value: identification.product?.fullName,
    },
  ];

  const renderLines = (
    type: QualityImprovementLineType,
    lines: QualityImprovementLine[],
    header?: React.ReactNode,
  ) => (
    <ScrollView
      key={type}
      style={styles.tabContent}
      refresh={{
        loading: loadingQualityImprovement,
        fetcher: getQualityImprovement,
      }}>
      {header}
      {lines.length === 0 ? (
        <Label
          type="info"
          message={I18n.t(
            type === 'defect' ? 'Quality_NoDefect' : 'Quality_NoDecision',
          )}
        />
      ) : (
        lines.map(line => (
          <QualityImprovementLineCard key={line.id} type={type} line={line} />
        ))
      )}
    </ScrollView>
  );

  const defects: QualityImprovementLine[] =
    resolution.qiResolutionDefaultsList ?? [];
  const decisions: QualityImprovementLine[] =
    resolution.qiResolutionDecisionsList ?? [];
  const decisionsHeader = (
    <View style={styles.decisionsHeader}>
      {renderRows([
        {
          iconName: 'person-fill',
          title: I18n.t('Quality_DecisionsWrittenBy'),
          value: resolution.decisionsWrittenBy?.fullName,
        },
        {
          iconName: 'calendar-event',
          title: I18n.t('Quality_DecisionsWrittenOn'),
          value: formatDate(resolution.decisionsWrittenOn),
        },
      ])}
    </View>
  );

  return (
    <Screen>
      <HeaderContainer
        expandableFilter={true}
        forceHideByDefault={true}
        fixedItems={
          <View>
            <View style={styles.header}>
              <Text writingType="title">{qualityImprovement.sequence}</Text>
              <View style={styles.badges}>
                {gravityColor != null && (
                  <Badge
                    title={getItemTitle(
                      QualityImprovement?.gravityTypeSelect,
                      qualityImprovement.gravityTypeSelect,
                    )}
                    color={gravityColor}
                  />
                )}
                {qualityImprovement.qiStatus?.name != null && (
                  <Badge
                    title={qualityImprovement.qiStatus.name}
                    color={Colors.infoColor}
                  />
                )}
              </View>
            </View>
            <View style={styles.identification}>{renderRows(mainRows)}</View>
          </View>
        }
        chipComponent={
          !resolutionHidden && (
            <QualityImprovementLineTypeSwitch
              mode={mode}
              onChange={setMode}
              defectCount={defects.length}
              decisionCount={decisions.length}
            />
          )
        }>
        <View style={styles.identification}>{renderRows(otherRows)}</View>
      </HeaderContainer>
      {!resolutionHidden &&
        (mode === 'defect'
          ? renderLines('defect', defects)
          : renderLines('decision', decisions, decisionsHeader))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 8,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  identification: {
    marginHorizontal: 24,
  },
  label: {
    marginVertical: 2,
  },
  tabContent: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  decisionsHeader: {
    marginBottom: 4,
  },
});

export default QualityImprovementDetailsScreen;
