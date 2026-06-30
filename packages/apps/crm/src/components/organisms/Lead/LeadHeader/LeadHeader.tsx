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

import React, {useCallback, useMemo} from 'react';
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
  useTypeHelpers,
  useBinaryPictureUri,
} from '@axelor/aos-mobile-core';
import {updateLeadScore} from '../../../../features/leadSlice';

const LeadHeader = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {getItemColorFromIndex} = useTypeHelpers();
  const formatURI = useBinaryPictureUri();

  const {lead, leadStatusList} = useSelector(state => state.lead);

  const updateScoreLeadAPI = useCallback(
    (newScore: number) => {
      dispatch(
        (updateLeadScore as any)({
          leadId: lead.id,
          leadVersion: lead.version,
          newScore: newScore,
        }),
      );
    },
    [dispatch, lead.id, lead.version],
  );

  const imageIcons = useMemo(() => {
    let result: any[] = [];

    if (lead.isDoNotSendEmail) {
      result.push(
        <InfoBubble
          iconName="envelope-slash-fill"
          badgeColor={Colors.cautionColor}
          indication={I18n.t('Crm_ThisLeadDoesNotAcceptEmails')}
        />,
      );
    }

    if (lead.isDoNotCall) {
      result.push(
        <InfoBubble
          iconName="telephone-x-fill"
          badgeColor={Colors.cautionColor}
          indication={I18n.t('Crm_ThisLeadDoesNotAcceptCall')}
        />,
      );
    }

    return result;
  }, [Colors.cautionColor, I18n, lead.isDoNotCall, lead.isDoNotSendEmail]);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.rowWrapper}>
        <ImageBubble
          style={[
            styles.image,
            {borderColor: Colors.secondaryColor.background_light},
          ]}
          imageSize={50}
          defaultIconSize={50}
          source={formatURI(
            lead.id,
            lead.version,
            'com.axelor.apps.crm.db.Lead',
          )}
          listComponent={imageIcons}
        />
        <View style={styles.headerInfo}>
          <Text writingType="important">{lead.simpleFullName}</Text>
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
        <View style={styles.headerRight}>
          {lead.leadStatus != null && (
            <Badge
              color={getItemColorFromIndex(leadStatusList, lead.leadStatus)}
              title={lead.leadStatus.name}
              textSize={10}
            />
          )}
          <StarScore
            score={lead.leadScoringSelect}
            showMissingStar={true}
            onPress={updateScoreLeadAPI}
            editMode={true}
          />
        </View>
      </View>
      <SocialNetworkLinks
        data={{
          fullName: lead?.simpleFullName,
          company: lead?.enterpriseName,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 6,
    gap: 4,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 30,
    gap: 10,
  },
  image: {
    borderWidth: 0.5,
  },
  headerInfo: {
    flexDirection: 'column',
    gap: 2,
    flex: 1,
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 4,
  },
});

export default LeadHeader;
