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

import React, {useCallback, useMemo} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {
  useThemeColor,
  Card,
  Text,
  InfoBubble,
  Icon,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {sessionStorage} from '../../../sessions';
import {LogoImage} from '../../organisms';
import {SessionNumberIndicator} from '../../molecules';

const SessionListCard = ({
  sessionList,
  onChange,
  logoFile,
  setPopupSessionIsOpen,
  setPopupCreateIsOpen,
  session,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const sessions = useMemo(() => sessionList, [sessionList]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  /*const removeSession = useCallback(sessionId => {
    sessionStorage.removeSession({sessionId});
  }, []);*/

  const changeActiveSession = useCallback(
    sessionId => {
      sessionStorage.changeActiveSession({sessionId});
      onChange(sessionStorage.getActiveSession());
      setPopupSessionIsOpen(true);
    },
    [onChange, setPopupSessionIsOpen],
  );

  if (!Array.isArray(sessions) || sessions?.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <InfoBubble
          indication={I18n.t('Auth_InfoSession')}
          iconName="info"
          badgeColor={Colors.cautionColor}
          textIndicationStyle={styles.textIndicationStyle}
          style={styles.icon}
        />
        <SessionNumberIndicator number={sessionList?.length} />
        <Icon
          name="plus"
          style={styles.iconPlus}
          touchable={true}
          onPress={() => setPopupCreateIsOpen(true)}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}>
        {sessions.map((_session, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => changeActiveSession(_session.id)}
              activeOpacity={0.9}>
              <Card
                style={[
                  styles.cardContainer,
                  _session.id === session.id
                    ? styles.selectBorderCard
                    : styles.borderCard,
                ]}>
                <View style={styles.imageContainer}>
                  <LogoImage logoFile={logoFile} url={_session?.url} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textTitle}>{_session.id}</Text>
                  <Text numberOfLines={1}>{`Url: ${_session.url}`}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      maxHeight: Dimensions.get('window').height * 0.45,
    },
    scrollView: {
      width: '90%',
    },
    contentContainer: {
      alignItems: 'center',
    },
    cardContainer: {
      flexDirection: 'row',
      marginVertical: 4,
      width: '100%',
      alignItems: 'center',
      height: Dimensions.get('window').height * 0.15,
    },
    borderCard: {
      borderWidth: 1,
      borderColor: Colors.secondaryColor_dark.background,
    },
    selectBorderCard: {
      borderWidth: 1,
      borderColor: Colors.primaryColor.background,
    },
    textTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    textContainer: {
      flexDirection: 'column',
      width: '70%',
      marginLeft: 20,
    },
    imageContainer: {
      width: '20%',
      height: 100,
    },
    iconContainer: {
      alignSelf: 'flex-end',
      flexDirection: 'row',
    },
    icon: {
      marginHorizontal: 4,
    },
    iconPlus: {
      marginHorizontal: 4,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primaryColor.background_light,
      borderWidth: 2,
      borderColor: Colors.primaryColor.background,
      borderRadius: Dimensions.get('window').width * 0.07,
      width: Dimensions.get('window').width * 0.07,
      height: Dimensions.get('window').width * 0.07,
    },
    textIndicationStyle: {
      width: Dimensions.get('window').width * 0.7,
    },
  });

export default SessionListCard;
