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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  ImageBubble,
  InfoBubble,
  LabelText,
  useThemeColor,
  Badge,
  StarScore,
} from '@axelor/aos-mobile-ui';
import {useTranslator, useSelector, useDispatch} from '@axelor/aos-mobile-core';
import {Lead} from '../../../../types';
import {updateLeadScore} from '../../../../features/leadSlice';

const LeadHeader = ({idLead, versionLead, colorIndex}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {baseUrl} = useSelector(state => state.auth);
  const {lead} = useSelector(state => state.lead);

  const updateScoreLeadAPI = useCallback(
    newScore => {
      dispatch(
        updateLeadScore({
          leadId: lead.id,
          leadVersion: lead.version,
          newScore: newScore,
        }),
      );
    },
    [dispatch, lead.id, lead.version],
  );

  return (
    <View style={styles.headerContainer}>
      <ImageBubble
        source={{
          uri: `${baseUrl}ws/rest/com.axelor.apps.crm.db.Lead/${idLead}/picture/download?v=${versionLead}&parentId=${idLead}&parentModel=com.axelor.apps.crm.db.Lead&image=true`,
        }}
        listComponent={[
          lead.isDoNotSendEmail ? (
            <InfoBubble
              iconName="user-alt-slash"
              badgeColor={Colors.cautionColor}
              indication={I18n.t('Crm_ThisLeadDoesNotAcceptEmails')}
            />
          ) : null,
          lead.isDoNotCall ? (
            <InfoBubble
              iconName="phone-slash"
              badgeColor={Colors.cautionColor}
              indication={I18n.t('Crm_ThisLeadDoesNotAcceptCall')}
            />
          ) : null,
        ]}
      />
      <View style={styles.headerInfo}>
        <Text style={styles.textTitle}>{lead.simpleFullName}</Text>
        {lead.enterpriseName && (
          <LabelText iconName="building" title={lead.enterpriseName} />
        )}
        {lead.jobTitleFunction?.name && (
          <LabelText iconName="suitcase" title={lead.jobTitleFunction?.name} />
        )}
      </View>
      <View style={styles.headerInfo}>
        {lead.leadStatus && (
          <Badge
            color={Lead.getStatusColor(colorIndex, Colors)}
            title={lead.leadStatus.name}
          />
        )}
        <StarScore
          style={styles.leadScoring}
          score={lead.leadScoringSelect}
          showMissingStar={true}
          onPress={updateScoreLeadAPI}
          editMode={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 30,
  },
  headerInfo: {
    flexDirection: 'column',
  },
  textTitle: {
    fontWeight: 'bold',
  },
  leadScoring: {
    marginTop: '10%',
  },
});

export default LeadHeader;
