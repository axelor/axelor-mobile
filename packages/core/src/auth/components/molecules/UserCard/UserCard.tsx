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
  IconTile,
  Image,
  LabelText,
  Picker,
  Text,
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
import {UserScreenItem, useUserScreen} from '../../../userScreen';

const UserCard = ({style}: {style?: any}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const formatImage = useBinaryImageUri();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {user, canModifyCompany} = useSelector(state => state.user);
  const {companyList} = useSelector(state => state.company);

  const {userCardItems} = useUserScreen();

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

  return (
    <Card style={[styles.container, style]}>
      <View style={styles.headerWrapper}>
        <Image
          source={formatImage(
            user?.id,
            user?.version,
            'com.axelor.auth.db.User',
          )}
          resizeMode="contain"
          imageSize={styles.imageSize}
        />
        <View style={styles.flexOne}>
          <Text writingType="important">{user.name}</Text>
          <Text writingType="details" fontSize={12}>
            {user.code}
          </Text>
          {!displayCompanyPicker && (
            <LabelText
              iconName="building-fill"
              title={user.activeCompany?.name}
            />
          )}
        </View>
        <IconTile
          icon="power"
          color={Colors.cautionColor}
          iconSize={20}
          borderRadius={20}
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
      {userCardItems.map((_item: UserScreenItem) => (
        <_item.component key={_item.key} />
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingRight: 16,
    zIndex: 2,
    gap: 5,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  imageSize: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  flexOne: {
    flex: 1,
  },
  picker: {
    width: '100%',
  },
});

export default UserCard;
