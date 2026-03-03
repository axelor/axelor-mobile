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

import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Card,
  Icon,
  Image,
  LabelText,
  Picker,
  Text,
  ThemeColors,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {fetchCompanies} from '../../../features/companySlice';
import {updateActiveUser} from '../../../features/userSlice';
import {
  logout,
  useBinaryImageUri,
  useDispatch,
  useSelector,
  useTranslator,
} from '../../../../index';

const UserCard = ({children, style}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const formatImage = useBinaryImageUri();

  const {base: baseConfig} = useSelector((state: any) => state.appConfig);
  const {user, canModifyCompany} = useSelector((state: any) => state.user);
  const {companyList} = useSelector((state: any) => state.company);

  useEffect(() => {
    dispatch((fetchCompanies as any)({companySet: user.companySet}));
  }, [dispatch, user.companySet]);

  const displayCompanyPicker = useMemo(
    () => baseConfig?.enableMultiCompany && canModifyCompany,
    [baseConfig?.enableMultiCompany, canModifyCompany],
  );

  const updateActiveCompany = useCallback(
    (company: any) => {
      dispatch(
        (updateActiveUser as any)({
          id: user.id,
          version: user.version,
          activeCompany: company == null ? null : {id: company.id},
        }),
      );
    },
    [dispatch, user],
  );

  const styles = useMemo(() => {
    const isCardTopMargin = displayCompanyPicker || !!children;

    return getStyles(isCardTopMargin, Colors);
  }, [Colors, children, displayCompanyPicker]);

  return (
    <Card style={[styles.card, style]}>
      <View style={styles.cardTopContainer}>
        <View style={styles.cardTopLeftContainer}>
          <Image
            source={formatImage(
              user?.id,
              user?.version,
              'com.axelor.auth.db.User',
            )}
            resizeMode="contain"
            generalStyle={styles.image}
          />
          <View style={styles.flexOne}>
            <Text>{user.name}</Text>
            <Text writingType="details">{user.code}</Text>
            {!displayCompanyPicker && (
              <LabelText
                iconName="building-fill"
                title={user.activeCompany?.name}
              />
            )}
          </View>
        </View>
        <Icon
          style={styles.logOutIcon}
          name="power"
          color={Colors.primaryColor.background}
          size={25}
          touchable={true}
          onPress={() => dispatch((logout as any)())}
        />
      </View>
      {displayCompanyPicker && (
        <Picker
          title={I18n.t('User_ActiveCompany')}
          listItems={companyList}
          defaultValue={user?.activeCompany}
          labelField="name"
          valueField="id"
          onValueChange={updateActiveCompany}
          isValueItem={true}
          emptyValue={false}
          style={styles.picker}
        />
      )}
      {children}
    </Card>
  );
};

const getStyles = (isCardTopMargin: boolean, Colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: '90%',
      alignSelf: 'center',
      paddingHorizontal: 16,
      paddingRight: 16,
      zIndex: 2,
    },
    cardTopContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: isCardTopMargin ? 10 : 0,
    },
    cardTopLeftContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 5,
    },
    logOutIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: Colors.backgroundColor,
      elevation: 5,
      shadowOpacity: 0.5,
      shadowOffset: {width: 0, height: 0},
      shadowColor: Colors.secondaryColor.background,
    },
    picker: {
      width: '100%',
    },
    flexOne: {
      flex: 1,
    },
  });

export default UserCard;
