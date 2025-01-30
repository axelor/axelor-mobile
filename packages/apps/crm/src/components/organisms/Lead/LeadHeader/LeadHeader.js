/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
  checkNullString,
} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useSelector,
  useDispatch,
  SocialNetworkLinks,
} from '@axelor/aos-mobile-core';
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
      <View style={styles.headerLeft}>
        <ImageBubble
          source={{
            uri: `${baseUrl}ws/rest/com.axelor.apps.crm.db.Lead/${idLead}/picture/download?v=${versionLead}&parentId=${idLead}&parentModel=com.axelor.apps.crm.db.Lead&image=true`,
          }}
          listComponent={[
            lead.isDoNotSendEmail ? (
              <InfoBubble
                iconName="envelope-slash-fill"
                badgeColor={Colors.cautionColor}
                indication={I18n.t('Crm_ThisLeadDoesNotAcceptEmails')}
              />
            ) : null,
            lead.isDoNotCall ? (
              <InfoBubble
                iconName="telephone-x-fill"
                badgeColor={Colors.cautionColor}
                indication={I18n.t('Crm_ThisLeadDoesNotAcceptCall')}
              />
            ) : null,
          ]}
        />
        <SocialNetworkLinks
          data={{
            fullName: lead?.simpleFullName,
            company: lead?.enterpriseName,
          }}
        />
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.textTitle}>{lead.simpleFullName}</Text>
        {!checkNullString(lead.enterpriseName) && (
          <LabelText iconName="building-fill" title={lead.enterpriseName} />
        )}
        {!checkNullString(lead.jobTitleFunction?.name) && (
          <LabelText
            iconName="suitcase-lg-fill"
            title={lead.jobTitleFunction?.name}
          />
        )}
      </View>
      <View style={styles.headerInfo}>
        {lead.leadStatus != null && (
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
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'column',
    alignItems: 'center',
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
